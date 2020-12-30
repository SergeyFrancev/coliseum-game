<template>
  <div class="inventory-item"
       v-bind:class="{
        dressed: item.isDressed,
        not_dressable: !item.isDressable
       }"
       v-on:click="toggleDress">
    <span class="is-dressed"></span>
    <span class="name" v-html="item.Caption"></span>
    <span class="count" v-if="item.cnt > 1">{{item.cnt}}</span>
    <img :src="item.pathToIcon" v-bind:title="item.Caption">
<!--    <span class="btns">-->
<!--      <span v-if="isDressed" v-on:click="undress">Снять</span>-->
<!--      <span v-if="item.toslot > 0 && !isDressed" v-on:click="dress">Надеть</span>-->
<!--      <span>Выбросить</span>-->
<!--    </span>-->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { IInventoryItem } from '@/modules/services/IInventoryItem'
import { useStore } from 'vuex'
import { key } from '@/store'
import { InventoryItemModel } from '@/modules/inventory/inventory-item.model'

export enum InventoryItemEvent {
  ActiveItem = 'activeItem'
}

@Options({
  props: {
    item: {
      type: Object,
      require: true
    }
  }
})
export default class InventoryItem extends Vue {
    item!: InventoryItemModel;
    store: any;

    beforeMount () {
      this.store = useStore(key)
    }

    dress () {
      this.$emit('dress', this.item)
    }

    undress () {
      this.$emit('takeOff', this.item)
    }

    toggleDress () {
      // if (!this.isDressable) return
      // if (this.item.dressed !== 0) this.undress()
      // else this.dress()
      this.$emit(InventoryItemEvent.ActiveItem, this.item)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  $itemSize: 75px;

  .inventory-item {
    align-items: center;
    display: flex;
    height: 75px;
    width: 75px;
    padding: 0;
    margin: 0 5px 5px 0;
    border-radius: 5px 0;
    cursor: pointer;
    position: relative;
    box-shadow: 2px 2px 3px #00000094;
    overflow: hidden;

    &.dressed {
      background-color: #7bb96c;
    }

    &.not_dressable {
      background-color: #8e8e8e;
    }

    .name {
      flex-grow: 1;
      word-break: break-word;
      font-size: 14px;
      text-align: center;
      display: none;
    }

    .count {
      position: absolute;
      bottom: 0;
      right: 0;
      color: #fff;
      background-color: #666;
      padding: 3px 4px 0;
      border-radius: 3px 0 3px 0;
      text-shadow: 1px 1px 2px #000;
    }

    .btns {
      display: none;

      span {
        padding: 3px 10px;
        background: #fff;
        margin-right: 0px;
        font-size: 14px;
        cursor: pointer;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
      }
    }

    img {
      width: $itemSize;
    }
  }
</style>
