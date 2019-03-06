
  /**
   * Generic interface for the service / class
   *
   * @export
   * @interface Type
   */
  export interface Type {
    new (...args: any[]): any;
  }
  
  /**
   * Generic factory function type
   * @export
   * @type Factory
   */
  export type Factory = (...args: any[]) => any;


  export enum TypeContainer {
    Class,
    Function,
    Contant,
    Check
  }

  export enum TypeIoC {
    Bind,
    Singleton
  }
