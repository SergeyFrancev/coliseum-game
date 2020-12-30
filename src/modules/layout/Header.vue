<template>
  <ul class="header">
    <li>Персонаж</li>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    msg: String
  }
})
export default class Header extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header {
    display: flex;
    list-style: none;
    background: #060c22;
    padding: 6px 15px;
    margin: 0;

    li {
      padding: 5px 10px;
      border: 1px solid #2f2f2f;
      border-radius: 2px;
      cursor: pointer;
      color: #eee;
    }
  }
</style>
