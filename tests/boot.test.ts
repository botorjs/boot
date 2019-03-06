import { expect } from "chai";
import { Boot } from "../src/boot";


var app: Boot = null;

class A {
    public b: number = 3;
}

describe('Boot test', function() {

    before(function () {
        app = new Boot();
    })

    after(function(){
        app = null;
    })

    it('app alias ioc', function() {
        app.alias.add("test", "test1");
        app.ioc.bind("test1", "test_2");
        var val = app.get<string>("test");
        expect(val).to.eql("test_2");
    });

    it('app alias ioc fake', function() {
        app.fake.bind("test1", "str_3");
        var val = app.get<string>("test1");
        expect(val).to.eql("str_3");
    });

    it('app alias not found in ioc', function() {
        app.alias.add("test", "test2");
        app.ioc.bind("test", "test_4");
        var val = app.get<string>("test");
        expect(val).to.eql("test_4");
    });

    it('app alias not found in ioc', function() {
        app.hook.on("app:preload:end", () => {
            expect(true).eql(true);
        })
        app.preload();
    });

    it('app resolve', function() {
       var a: A = app.resolve(A) as A;
       expect(a.b).to.eql(3);
    });

});