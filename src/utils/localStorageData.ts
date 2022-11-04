/* eslint-disable functional/no-this-expression */
/* eslint-disable functional/no-class */
import { ILocalStorageData } from '../interfaces/interfaces';

class LocalStorageData implements ILocalStorageData {
  readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  setData(data: string): void {
    localStorage.setItem(this.key, data);
  }

  getData(): string {
    const data: string = localStorage.getItem(this.key)!;
    return data;
  }

  hasData(): boolean {
    const data = localStorage.getItem(this.key);
    return !!data;
  }
}

export default LocalStorageData;
