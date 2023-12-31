import Dexie from 'dexie';
import { IFilterDelegate } from '../interfaces/idb.interface';

export class DexieCrudService<T, TKey> {
  dbSet: Dexie.Table<T, TKey>;

  constructor(dbSet: Dexie.Table<T, TKey>) {
    this.dbSet = dbSet;
  }

  getAll(filterDelegate: IFilterDelegate | undefined = undefined) {
    if (!!filterDelegate) {
      return filterDelegate(this.dbSet).toArray();
    }
    return this.dbSet.toArray();
  }

  async AddBulkAsync(items: T[]) {
    const batchSize = 1000;
    let processed = 0;

    while (processed < items.length) {
      const batch = items.slice(processed, processed + batchSize);
      await this.dbSet.bulkPut(batch);
      processed += batchSize;
    }
  }

  getById(id: TKey) {
    return this.dbSet.get(id);
  }

  async AddAsync(item: T): Promise<void> {
    await this.dbSet.add(item);
  }

  async AddOrEditAsync(item: T): Promise<void> {
    await this.dbSet.put(item);
  }

  async UpdateAsync(id: TKey, changes: Partial<T>): Promise<void> {
    await this.dbSet.update(id, changes);
  }

  async RemoveAsync(id: TKey): Promise<void> {
    await this.dbSet.delete(id);
  }

  async RemoveRangeAsync(id: TKey[]): Promise<void> {
    await this.dbSet.bulkDelete(id);
  }
}
