<template>
  <div class="profile-container" v-if="store.state.vkProfile && character">
    <div class="profile-img">
<!--      <img :src="store.state.vkProfile.photo_200">-->
      Тут будет ваше фото
    </div>
    <div class="profile-data">
      <div class="profile-name">
        <span class="profile-title" v-html="playerTitle"></span>
        <span class="profile-hp">HP: ({{store.state.character.current_health}}/{{store.state.character.health}})</span>
      </div>
      <div class="stats-container">
        <div class="stats-block">
          <div class="stats-block__title">Базовые</div>
          <ul class="stats-block__data">
            <CharacterStateItem
              title="Выносливость"
              v-bind:value="character?.stamina"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Ловкость"
              v-bind:value="character?.agility"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Интуиция"
              v-bind:value="character?.intuition"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Дух"
              v-bind:value="character?.spirit"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Атака"
              v-bind:value="character?.attack"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Защита"
              v-bind:value="character?.protection"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Меткость"
              v-bind:bonus="store.getters.bonusAccuracy"
              v-bind:value="character?.accuracy"
            ></CharacterStateItem>
          </ul>
        </div>
        <div class="stats-block">
          <div class="stats-block__title">Боевые</div>
          <ul class="stats-block__data">
            <CharacterStateItem
              title="Уворот"
              v-bind:bonus="0"
              v-bind:value="store.state.character.cnt_dodge"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Блок"
              v-bind:bonus="store.getters.bonusBlock"
              v-bind:value="store.state.character.cnt_block"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Хит"
              v-bind:value="character?.cnt_hit"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Крит"
              v-bind:bonus="store.getters.bonusCrit"
              v-bind:value="character?.cnt_crit"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Урон"
              v-bind:bonus="store.getters.bonusDamage"
              v-bind:value="character?.cnt_getdmg"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Парирование"
              v-bind:bonus="store.getters.bonusParry"
              v-bind:value="character?.cnt_parry"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Подавление"
              v-bind:bonus="store.getters.bonusSuppress"
              v-bind:value="character?.cnt_suppression"
            ></CharacterStateItem>
            <CharacterStateItem
              title="Магия"
              v-bind:value="character?.cnt_magic"
            ></CharacterStateItem>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { useStore } from 'vuex'
import { key, StoreState } from '@/store'
import { ICharacter } from '@/modules/services/ICharacter'
import CharacterStateItem from '@/modules/profile/CharacterStateItem.vue'

@Options({
  props: {},
  components: {
    CharacterStateItem
  }
})
export default class Profile extends Vue {
    store: any;

    beforeMount () {
      this.store = useStore(key)
      this.store.dispatch('loadCharacter')
    }

    get state (): StoreState {
      return this.store.state
    }

    get character (): ICharacter {
      return this.store.state.character
    }

    get playerTitle () {
      return `${this.state.character?.emodji} ${this.state.character?.UserName}`
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .profile {
    &-container {
      display: flex;
      padding: 5px;
      margin: 5px 0;
      flex-direction: column;
    }

    &-name {
      font-weight: 800;
      font-size: 19px;
      display: flex;
      align-items: center;
    }

    &-data {
      padding-left: 15px;
    }

    &-hp {
      padding-left: 20px;
      font-size: 15px;
      color: #ce2828;
    }

    &-img {
      display: flex;
      align-items: center;
      border: 1px solid #333;
      padding: 10px;
    }
  }

  .stats {

    &-container {
      display: flex;
    }

    &-block {
      border: 1px solid #555;
      padding: 5px;
      margin: 17px 4px 0;
      border-radius: 2px;

      &__title {
        margin-top: -17px;
        background-color: #6facd8;
        font-weight: 800;
        border-radius: 2px;
      }

      &__data {
        margin: 5px 0 0 0;
        list-style: none;
        padding: 0;
        text-align: start;
        font-size: 14px;

        .stat-title {
          padding-right: 15px;
        }

        .stat-value {
          float: right;
        }

        .stat-bonus {
          float: right;
          padding-left: 7px;
        }
      }
    }
  }
</style>
