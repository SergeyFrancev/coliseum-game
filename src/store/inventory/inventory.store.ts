import { StoreState } from '@/store';
import { ColisiumApi } from '@/modules/services/Colisium.service';
import { Module } from 'vuex';
import { InventoryAction, InventoryCommit, InventoryGetter } from '@/store/inventory/actions/inventory.actions';
import { InventoryItemModel } from '@/modules/inventory/inventory-item.model';

export interface InventoryState {
  items: InventoryItemModel[],
  activeItem: InventoryItemModel | null,
}

function calcBonusParam(items: InventoryItemModel[], prop: keyof InventoryItemModel) {
  return items
    .filter((item: InventoryItemModel) => item[prop] as number > 0)
    .reduce((acum: number, item: InventoryItemModel) => acum + (item[prop] as number), 0);
}

function groupItems(items: InventoryItemModel[]): InventoryItemModel[] {
  return items
    .reduce((out: InventoryItemModel[], item) => {
      const existItem = out.find(i => i.ID === item.ID)
      if (existItem) {
        existItem.dressed = existItem.dressed || item.dressed;
        existItem.cnt += item.cnt;
      } else {
        out.push(item)
      }
      return out;
    }, [])
    .sort((prev, next) => prev.group - next.group || prev.slot - next.slot)
}

export const InventoryStore: Module<InventoryState, StoreState> = {
  state: () => ({
    items: [],
    activeItem: null
  }),
  mutations: {
    setInventory(state, inventory: InventoryItemModel[]) {
      console.log('[store] set inventory', inventory);
      state.items = inventory;
    },
    dressItem(state, item: InventoryItemModel) {
      if (item.toslot === 0) return;
      const existItem = state.items
        .find(i => i.toslot === item.toslot);
      if (existItem) (existItem as InventoryItemModel).dressed = 0;
      item.dressed = 1;
    },
    undressItem(state, item: InventoryItemModel) {
      item.dressed = 0;
    },
    setActiveItem(state, item: InventoryItemModel | null) {
      state.activeItem = item;
    },
  },
  actions: {
    async loadInventory({commit, rootState}) {
      if (!rootState.vkProfile?.id) {
        return Promise.reject('[load inventory]: undefined profile');
      }
      const inv = await ColisiumApi.getInventory(rootState.vkProfile?.id);
      commit(InventoryCommit.SetInventory, groupItems(inv));
      return inv;
    },
    async dressItem({ state, commit, dispatch, rootState }, item: InventoryItemModel) {
      // commit('dressItem', item);
      if (!rootState.vkProfile?.id) {
        return Promise.reject('[load character]: undefined profile');
      }
      return ColisiumApi.dressItem(rootState.vkProfile?.id, item.ID)
        .then(() => dispatch(InventoryAction.LoadInventory));
    },
    async undressItem({ state, commit, dispatch, rootState }, item: InventoryItemModel) {
      // commit('undressItem', item);
      if (!rootState.vkProfile?.id) {
        return Promise.reject('[load character]: undefined profile');
      }
      return ColisiumApi.takeOffItem(rootState.vkProfile?.id, item.ID)
        .then(() => dispatch(InventoryAction.LoadInventory));
    }
  },
  getters: {
    dressedItems: (state) => {
      return state.items.filter(item => item.dressed > 0);
    },
    bonusBlock: (state, getters): number => {
      return calcBonusParam(getters.dressedItems, 'baf_block');
    },
    bonusSuppress: (state, getters): number => {
      return calcBonusParam(getters.dressedItems, 'baf_suppress');
    },
    bonusCrit: (state, getters): number => {
      return calcBonusParam(getters.dressedItems, 'baf_crit');
    },
    bonusParry: (state, getters): number => {
      return calcBonusParam(getters.dressedItems, 'baf_parry');
    },
    bonusAccuracy: (state, getters): number => {
      return calcBonusParam(getters.dressedItems, 'baf_accuracy');
    },
    bonusDamage: (state, getters): number => {
      return calcBonusParam(getters.dressedItems, 'baf_damage');
    },
    [InventoryGetter.Weapons]:(state): InventoryItemModel[] => {
      const out = state.items.filter(i => i.group >= 1 && i.group <= 8);
      // console.log('weapons', out);
      return out;
    },
    armor:(state): InventoryItemModel[] => {
      return state.items.filter(i => [9, 10].includes(i.group));
    },
    amulets:(state): InventoryItemModel[] => {
      return state.items.filter(i => i.group === 11);
    },
    others:(state): InventoryItemModel[] => {
      return state.items.filter(i => i.group < 1 || i.group > 11);
    }
  },
};
