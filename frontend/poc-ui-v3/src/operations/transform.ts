const _transformBlockInput = (block, mutation_type='CONNECT') => {
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
    if (child.__mutation_type__==='CREATE') {
      const transformedChild = _transformBlockInput(child, mutation_type)
      childrenForCreate.push(transformedChild)
    } else {
      childrenForConnect.push({ id: child.id })
    }
  }
  block.children = {}
  if (childrenForCreate.length > 0) 
    block.children.create = childrenForCreate
  if (childrenForConnect.length > 0) 
    block.children.connect = childrenForConnect
  
  block.requestors = {connect: block.requestors?.map((id)=>({id: id}))}
  block.responders = {connect: block.responders?.map((id)=>({id: id}))}

  return block
}

const _clearnBlockInput = (block) => {
  delete block.__mutation_type__
  delete block.__typename
  block.children?.create?.map((child)=>_clearnBlockInput(child))
  block.children?.connect?.map((child)=>_clearnBlockInput(child))
  return block
}

const transformBlockInput = (block) => {
  return _clearnBlockInput(_transformBlockInput(block))
}

export { transformBlockInput }