import Adapter from "enzyme-adapter-react-16"
import "jsdom-global/register"
import React from "react"
import { mount, configure } from "enzyme"
import { Button } from "../../src/components/Button"
import "@testing-library/jest-dom/extend-expect"

configure({ adapter: new Adapter() })

describe("Button", () => {
  let component
  beforeAll(() => {
    component = mount(<Button className="p-2">Bellhop</Button>)
  })

  it("renders children properly", () => {
    expect(component.text()).toBe("Bellhop")
  })

  it("passes className correctly", () => {
    expect(component.prop("className")).toBe("p-2")
  })
})
