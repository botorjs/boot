
import { Hook } from './hook';
import { IoC } from './Ioc';
import { Loader } from './loader';
import { Alias } from './alias';

var __IoC: IoC = null;
var __IoC_fake: IoC = null;

export class Boot {
    private _hook: Hook;
    private _ioc: IoC;
    private _ioc_fake: IoC;
    private _loader: Loader;
    private _root: string;
    private _alias: Alias;

    public get root(): string {
        return this._root;
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

    public get<T>(name: string|Function = null) {

    }

    public preload() {

    }

}