import { expect } from "chai";
import { IoC } from "../src/Ioc";
import { TypeContainer, TypeIoC } from "../src/types";
import { Injectable } from "../src/decorators/Injectable";

var ioc: IoC = null;
var i = 0;

class Service {
    public i: number = 1;
}

@Injectable()
class TestClass {
    constructor(private _service: Service) {}

    public get service(): Service {
        return this._service;
    }
}

describe('IoC test', function() {

    before(function () {
        ioc = new IoC();
    })

    after(function(){
        ioc = null;
    })


    it('add and has name container singleton', function() {
        ioc.singleton("test_singleton", "str");
        var result = ioc.has("test_singleton");
        ioc.remove("test_singleton");
        expect(result).eql(true);
    }); 

    it('add and has container bind', function() {
        ioc.bind("test_bind", function() {
            i++;
            return i;
        });
        var result = ioc.has("test_bind");
        ioc.remove("test_bind");
        expect(result).eql(true);
       
    }); 

    it('add and has function', function() {
        function func() {
            i++;
            return i;
        };
        ioc.bind("test_bind", func);
        var result = ioc.has(func);
        ioc.remove("test_bind");
        expect(result).eql(true);
       
    }); 

    it('resolve a container type class', function() {
        ioc.bind("test_service", Service);
        var test: TestClass = ioc.resolveContainer({
            name: 'test',
            obj: null,
            target: TestClass,
            type_target: TypeContainer.Class,
            type: TypeIoC.Singleton,
        });
        ioc.remove("test_service");
        expect(test.service.i).to.eql(1);
    }); 

    it('resolve a class', function() {
        ioc.bind("test_service", Service);
        var test: TestClass = ioc.resolve(TestClass);
        ioc.remove("test_service");
        expect(test.service.i).to.eql(1);
    }); 

    it('resolve a container type function', function() {
        ioc.bind("test_service", Service);
        function func_test() {
            return 1;
        }
        var val = ioc.resolveContainer({
            name: 'test',
            obj: null,
            target: func_test,
            type_target: TypeContainer.Function,
            type: TypeIoC.Singleton,
        });
        ioc.remove("test_service");
        expect(val).to.eql(1);
    }); 

    it('resolve a container type constant', function() {
        var obj: string = ioc.resolveContainer({
            name: 'test',
            obj: null,
            target: "2",
            type_target: TypeContainer.Contant,
            type: TypeIoC.Singleton,
        });
        expect(obj).to.eql("2");
    }); 

    it('add and get container type constant', function() {
        ioc.singleton("test_str", "str");
        var result = ioc.get<string>("test_str");
        ioc.remove("test_str");
        expect(result).eql("str");
    }); 

    it('add and get container type function', function() {
        i = 1;
        ioc.bind("test_function", function() {
            i++;
            return i;
        }, TypeContainer.Function);
        var result = ioc.get<number>("test_function");
        expect(result).to.eql(2);
        result = ioc.get("test_function");
        ioc.remove("test_function");
        expect(result).to.eql(3);
    }); 

    it('add and get container type class', function() {
        ioc.bind("test_service", Service);
        ioc.bind("test_class", TestClass);
        var rs: TestClass = ioc.get("test_class");
        ioc.remove("test_service");
        ioc.remove("test_class");
        expect(rs.service.i).eql(1);
    });

});