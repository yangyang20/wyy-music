import { Injectable } from '@angular/core';
import {win32} from 'path';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getStorage(key:string,type:string = 'local'){
    const storage:string = type+'Storage'
    // return window.getItem(key)
  }
}
