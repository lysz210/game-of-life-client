<style scoped>
  .row {
    margin: 0;
  }
  .cell {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: white;
    border: 1px solid black;
  }
  .cell.active {
    background-color: red;
  }
</style>
<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Seed the world
        </v-card-title>
        <v-card-text>
          <p
            v-for="(row, i) in seed"
            :key="i"
            class="row"
          >
            <span
              v-for="(cell, j) in row"
              :key="`${i},${j}`"
              @click="toggle(cell)"
              class="cell"
              :class="{active: cell.value === 1}"
            ></span>
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ref } from '@vue/composition-api'
export default {
  data: () => ({
    size: 11,
    seed: []
  }),
  created () {
    this.updateSeedGrid()
    this.seed[5][3].value = 1
    this.seed[6][4].value = 1
    this.seed[7][5].value = 1
    this.seed[6][6].value = 1
    this.seed[5][7].value = 1
    this.seed[4][6].value = 1
    this.seed[3][5].value = 1
    this.seed[4][4].value = 1
  },
  methods: {
    toggle (cell) {
      cell.value = (cell.value + 1) % 2
    },
    updateSeedGrid () {
      this.seed = new Array(this.size)
      for (let i = 0; i < this.size; i++) {
        this.seed[i] = new Array(this.size)
        for (let j = 0; j < this.size; j++) {
          this.seed[i][j] = ref(0)
        }
      }
    }
  }
}
</script>
