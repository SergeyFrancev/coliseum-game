<template>
  <div class="item-panel" v-bind:class="{active: item !== null, deactive: item === null}">
    <div class="item-panel_box">
      <div class="item-panel_header">
        <div class="title">
          <span v-html="item?.Caption"></span>
        </div>
        <div class="close-btn">
          <span v-on:click="close">X</span>
        </div>
      </div>
      <div class="item-panel_container">
        <span class="count" v-if="item?.cnt > 1">{{item?.cnt}}</span>
        <img :src="item?.pathToIcon" v-bind:title="item?.Caption">
      </div>
      <div class="item-panel_text">
        {{}}
      </div>
      <div class="item-panel_btns">
        <span v-if="item?.isDressed" v-on:click="takeOff">Снять</span>
        <span v-if="item?.isDressable && !item?.isDressed" v-on:click="dress">Надеть</span>
        <span v-on:click="close">Выбросить</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { InventoryItemModel } from '@/modules/inventory/inventory-item.model'
import { Action, State } from 'vuex-class'
import { InventoryState } from '@/store/inventory/inventory.store'
import { InventoryAction, InventoryCommit } from '@/store/inventory/actions/inventory.actions'
import Vuex, { useStore, Store } from 'vuex'
import { key, StoreState } from '@/store'

  @Options({
    props: {}
  })
export default class ItemPanel extends Vue {
    @State('inventory')
    inventory!: InventoryState;

    @Action(InventoryAction.TakeOff)
    takeOffItem!: (item: InventoryItemModel) => Promise<any>;

    @Action(InventoryAction.Dress)
    dressItem!: (item: InventoryItemModel) => Promise<any>;

    store: any;

    beforeMount () {
      this.store = useStore(key)
    }

    get item (): InventoryItemModel | null {
      return this.inventory.activeItem
    }

    takeOff () {
      if (this.inventory.activeItem !== null) {
        this.takeOffItem(this.inventory.activeItem)
          .then(() => this.close())
      }
    }

    dress () {
      if (this.inventory.activeItem !== null) {
        this.dressItem(this.inventory.activeItem)
          .then(() => this.close())
      }
    }

    close () {
      this.store.commit(InventoryCommit.SetActiveItem, null)
    }
}
</script>

<style scoped lang="scss">
  /*@keyframes backShow {*/
  /*  0% {*/
  /*    opacity: 0;*/
  /*    top: 100%;*/
  /*  }*/
  /*  100% {*/
  /*    top: 0;*/
  /*    opacity: 1;*/
  /*  }*/
  /*}*/

  /*@keyframes backHide {*/
  /*  0% {*/
  /*    opacity: 1;*/
  /*    top: 0;*/
  /*  }*/
  /*  99.9999% {*/
  /*    top: 0;*/
  /*  }*/
  /*  100% {*/
  /*    top: 100%;*/
  /*    opacity: 0;*/
  /*  }*/
  /*}*/

  .item-panel {
    position: absolute;
    top: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .74);
    opacity: 0;
    transition: opacity .25s ease-in;

    &.active {
      opacity: 1;
      top: 0;
      /*animation: .5s ease-in 0s backShow;*/

      .item-panel_box {
        top: 80px;
      }
    }

    &.deactive {
      /*animation: .5s ease-in 0s backHide;*/
    }

    &_box {
      background: #eee;
      min-height: 270px;
      max-height: 350px;
      max-width: 300px;
      min-width: 250px;
      top: 280px;
      position: absolute;
      /* margin-top: -20%; */
      left: 50%;
      margin-left: -15%;
      transition: all .25s ease-out;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &_header {
      display: flex;
      background-color: #1c343b;
      color: #fff;
      align-items: center;
      margin-bottom: 10px;
      width: 100%;
      border-bottom: 1px solid #0c171b;

      .title {
        flex-grow: 1;
        padding: 3px 0;
        font-size: 19px;
        text-shadow: 2px 1px 2px #000;
      }

      .close-btn {
        flex-basis: 25px;
        cursor: pointer;
        font-weight: 900;
        text-shadow: 2px 1px 2px #000;
      }
    }

    &_container {
      width: 90px;
      height: 90px;
      position: relative;
      overflow: hidden;
      border-radius: 5px 0;

      .count {
        position: absolute;
        bottom: 0;
        right: 0;
        background: #666;
        color: #fff;
        padding: 2px 6px;
        font-size: 14px;
        border-radius: 5px 0;
        text-shadow: 1px 1px 2px #000;
      }

      img {
        width: 90px;
      }
    }

    &_btns {
      display: flex;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;

      span {
        width: 50%;
        cursor: pointer;
        background: #1c343b;
        color: #eee;
        padding: 8px 0;
        border: 1px solid #0c171b;
        text-shadow: 2px 1px 2px #000;
      }
    }
  }
</style>
