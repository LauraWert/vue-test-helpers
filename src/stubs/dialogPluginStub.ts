import { DialogChainObject } from 'quasar/dist/types'
import sinon, { SinonStub } from 'sinon'

interface IDialogExtendedChainObject {
  _onOKClosure: () => void
  _onCancelClosure: () => void
  _onDismissClosure: () => void

  onCancel(callbackFn: () => void): DialogStubChainObject

  onOk(callbackFn: () => void): DialogStubChainObject

  onDismiss(callbackFn: () => void): DialogStubChainObject
}

export type DialogStubChainObject = IDialogExtendedChainObject & DialogChainObject

export class DialogPluginStub {
  private readonly stubObj: DialogStubChainObject

  constructor() {
    this.stubObj = {
      _onOKClosure: (): void => { /**/ },
      _onCancelClosure: (): void => { /**/ },
      _onDismissClosure: (): void => { /**/ },

      onOk(onOke: () => void): DialogStubChainObject {
        this._onOKClosure = onOke
        return this
      },

      onCancel(onCancel: () => void): DialogStubChainObject {
        this._onCancelClosure = onCancel
        return this
      },

      onDismiss(onDismiss: () => void): DialogStubChainObject {
        this._onDismissClosure = onDismiss
        return this
      },

      hide(): DialogStubChainObject {
        return this
      },
    }
  }

  public stub(): SinonStub {
    return sinon.stub().returns(this.stubObj)
  }

  public triggerOk(): void {
    this.stubObj._onOKClosure()
  }

  public triggerCancel(): void {
    this.stubObj._onCancelClosure()
  }

  public triggerDismiss(): void {
    this.stubObj._onDismissClosure()
  }

  public reset(): void {
    this.stubObj._onOKClosure = (): void => { /**/ }

    this.stubObj._onCancelClosure = (): void => { /**/ }

    this.stubObj._onDismissClosure = (): void => { /**/ }
  }
}
