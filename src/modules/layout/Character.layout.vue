<template>
  <div class="character_layout">
    <div class="character_container">
      <Profile></Profile>
    </div>
    <div class="character_inventory">
      <Inventory></Inventory>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Profile from '@/modules/profile/Profile.vue'
import { useStore } from 'vuex'
import { key } from '@/store'
import Inventory from '@/modules/inventory/Inventory.vue'

@Options({
  props: {},
  components: {
    Profile,
    Inventory
  }
})
export default class CharacterLayout extends Vue {
  store: any;

  beforeMount () {
    this.store = useStore(key)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .character {
    &_layout {
      display: flex;
    }

    &_container {

    }

    &_inventory {
      flex-grow: 1;
    }
  }
</style>
