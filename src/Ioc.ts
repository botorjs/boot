import { Container } from "./Container";

export class IoC {
    _poor_container: Container[];

    public get<T>(name: string|Function = null) {
        
    }

    public singleton(name: string, target: any) {

    }

    public bind(name: string, target: any) {

    }

    private _getByFunction(func: Function): any {

    }

    private _getByname(name: string): any {

    }

    public has(string: Function|string): boolean {

        return false;
    }
}