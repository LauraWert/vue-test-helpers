export function findRouterLinkStub (wrapper, name) {
  const find = wrapper.findAll({name: 'RouterLinkStub'}).filter(w => w.isVisible() && w.element.attributes !== undefined && w.attributes().name === name)
  if (find.length === 0) {
    return undefined
  }
  if (find.length > 1) {
    throw new Error('Found multiple RouterLinkStubs with same name')
  }
  return find.at(0)
}

export function findRouterLinkItemToName (wrapper, name) {
  const item = findRouterLinkStub(wrapper, name)
  if (!item) {
    return undefined
  }
  return item.props().to.name
}
