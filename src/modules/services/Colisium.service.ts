import { ICharacter } from '@/modules/services/ICharacter'
import { IInventoryItem } from '@/modules/services/IInventoryItem'
import { Dictionary } from 'express-serve-static-core'
import { TestInventory, TestProfile } from '@/modules/services/test.data'
import { InventoryItemModel } from '@/modules/inventory/inventory-item.model';

function createRequestUrl (url: string, params: Dictionary<any>) {
  // const resultUrl = new URL(url);
  // Object.keys(params)
  //   .forEach(key => resultUrl.searchParams.append(key, params[key]));
  const esc = encodeURIComponent
  const query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&')
  return `${url}?${query}`
}

export class ColisiumApi {
  static baseUrl = 'http://194.67.109.33/api';

  static getCharacter (userId: number): Promise<ICharacter> {
    console.log(`req character for: ${userId}`)
    // const url = createRequestUrl(`${ColisiumApi.baseUrl}/person`, { UserID: userId });
    // return fetch(url)
    //   .then((response) => {
    //     console.log('character resp', response);
    //     return response.json() as Promise<ICharacter[]>;
    //   })
    //   .then(result => result[0])
    //   .catch(err => {
    //     console.error('err load char', err);
    //     throw new Error(err);
    //   });
    return new Promise<ICharacter>((resolve, reject) => {
      setTimeout(() => resolve(TestProfile), 200)
    })
  }

  static getInventory (userId: number): Promise<InventoryItemModel[]> {
    console.log(`req inventory for: ${userId}`)
    const url = createRequestUrl(
      `${ColisiumApi.baseUrl}/test`,
      { UserID: userId }
      );
    return fetch(url)
      .then((response) => {
        console.log('inventory resp', response);
        return response.json();
      })
      .then((items : IInventoryItem[]) => {
        return items.map(i => new InventoryItemModel(i))
      });
    // .catch(err => console.error(`load inventory`, err));

    // return new Promise<IInventoryItem[]>((resolve, reject) => {
    //   // console.log('JSON', JSON.stringify(TestInventory))
    //   setTimeout(() => resolve(TestInventory), 1000)
    // })
  }

  // dress и takeoff

  static dressItem (userId: number, itemId: number) {
    // const body = JSON.stringify();
    const url = createRequestUrl(
      `${ColisiumApi.baseUrl}/test`,
      {
        UserID: userId,
        act: 'dress',
        ID: itemId
      }
    )
    return fetch(url)
  }

  static takeOffItem (userId: number, itemId: number) {
    const url = createRequestUrl(
      `${ColisiumApi.baseUrl}/test`,
      {
        UserID: userId,
        act: 'takeoff',
        ID: itemId
      }
    )
    return fetch(url)
  }
}
