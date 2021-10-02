import Vue from 'vue'
import { ajax } from 'rxjs/ajax'
import { pluck } from 'rxjs'

Vue.use({
  install: (app) => {
    app.prototype.$golApi = {
      process: (matrix, coordinate) => ajax({
        url: 'http://localhost:8080/v1/compute',
        method: 'POST',
        body: {
          data: {
            data: matrix,
            coordinate
          }
        }
      }).pipe(pluck('response', 'data'))
    }
  }
})
