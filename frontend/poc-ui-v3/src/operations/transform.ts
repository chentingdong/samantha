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
    const transformedChild = _transformBlockInput(child, mutation_type)
    transformedChild.__mutation_type__==='CREATE' ? 
      childrenForCreate.push(transformedChild) :
      childrenForConnect.push(transformedChild)
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