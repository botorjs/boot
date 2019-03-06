import { ServiceProvider } from "./ServiceProvider";
import { Boot } from "./boot";
import { isArray } from "util";

enum StateLoader {
    Waiting,
    Perload
}


/**
 *  Loader as object provider resource to app , example as Ioc, Listen hook, register component to app 
 */
export class Loader {
    private _poor_provinder:  ServiceProvider[];
    private _poor_obj_provinder: ServiceProvider[];
    private _app: Boot;
    private _state: StateLoader;

    /**
     * 
     * @param app as Boot App, is put in contructor of Boot
     */
    constructor(app: Boot) {
        this._app = app;
        this._state = StateLoader.Waiting;
        this._poor_provinder = [];
        this._poor_obj_provinder = [];
    }

    /**
     *  add new Provider, 
     *  if app before preload will add provider waiti unitl preload
     *  if app after preload will addd provider and regiser and boot right away
     * 
     * @param provider provider extends to ServiceProvider
     */
    public add(provider: any| any[]) {
        const providers = isArray(provider)? provider : [provider];
        for(const ProviderClass of providers) {
            this._poor_provinder.push(ProviderClass);
            const object = this._app.ioc.resolve(ProviderClass);
            this._poor_obj_provinder.push(object);
            if(this._state == StateLoader.Perload) {
                this.registeProvider(object);
                this.bootProvider(object);
            }
        }
      
    }

    /**
     *  register a provider
     * 
     * @param provider privider
     */
    private registeProvider(provider: ServiceProvider) {
        provider.register(this._app);
    }

    /**
     * boot a provider
     * 
     * @param provider provider
     */
    private bootProvider(provider: ServiceProvider) {
        provider.boot(this._app);
    }

    /**
     * register list provider in poor
     */
    _register() {
        for(const provider of this._poor_obj_provinder) {
            this.registeProvider(provider);
        }
    }

    /**
     * boot list provider in poor
     */
    _boot() {
        for(const provider of this._poor_obj_provinder) {
            this.bootProvider(provider);
        }
    }

    /**
     *  preload list provider and call event to hook app
     */
    preload() {
        this._app.hook.emit("loader:register");
        this._register();
        this._app.hook.emit("loader:boot");
        this._boot();
        this._app.hook.emit("loader:preload:end");
        this._state = StateLoader.Perload;
    }

}