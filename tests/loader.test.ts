import { expect } from "chai";
import { Injectable } from "../src/decorators/Injectable";
import { Boot } from "../src/boot";
import { ServiceProvider } from "../src/ServiceProvider";

var app: Boot = null;

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

class ProviderTest extends ServiceProvider{
    register(app: Boot) {
        app.ioc.singleton(Service.name, Service);
        app.ioc.bind(TestClass.name, TestClass);
    }

    boot(app: Boot) {
        const service = app.get<Service>(Service);
        service.i++;
    }
}

class ProviderTest2 extends ServiceProvider{
    boot(app: Boot) {
        const service = app.get<Service>(Service);
        service.i++;
    }
}


describe('Loader test', function() {

    before(function () {
        app = new Boot();
    })

    after(function(){
        app = null;
    })

    it('add and get service', function() {
        app.loader.add(ProviderTest);
        app.loader.preload();
        var test = app.get<TestClass>(TestClass);
        expect(test.service.i).to.eql(2);
    }); 

    it('add and get service after preload', function() {
        app.loader.add(ProviderTest2);
        var test = app.get<TestClass>(TestClass);
        const service = app.get<Service>(Service);
        expect(service.i).to.eql(3);
        expect(test.service.i).to.eql(3);
    }); 

});