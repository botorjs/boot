import { Reflector } from "../reflector";

export function Inject(name: string|Function) {
    return function(target: any, _propertyKey, index: number): any {
        console.log("inject", target, index, name);
       Reflector.addInject(target,index, name);
    };
}