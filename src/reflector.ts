import 'reflect-metadata';
import { Type } from './types';

export class MetaDataClass {
    public inject: boolean;
}

export interface InjectableClass {
    __class_meta__?: MetaDataClass;
  }

export class Reflector {

    /**
     * Get injectable's param types
     *
     * @param {Injectable} target
     * @returns {Injectable[]}
     */
    public static paramTypes(target: Type): any[] {
      return Reflect.getMetadata('design:paramtypes', target) || [];
    }

    public static getTargetInject(target: Type): any[] {
      if(!Reflect.hasMetadata("target:inject", target)) {
        return [];
      }
      return Reflect.getMetadata('target:inject', target) || [];
    }

    public static defindInject(target: any) {
      var types = Reflector.paramTypes(target);
      Reflect.defineMetadata("target:inject", types, target);
    }

    public static addInject(target: any, index: number, name: string|Function) {
      var types = Reflector.getTargetInject(target);
      types[index] = name;
      Reflect.defineMetadata("target:inject", types, target);
    }
  }