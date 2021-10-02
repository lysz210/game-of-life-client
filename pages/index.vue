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
            v-for="(row, i) in seed.matrix"
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
import { Grid } from '~/lib/universe'
export default {
  data: () => ({
    seed: new Grid(5, () => ref(0))
  }),
  created () {
    this.seed.matrix[2][0].value = 1
    this.seed.matrix[1][1].value = 1
    this.seed.matrix[0][2].value = 1
    this.seed.matrix[1][3].value = 1
    this.seed.matrix[2][4].value = 1
    this.seed.matrix[3][3].value = 1
    this.seed.matrix[4][2].value = 1
    this.seed.matrix[3][1].value = 1
    this.seed.expand(3)
  },
  methods: {
    toggle (cell) {
      cell.value = (cell.value + 1) % 2
    }
  }
}
</script>
