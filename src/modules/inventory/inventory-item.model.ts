import { IInventoryItem } from '@/modules/services/IInventoryItem';

export class InventoryItemModel {
  ID: number;
  Caption!: string;
  range!: number;
  attack!: number;
  protection!: number;
  baf_damage!: number;
  baf_block!: number;
  baf_accuracy!: number;
  baf_parry!: number;
  baf_crit!: number;
  baf_suppress!: number;
  group!: number;
  toslot!: number;
  cost!: number;
  aura_id!: number;
  weight!: number;
  damage_type!: number;
  protect_type!: number;
  dressed!: number;
  slot!: number;
  cnt!: number;
  img!: string | null;

  constructor(data: IInventoryItem) {
    this.ID = data.ID;
    this.Caption = data.Caption;
    this.range = data.range;
    this.attack = data.attack;
    this.protection = data.protection;
    this.baf_damage = data.baf_damage;
    this.baf_block = data.baf_block;
    this.baf_accuracy = data.baf_accuracy;
    this.baf_parry = data.baf_parry;
    this.baf_crit = data.baf_crit;
    this.baf_suppress = data.baf_suppress;
    this.group = data.group;
    this.toslot = data.toslot;
    this.cost = data.cost;
    this.aura_id = data.aura_id;
    this.weight = data.weight;
    this.damage_type = data.damage_type;
    this.protect_type = data.protect_type;
    this.dressed = data.dressed;
    this.slot = data.slot;
    this.cnt = data.cnt || 1;
    this.img = data.img;
  }

  get isDressed () {
    return this.dressed > 0
  }

  get isDressable () {
    return this.toslot > 0
  }

  get pathToIcon (): string {
    const imgDir = '/img/item-icons'
    if (!this.img) {
      const id = this.ID % 54
      return `${imgDir}/art${id}.png`
    }
    return `${imgDir}/${this.img}`
  }

  get groupName() {
    switch(this.group) {
      case -1:
        return 'Устарелое';
      case 0:
        return 'Ингредиенты и прочее';
      case 1-8:
        return 'Оружие';
      case 9:
        return 'Щиты';
      case 10:
        return 'Одежда';
      case 11:
        return 'Амулеты и кольца';
      case 12:
        return 'Рецепты и снадобья';
      case 13:
      default:
        return 'Камни перемещений';
    }
  }

  get slotName() {
    // 1 - обычное одноручное оружие
    // 2 - двуручное без вариантов
    // 3 - щиты
    // 4 - двуручное, которое при должной способности можно взять в одну руку
    // 5 - доспехи (тушка)
    // 6 - амулет
    // 7 - кольцо
    // 8 - медальон
    // 9 - голова (шлем, шляпа..)
    // 10 - споги
    return 'slot';
  }
}
