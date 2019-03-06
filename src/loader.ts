import { ServiceProvider } from "./ServiceProvider";
import { Boot } from "./boot";
import { isArray } from "util";

enum StateLoader {
    Waiting,
    Perload
}

export class Loader {
    private _poor_provinder:  ServiceProvider[];
    private _poor_obj_provinder: ServiceProvider[];
    private _app: Boot;
    private _state: StateLoader;

    constructor(app: Boot) {
        this._app = app;
        this._state = StateLoader.Waiting;
        this._poor_provinder = [];
        this._poor_obj_provinder = [];
    }

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

    private registeProvider(provider: ServiceProvider) {
        provider.register(this._app);
    }

    private bootProvider(provider: ServiceProvider) {
        provider.boot(this._app);
    }

    _register() {
        for(const provider of this._poor_obj_provinder) {
            this.registeProvider(provider);
        }
    }

    _boot() {
        for(const provider of this._poor_obj_provinder) {
            this.bootProvider(provider);
        }
    }

    preload() {
        this._app.hook.emit("loader:register");
        this._register();
        this._app.hook.emit("loader:boot");
        this._boot();
        this._app.hook.emit("loader:end_preload");
        this._state = StateLoader.Perload;
    }

}