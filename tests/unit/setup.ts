import chai from 'chai'
import sinonChai from 'sinon-chai'
import { addQuasarToVue } from 'src/setup-vue'
import VeeValidate from 'vee-validate'
import Vue from 'vue'

Vue.use(VeeValidate, {
  locale: 'nl',
})

chai.use(sinonChai)
addQuasarToVue()
