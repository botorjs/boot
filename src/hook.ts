import { EventEmitter } from "events";

/**
 * hook of Boot
 */
export class Hook {
    private _event_bus: EventEmitter

    constructor() {
        this._event_bus = new EventEmitter();
    }

    /**
     *  listen event name
     * 
     * @param name name
     * @param callback callback when listen event name
     */
    on(name: string,callback: (...args: any[]) => void) {
        this._event_bus.on(name, callback);
    }

    /**
     *  fire event
     * 
     * @param name event name
     * @param data data event
     */
    emit(name: string, data: any = null) {
        this._event_bus.emit(name, data);
    }
}
