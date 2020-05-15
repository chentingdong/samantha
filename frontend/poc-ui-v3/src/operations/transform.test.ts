import { transformBlockInput } from "./transform"
import blockInput from "../../data/blockInput.json"

describe('Transform Block Input', () => {
  let result;
  beforeAll(()=>{
    result = transformBlockInput(blockInput)
  })

  it('should create or connect children', () => {
    expect(result.children?.create).toBeDefined()
    expect(result.children?.connect).toBeDefined()
  })

  it('should remove id for creates', () => {
    expect(result.children?.create[0].id).not.toBeDefined()
  })
  
  it('should keep id for connects', () => {
    expect(result.id).toBeDefined()
    expect(result.children?.connect[0].id).toBeDefined()
  })
  
  it('should connect requestors', () => {
    expect(result.requestors.connect).toBeDefined()
  })

  it('should connect responders', () => {
    expect(result.responders.connect).toBeDefined()
  })

  it('should have requestors as objects', () => {
    expect(result.requestors.connect[0]).toBeDefined()
  })

})