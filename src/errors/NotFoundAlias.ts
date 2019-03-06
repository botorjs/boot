
export class NotFoundAlias extends Error{
    constructor(name) {
        super('Not_Found_Alias name: '+ name);
    }
}