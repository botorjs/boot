import Debug from 'debug';
import { Container } from "./Container";
import { Reflector } from './reflector';
import { Type, TypeIoC, TypeContainer } from "./types";
import { ContainerExists } from "./errors/ContainerExists";
import { NotResoleve } from "./errors/NotResoleve";
import { NotFoundContainer } from "./errors/NotFoundContainer";


const debug = Debug('ioc');
/**
 *  Class IoC manager container and inject the dependencies, now manager
 */
export class IoC {
    
    /*
    * list container of ioc
    *
    */
    private _poor_container: Map<string, Container>;

    constructor() {
        this._poor_container = new Map<string, Container>();
    }

   /**
    * Get object in ioc with name or target function, or class
    * 
    * @param name name container or type target
    */
    public get<T>(name: string|Function = null): T {
        var container  = null;
        if(typeof(name) == 'string') {
            container = this._getByname(name);
        }
        if(container == null) {
            container = this._getByFunction(name as Function);
        }
        if(container == null) {
            throw new NotFoundContainer(name);
        }
        return this.resolveContainer(container) as T;
    }

    /**
     *  check type of target
     * 
     * @param target target need check type of container
     */
    private _checkType(target: any): TypeContainer {
        if(typeof(target) == 'function') {
            return TypeContainer.Class;
        }

        return TypeContainer.Contant;
    }

    /**
     * resole any target need resolve with inject target in ioc
     * 
     * @param target target need resolve in ioc
     */
    public resolve(target: Type): any {
        var types  = Reflector.paramTypes(target);
        var params = [];
        try {
            for(var type of types){
                if(type == undefined || type == null) {
                    params.push(null);
                    continue;
                }
                var param = this.get(type);
                params.push(param);
            }
        } catch(ex) {
            throw new NotResoleve(target.name);
        }
        return new target(...params);
    }

    /**
     *  subfuction resolve genenal with singleton or bind
     * 
     * @param container container need resoleve
     */
    private _resolveContainer(container: Container): any {
        debug("resolve container ", container.name);
        if(container.type_target == TypeContainer.Contant) {
            return container.target;
        }
       
        // function
        if(container.type_target == TypeContainer.Function) {
            debug("resolve target as function");
            return container.target();
        }

        // class
        var types  = Reflector.getTargetInject(container.target);
        debug("params container", types);
        var params = [];
        if(types.length > 0) {
            try {
                for(var type of types){
                    var param = this.get(type);
                    params.push(param);
                }
            } catch(ex) {
                debug("can not resolve parmas of contaiver ", container.name);
                throw new NotResoleve(container.name);
            }
            debug("get params container", params);
        }
        debug("resolve target as class");
        return new container.target(...params);
    }

    /**
     *  resolve a container when request, will auto inject the dependencies if it need when resolve
     * 
     * @param container container need resoleve
     */
    public resolveContainer(container: Container): any {
        if(container.type ==  TypeIoC.Singleton) {
            if(container.obj == null) {
                container.obj = this._resolveContainer(container);
            }
            return container.obj;
        }
        return this._resolveContainer(container);
    }

    /**
     *  create a container
     * 
     * @param target targent of container as function, class, number, string
     * @param name name of container
     * @param type type of ioc as bind or singleton
     * @param type_container type of target
     */

    private createContainer(target: any, name: string, type: TypeIoC, type_container: TypeContainer): Container {
        const container: Container = {
            name,
            obj: null,
            type_target: type_container,
            target,
            type,
        }
        if(container.type_target == TypeContainer.Check) {
            container.type_target = this._checkType(target);
        }

        if(this.has(container.name)) {
            throw new ContainerExists(container.name);
        }
        return container;
    }

     /**
     * function add singleton container
     * 
     * @param name name container
     * @param target target of container
     * @param type type container with default is 'TypeContainer.Check' and when it is 'TypeContainer.Check' ioc will auto check type container, with class or function will is 'TypeContainer.Class', the remaining cases will is 'TypeContainer.Constant'
     * 
     */
    public singleton(name: string, target: Type|Function|string|number, type: TypeContainer = TypeContainer.Check) {
        const container: Container = this.createContainer(target, name, TypeIoC.Singleton, type);
        this._poor_container.set(name, container);
    }

    /**
     * function add bind container
     * 
     * @param name name container
     * @param target target of container
     * @param type type container with default is 'TypeContainer.Check' and when it is 'TypeContainer.Check' ioc will auto check type container, with class or function will is 'TypeContainer.Class', the remaining cases will is 'TypeContainer.Constant'
     * 
     */
    public bind(name: string, target: Type|Function|string|number, type: TypeContainer = TypeContainer.Check) {
        const container: Container = this.createContainer(target, name, TypeIoC.Bind, type);
        this._poor_container.set(name, container);
    }

    /**
     * get container with target as function or class
     * 
     * @param func target function of class need get
     */
    private _getByFunction(func: Function): Container {
        var container: Container = null;
        this._poor_container.forEach((value: Container) => {
            if(value.target == func) {
                container = value;
                return;
            }
        })
        debug("target function is container", container.name);
        return container;
    }

    /**
     *  get container with name
     * 
     * @param name name container in poor container need get
     */
    private _getByname(name: string): Container {
        if(this._poor_container.has(name)) {
            return this._poor_container.get(name);
        }
        return null;
    }

    /**
     * check a container have exist in ioc
     * 
     * @param name name container or target function first
     */
    public has(name: Function|string): boolean {
        if(typeof(name) == "string") {
            debug("has with name is string");
            return this._poor_container.has(name);
        }
        debug("has with name is function");
        return this._getByFunction(name) != null;
    }

    /**
     *  remove a container in ioc with name container
     * 
     * @param name name container
     */
    public remove(name: string) {
        this._poor_container.delete(name);
    }
}