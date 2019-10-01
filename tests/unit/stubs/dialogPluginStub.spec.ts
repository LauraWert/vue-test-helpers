import sinon from 'sinon'
import { DialogPluginStub } from '../../../src'

const dialogStub = new DialogPluginStub()
const dialog = dialogStub.stub()
describe('dialogPluginStub', (): void => {
  beforeEach(() => {
    dialogStub.reset()
  })

  it('creates the dialog as a stub', (): void => {
    expect(dialog.name).to.equal('functionStub')
  })

  it('can trigger the onOke closure', (): void => {
    const onOk = sinon.stub()
    dialog().onOk(onOk)

    dialogStub.triggerOk()

    expect(onOk).to.be.calledOnce
  })

  it('can trigger the onCancel closure', (): void => {
    const onCancel = sinon.stub()
    dialog().onCancel(onCancel)

    dialogStub.triggerCancel()

    expect(onCancel).to.be.calledOnce
  })

  it('can trigger the onDismiss closure', (): void => {
    const onDismiss = sinon.stub()
    dialog().onDismiss(onDismiss)

    dialogStub.triggerDismiss()

    expect(onDismiss).to.be.calledOnce
  })

  it('can chain on functions', (): void => {
    const onDismiss = sinon.stub()
    dialog().onOk(() => { /**/ })
      .onDismiss(onDismiss)

    dialogStub.triggerDismiss()

    expect(onDismiss).to.be.calledOnce
  })
})
