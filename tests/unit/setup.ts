import chai from 'chai'
import sinonChai from 'sinon-chai'
import { addQuasarToVue } from 'src/setup-vue'

chai.use(sinonChai)
addQuasarToVue()
