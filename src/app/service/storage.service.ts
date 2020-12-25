import { Injectable } from '@angular/core';
import {AnyJson} from "./data-types/common.types";
import {ServiceModule} from "./service.module";

@Injectable({
  providedIn: ServiceModule
})
export class StorageService {

  constructor() { }

  getStorage(key:string,type:string = 'local'){
    return (window as { [key: string]: any })[type + 'Storage'].getItem(key)
  }

  setStorage(params: AnyJson | AnyJson[], type = 'local') {
    const kv = Array.isArray(params) ? params : [params];
    for (const { key, value } of kv) {
        (window as { [key: string]: any })[type + 'Storage'].setItem(key, value.toString());
      }
  }

  removeStorage(key:string,type:string='local'){
    (window as { [key: string]: any })[type + 'Storage'].removeItem(key)
  }
  
}
