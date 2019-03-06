import Debug from 'debug';
import { NotFoundAlias } from "./errors/NotFoundAlias";

const debug = Debug("alias");

export class AliasFunction {
    public target: any;
    public alias: any;
}

/**
 * Alias name or fuction
 */
export class Alias {
    private _aliases: any;
    private _aliases_func: Map<string, AliasFunction[]>

    constructor() {
        this._aliases = {};
        this._aliases_func = new Map();
    }

    /**
     *  add new alias or overwrite  aslias exits with same target name or function
     * 
     * @param name name alias
     * @param alias target alias 
     */
    public add(name: string|Function, alias: any) {
        if(typeof(name) == 'string') {
            debug('add alisase as string ', name, alias);
            this._aliases[name] = alias;
            return;
        }
        this.addFunc(name, alias);
    }
    /**
     *  get alias with alias as function
     * 
     * @param datas list AliasFunction
     * @param func target need alias
     */
    private getAliasFunction(datas: AliasFunction[], func): AliasFunction {
        for(var item of datas) {
            if(item.target == func) {
                return item;
            }
        }
        return null;
    }

    /**
     *  add alias as function or class 
     * 
     * @param func target need alias
     * @param alias target alias of func
     */
    private addFunc(func: Function, alias) {
        debug('add alisase as function ', func.name);
        const funcName = func.name;
        var data: AliasFunction[] = [];
        var item: AliasFunction  = null;
        if(this._aliases_func.has(funcName)) {
            data = this._aliases_func.get(funcName);
            item = this.getAliasFunction(data, func); 
        }
       
        if(item == null) {
            data.push({
                alias,
                target: func,
            })
        } else {
            item.alias = alias;
        }
        this._aliases_func.set(funcName, data);
    }

    /**
     *  get target was alias 
     * 
     * @param name name alisa need
     */
    public get(name: string|Function): any {
        if(typeof(name) == 'string') {
            debug('get alisase as string ', name);
            return this._aliases[name];
        }
        var item = this.getFunc(name);
        if(item == null) {
            throw new NotFoundAlias(name);
        } 
        return item.alias;
    }

    /**
     *  get alias function was alias 
     * 
     * @param func alias function
     */
    private getFunc(func: Function): AliasFunction{
        const funcName = func.name;
        var data: AliasFunction[] = [];
        var item: AliasFunction  = null;
        if(this._aliases_func.has(funcName)) {
            data = this._aliases_func.get(funcName);
            item = this.getAliasFunction(data, func); 
        }
        return item;
    }

    /**
     * check function have exist with target as function
     * 
     * @param func function need alias
     */
    private hasFunc(func: Function): boolean {
        var item = this.getFunc(func);
        return item != null
    }

    /**
     *  check function have exist 
     * 
     * @param name target need alias
     */
    public has(name: string|Function): boolean {
        if(typeof(name) == 'string') {
            return this._aliases[name] != null || this._aliases[name] != undefined;
        }
        return this.hasFunc(name);
    }

}