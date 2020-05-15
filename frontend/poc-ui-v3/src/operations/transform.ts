const transformBlockInput = (block, mutation_type='CONNECT') => {
  if (!Object.isExtensible(block))
    block = {...block}
    
  block.__mutation_type__ ? 
    mutation_type = block.__mutation_type__ :
    block.__mutation_type__ = mutation_type  
  if (mutation_type === 'CREATE')
    delete block.id
  
  delete block.parent

  const childrenForCreate = []
  const childrenForConnect = []
  for (const child of block.children) {
    const transformedChild = transformBlockInput(child, mutation_type)
    transformedChild.__mutation_type__==='CREATE' ? 
      childrenForCreate.push(transformedChild) :
      childrenForConnect.push(transformedChild)
  }
  block.children = {create: childrenForCreate, connect: childrenForConnect}
  
  block.requestors = {connect: block.requestors}
  block.responders = {connect: block.responders}

  return block
}

export { transformBlockInput }