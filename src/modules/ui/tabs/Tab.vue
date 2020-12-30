<template>
  <div class="tab">
    <div class="tab-title" v-on:click="clickOpen">{{title}}</div>
    <div class="tab-container"
         v-bind:class="{
           open: opened,
           close: !opened
         }">
      <slot>Content</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Tabs from '@/modules/ui/tabs/Tabs.vue'

export enum TabEvent {
  Open = 'open',
  Close = 'close',
}

@Options({
  props: {
    title: {
      type: String,
      require: true
    }
  }
})
export default class Tab extends Vue {
  title!: string;
  opened = false;

  mounted () {
    // setTimeout(() => {
    this.container.connected(this)
    // }, 1000)
  }

  open () {
    this.opened = true
  }

  clickOpen () {
    this.container.onOpenTab(this)
    this.open()
  }

  close () {
    this.opened = false
  }

  get container (): Tabs {
    return this.$parent as Tabs
  }
}
</script>

<style scoped lang="scss">
  .tab{
    &-title {
      background-color: #1c343b;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      padding: 4px 0;
      border-bottom: 1px solid #000;
      text-shadow: 2px 1px 2px #000;
    }

    &-container {
      overflow: auto;
      &.close {
        transition: max-height .5s;
        max-height: 0;
      }
      &.open {
        transition: max-height .5s;
        max-height: 255px;
      }
    }
  }
</style>
