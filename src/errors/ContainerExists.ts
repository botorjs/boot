

export class ContainerExists extends Error {
    constructor(name) {
        super("Container_Exists name: "+name);
    }
}