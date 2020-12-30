<template>
  <Header></Header>
<!--  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
  <div v-if="store.state.vkProfile" class="layout-screen-container">
    <CharacterLayout></CharacterLayout>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Header from '@/modules/layout/Header.vue'
import { useStore } from 'vuex'
import { key } from './store'
import CharacterLayout from '@/modules/layout/Character.layout.vue'
import HelloWorld from '@/components/HelloWorld.vue'

@Options({
  components: {
    Header,
    CharacterLayout,
    HelloWorld
  }
})
export default class App extends Vue {
  store: any;
  beforeMount () {
    this.store = useStore(key)
    this.store.dispatch('loadVKProfile')
  }
}
</script>

<style lang="scss">
  body {
    width: 800px;
    margin: 0;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #e8b691;
    position: relative;
    overflow: hidden;
  }
</style>
