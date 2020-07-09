"use strict"

import React from "react"
import { Button } from "../../src/components/Button"
import renderer from "react-test-renderer"

describe("Button", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Button className="primary">Bellhop</Button>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
