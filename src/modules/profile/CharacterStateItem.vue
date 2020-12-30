<template>
  <li>
    <span class="stat-title">{{title}}: </span>
    <span class="stat-bonus"
          v-bind:class="{ positive: positiveBonus, negative: negativeBonus, neutral: neutralBonus }">
      {{bonusSymbol}}{{bonus}}
    </span>
    <span class="stat-value">{{value}}</span>
  </li>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    title: String,
    value: Number,
    bonus: Number
  }
})
export default class CharacterStateItem extends Vue {
    title!: string;
    value = 0;
    bonus = 0;

    get positiveBonus (): boolean {
      return this.bonus > 0
    }

    get negativeBonus (): boolean {
      return this.bonus < 0
    }

    get neutralBonus (): boolean {
      return this.bonus === 0
    }

    get bonusSymbol (): string {
      if (this.positiveBonus) return '+'
      if (this.negativeBonus) return '-'
      return ''
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .stat{
    &-title {
      padding-right: 15px;
    }

    &-value {
      float: right;
    }

    &-bonus {
      float: right;
      padding-left: 7px;
      font-weight: 700;

      &.positive {
        color: #23b123;
      }

      &.negative {
        color: red;
      }

      &.neutral {
        opacity: 0;
      }
    }
  }
</style>
