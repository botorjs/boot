import { Reflector } from "../reflector";

export function Injectable() {
    return function(target: any): any {
       Reflector.defindInject(target);
    };
}