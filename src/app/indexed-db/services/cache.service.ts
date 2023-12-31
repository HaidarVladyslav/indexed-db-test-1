import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';
import { IUnit } from '../interfaces/unit.interface';
import { AppDatabase } from './init.idb.service';
import { LoadedStores } from '../model/loaded.store';
import { DexieCrudService } from './dexie-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  User!: DexieCrudService<IUser, string>;
  Unit!: DexieCrudService<IUnit, string>;
  LoadedStores!: DexieCrudService<LoadedStores, number>;

  constructor(appDatabase: AppDatabase) {
    this.User = new DexieCrudService<IUser, string>(appDatabase.User);
    this.Unit = new DexieCrudService<IUnit, string>(appDatabase.Unit);
    this.LoadedStores = new DexieCrudService<LoadedStores, number>(appDatabase.LoadedStores);
  }
}
