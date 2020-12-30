<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Tab, { TabEvent } from '@/modules/ui/tabs/Tab.vue'

@Options({
  props: {}
})
export default class Tabs extends Vue {
  tabs: Tab[] = [];

  mounted () {
  }

  connected (tab: Tab) {
    if (this.tabs.length === 0) {
      tab.open()
    } else {
      tab.close()
    }
    this.tabs.push(tab)
    // tab.$on(TabEvent.Open, () => this.onOpenTab(tab))
  }

  onOpenTab (tab: Tab) {
    if (tab.opened) return
    const openTab = this.tabs.find(t => t.opened)
    if (openTab) openTab.close()
    tab.open()
  }
}
</script>

<style scoped lang="scss">
  .tabs {
    width: 100%;
  }
</style>
