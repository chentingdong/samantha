"use strict"

import React from "react"
import { Button, Drawer } from "../../src/components/"
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

describe("Drawer", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Drawer show={null} close={null}>
        Drawer content...
      </Drawer>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
