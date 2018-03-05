import {Injectable, Predicate} from '@angular/core';

import * as _ from 'lodash';

@Injectable()
export class ItemsService {

  constructor() {}

  /*
  Removes an item from an array using the lodash library
  */
  removeItemFromArray<T>(array: Array<T>, item: any) {
    _.remove(array, function(current) {
      // console.log(current);
      return JSON.stringify(current) === JSON.stringify(item);
    });
  }

  removeItems<T>(array: Array<T>, predicate: Predicate<T>) {
    _.remove(array, predicate);
  }

  /*
  Finds a specific item in an array using a predicate and repsaces it
  */
  setItem<T>(array: Array<T>, predicate: Predicate<T>, item: T) {
    const _oldItem = _.find(array, predicate);
    if (_oldItem) {
      const index = _.indexOf(array, _oldItem);
      array.splice(index, 1, item);
    } else {
      array.push(item);
    }
  }



  /*
  Adds an item to zero index
  */
  addItemToStart<T>(array: Array<T>, item: any) {
    array.splice(0, 0, item);
  }

  /*
  From an array of type T, select all values of type R for property
  */
  getPropertyValues<T, R>(array: Array<T>, property: string): R {
    const result = _.map(array, property);
    return <R><any>result;
  }

  /*
  Util method to serialize a string to a specific Type
  */
  getSerialized<T>(arg: any): T {
    return <T>JSON.parse(JSON.stringify(arg));
  }

  getMaxValue<T>(array: Array<T>, property: string): T {
    const result = _.maxBy(array, property);
    return result;
  }
  getMaxValueBetween<T>(property1: number, property2: number): T {
    const result = Math.max(property1, property2);
    return <T><any>result;
  }
  formatLoadDraft<T>(property: number): T {
    const result1 = Math.floor(property);
    const result2 = (property - result1) * 12;
    const result2string = result2.toFixed(0);
    const result = result1.toString() + '-' + result2string;
    return <T><any>result;
  }
  cloneData<T>(c: any): T {
    const data = new c.constructor;
    for (const prop in c) {
      data[prop] = c[prop];
    }
    return data;
  }

  extendArray<T>(array: Array<T>, property: string): T {
    array.map((element) => {
      return element[property] = true;
    });
    return <T><any>array;
  }

}
