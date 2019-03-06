
import { Hook } from './hook';
import { IoC } from './Ioc';
import { Loader } from './loader';
import { Alias } from './alias';


export class Boot {
    private _hook: Hook;
    private _ioc: IoC;
    private _ioc_fake: IoC;
    private _loader: Loader;
    private _alias: Alias;

    constructor() {
        this._hook = new Hook();
        this._alias = new Alias();
        this._ioc = new IoC();
        this._ioc_fake = new IoC();
        this._loader = new Loader(this);
    }
    
    public get alias(): Alias{
        return this._alias;
    }
    public get ioc(): IoC {
        return this._ioc;
    }

    public get fake(): IoC {
        return this._ioc_fake;
    }

    public get hook(): Hook {
        return this._hook;
    }

    public get loader(): Loader {
        return this._loader;
    }

    public get<T>(name: string|Function = null): T {
        if(this.fake.has(name)) {
            return this.get<T>(name);
        }
        return this.ioc.get<T>(name);
    }

    public preload() {

    }

}