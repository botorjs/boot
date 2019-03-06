
export class NotFoundContainer extends Error{
    constructor(name) {
        super('Not_Found_Container name: '+ name);
    }
}