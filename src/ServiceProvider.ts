import { Boot } from "./boot";

export interface ServiceProvider {
    register(app: Boot);
    boot(app: Boot);
}