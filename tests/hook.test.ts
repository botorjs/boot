import { expect } from "chai";
import { Hook } from "../src/hook";


var hook: Hook = null;

describe('Hook test', function() {

    before(function () {
        hook = new Hook();
    })

    after(function(){
        hook = null;
    })

    it('test hook', function() {
        hook.on("test", function(data) {
            expect(data).to.eql("test");
        })
        hook.emit("test", "test");
    });

});