import Adapter from "enzyme-adapter-react-16"
import "jsdom-global/register"
import React from "react"
import { mount, configure } from "enzyme"
import { Button } from "../../src/components/Button"

configure({ adapter: new Adapter() })

describe("Button", () => {
  it("renders children properly", () => {
    const wrapper = mount(<Button>Bellhop</Button>)
    expect(wrapper.text()).toBe("Bellhop")
  })
})
