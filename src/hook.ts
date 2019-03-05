
import EventEmitter from 'events';
import { on } from 'cluster';


export class Hook {
    _event_bus: EventEmitter

    constructor() {
        this._event_bus = new EventEmitter();
    }

    on(name: string, callback: () => {}) {
        this._event_bus.on(name, callback);
    }

    emit(name: string, data: any = null) {
        this._event_bus.emit(name, data);
    }
}
