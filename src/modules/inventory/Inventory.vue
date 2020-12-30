<template>
  <div class="inventory">
<!--    <div class="title">Инвентарь</div>-->
    <div class="block-items">
      <Tabs>
        <Tab title="Оружие">
          <div class="container">
            <InventoryItem
              v-for="item in weapons"
              :key="item.ID"
              class="list-complete-item"
              v-bind:item="item"
              v-on:activeItem="activateItem(item)"
            ></InventoryItem>
          </div>
        </Tab>
        <Tab title="Щиты/Одёжка">
          <div class="container">
            <InventoryItem
              v-for="item in armor"
              :key="item.ID"
              class="list-complete-item"
              v-bind:item="item"
              v-on:active-item="activateItem(item)"
            ></InventoryItem>
          </div>
        </Tab>
        <Tab title="Побрякушки">
          <div class="container">
            <InventoryItem
              v-for="item in amulets"
              :key="item.ID"
              class="list-complete-item"
              v-bind:item="item"
              v-on:active-item="activateItem(item)"
            ></InventoryItem>
          </div>
        </Tab>
        <Tab title="Прочее">
          <div class="container">
            <InventoryItem
              v-for="item in others"
              :key="item.ID"
              class="list-complete-item"
              v-bind:item="item"
              v-on:active-item="activateItem(item)"
            ></InventoryItem>
          </div>
        </Tab>
      </Tabs>
    </div>
    <Loader v-if="loading"></Loader>
    <ItemPanel></ItemPanel>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useStore } from 'vuex'
import { key } from '@/store'
import InventoryItem from '@/modules/inventory/InventoryItem.vue'
import Loader from '@/modules/ui/Loader.vue'
import { InventoryAction, InventoryCommit, InventoryGetter } from '@/store/inventory/actions/inventory.actions';
import { State, Action, Getter } from 'vuex-class'
import Tabs from '@/modules/ui/tabs/Tabs.vue'
import Tab from '@/modules/ui/tabs/Tab.vue'
import { InventoryItemModel } from '@/modules/inventory/inventory-item.model'
import ItemPanel from '@/modules/inventory/ItemPanel.vue'

@Options({
  props: {},
  components: {
    InventoryItem,
    Loader,
    Tabs,
    Tab,
    ItemPanel
  }
})
export default class Inventory extends Vue {
  store: any;
  loading = true;

  @Action(InventoryAction.LoadInventory)
  loadInventory: any;

  @Action(InventoryAction.Dress)
  dressItem: any;

  @Action(InventoryAction.TakeOff)
  tackOffItem: any;

  // @Getter(InventoryGetter.Weapons)
  // weapons: IInventoryItem[] = [];

  beforeMount () {
    this.store = useStore(key)
    this.loadInventory()
      .then((d: any) => {
        this.loading = false
        return d
      })
  }

  dress (item: InventoryItemModel) {
    this.loading = true
    // this.store.dispatch(InventoryAction.Dress, item)
    //   .finally(() => { this.loading = false })
    this.dressItem(item)
      .finally(() => { this.loading = false })
  }

  takeOff (item: InventoryItemModel) {
    this.loading = true
    // this.store.dispatch(InventoryAction.TakeOff, item)
    //   .finally(() => { this.loading = false })
    this.tackOffItem(item)
      .finally(() => { this.loading = false })
  }

  activateItem (item: InventoryItemModel) {
    this.store.commit(InventoryCommit.SetActiveItem, item)
  }

  get weapons (): InventoryItemModel[] {
    return this.store.getters.weapons
  }

  get others (): InventoryItemModel[] {
    return this.store.getters.others
  }

  get armor (): InventoryItemModel[] {
    return this.store.getters.armor
  }

  get amulets (): InventoryItemModel[] {
    return this.store.getters.amulets
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .inventory {
    background-color: #496674;

    .block-items {
      position: relative;
      min-height: 300px;
    }

    .title {
      background-color: #6d6b6b;
      color: #fff;
      padding: 5px;
    }

    .container {
      list-style: none;
      text-align: start;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: stretch;
      margin: 2px 2px 2px 5px;
    }
  }
</style>
