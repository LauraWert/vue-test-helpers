import { Wrapper } from '@vue/test-utils'
import { Vue } from 'vue/types/vue'

export function findRouterLinkStub(wrapper: Wrapper<Vue>, name: string): Wrapper<Vue> | undefined | never {
  const find = wrapper
    .findAll({ name: 'RouterLinkStub' })
    .filter((w: Wrapper<Vue>) => w.isVisible() &&
      w.element.attributes !== undefined &&
      w.attributes().name === name)

  if (find.length === 0) {
    return undefined
  }

  if (find.length > 1) {
    throw new Error('Found multiple RouterLinkStubs with same name')
  }

  return find.at(0)
}

export function findRouterLinkItemToName(wrapper: Wrapper<Vue>, name: string): string | undefined {
  const item = findRouterLinkStub(wrapper, name)
  if (!item) {
    return undefined
  }

  return item.props().to.name
}
