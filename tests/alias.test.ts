import { expect } from "chai";
import { Alias } from "../src/alias";
var alias: Alias = null;

function test1() {
    return 1+2;
}
function test2() {
    return 2+2;
}

describe('Loader test', function() {

    before(function () {
        alias = new Alias();
    })

    after(function(){
        alias = null;
    })

    it('add and get alias name as string', function() {
        alias.add("test", "test_1");
        var value = alias.get("test");
        expect(value).to.eql("test_1");
    }); 

    it('check name string', function() {
        var value = alias.has("test_23");
        expect(value).to.eql(false);
    });

    it('add alias name as function', function() {
        alias.add(test1, test2);
        var func = alias.get(test1);
        var value = func();
        expect(value).to.eql(4);
    }); 

    it('add alias name as function exist', function() {
        alias.add(test1, "test");
        var value = alias.get(test1);
        expect(value).to.eql("test");
    }); 

    it('add alias name as function exist 2', function() {

        function test1() {
            return 1+2;
        }

        alias.add(test1, "test");
        var value = alias.get(test1);
        expect(value).to.eql("test");
    }); 

    it('check name function', function() {
        var value = alias.has(test2);
        expect(value).to.eql(false);
    }); 
});