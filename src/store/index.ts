import Vuex, { createStore, Store, StoreOptions } from 'vuex';
import { LayoutScreen } from '@/modules/layout/LayoutScreen.enum'
import { VKApiService, VKProfile } from '@/modules/VKapi/VKApiService'
import { ColisiumApi } from '@/modules/services/Colisium.service'
import { ICharacter } from '@/modules/services/ICharacter'
import { IInventoryItem } from '@/modules/services/IInventoryItem'
import { InventoryState, InventoryStore } from '@/store/inventory/inventory.store';

type InjectionKey<T> = symbol

// define your typings for the store state
export interface StoreState {
  screen: LayoutScreen;
  vkProfile?: VKProfile;
  character?: ICharacter;
}

// define injection key
export const key: InjectionKey<Store<StoreState>> = Symbol();

export const storeConf: StoreOptions<StoreState> = {
  state: {
    screen: LayoutScreen.Character,
    vkProfile: undefined,
    character: undefined,
  },
  mutations: {
    setVKProfile (state, profile) {
      console.log('[store] set VK profile', profile)
      state.vkProfile = profile
    },
    setCharacter (state, character) {
      console.log('[store] set character', character)
      state.character = character
    },
  },
  actions: {
    async loadVKProfile (context) {
      const profile = await VKApiService.getProfile()
      context.commit('setVKProfile', profile)
      return profile
    },
    async loadCharacter (context) {
      const state: StoreState = context.state
      if (!state.vkProfile?.id) { return Promise.reject('[load character]: undefined profile') }
      const char = await ColisiumApi.getCharacter(state.vkProfile?.id)
      context.commit('setCharacter', char)
      return char
    },
  },
  getters: {
  },
  modules: {
    inventory: InventoryStore,
  }
};

export const store = new Vuex.Store<StoreState>(storeConf);
