import Debug from 'debug';
import { Hook } from './hook';
import { IoC } from './Ioc';
import { Loader } from './loader';
import { Alias } from './alias';

const debug = Debug('boot');


/**
 * Boot start 
 */
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
    
    /**
     * return Alias
     */
    public get alias(): Alias{
        return this._alias;
    }

    /**
     * return Ioc
     */
    public get ioc(): IoC {
        return this._ioc;
    }

    /**
     * return IoC fake
     */
    public get fake(): IoC {
        return this._ioc_fake;
    }

    /**
     * return Hook
     */
    public get hook(): Hook {
        return this._hook;
    }

    /**
     * return Loader
     */
    public get loader(): Loader {
        return this._loader;
    }

    /**
     * 
     * @param target target need get
     */
    private getData<T>(target: string|Function): T {
        if(this.fake.has(target)) {
            return this.fake.get<T>(target);
        }
        if(this.ioc.has(target)) {
            return this.ioc.get<T>(target);
        }
        return null;
    }

    /**
     *  resolve a class target have inject
     * 
     * @param target target resolve
     */
    public resolve(target) {
        return this.ioc.resolve(target);
    }
 
    /**
     *  Get target in ioc, 
     * 
     * @param name name or target
     */
    public get<T>(name: string|Function = null): T {
        var target = name;
        if(this._alias.has(name)) {
            debug("have alias ", name);
            target = this._alias.get(name);
        }
       
        debug("try get with alias ", target);
        var res = this.getData<T>(target);
       
        if(res == null) {
            debug("get target ", name);
            res = this.getData<T>(name);
        }
        return res;
    }

    /**
     * preload of Boot
     */
    public preload() {
        this._hook.emit("app:preload");
        this.loader.preload();
        this._hook.emit("app:preload:end");
    }

}