import Vue from 'vue'
import { ajax } from 'rxjs/ajax'
import { pluck } from 'rxjs'

Vue.use({
  install: (app) => {
    app.prototype.$golApi = {
      process: sector => ajax({
        url: 'http://localhost:8080/v1/compute',
        method: 'POST',
        body: {
          data: sector
        }
      }).pipe(pluck('response', 'data'))
    }
  }
})
