import { Boot } from "./boot";
import { TypeContainer } from './types';

export interface ServiceProvider {
    register(app: Boot);
    boot(app: Boot);
}

export { TypeContainer };