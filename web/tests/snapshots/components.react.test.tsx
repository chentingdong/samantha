"use strict"

import {
  Button,
  Card,
  Confirm,
  Drawer,
  FormValidationMessage,
} from "src/components"

import React from "react"
import renderer from "react-test-renderer"

describe("Button", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Button className="primary">Bellhop</Button>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe.skip("Drawer", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Drawer show={console.log("show")} close={console.log("hide")}>
        Drawer content...
      </Drawer>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("Card", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Card colors="primary">Drawer content...</Card>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("Confirm", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <Confirm onYes={null} onNo={null}>
        Drawer content...
      </Confirm>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe("FormValidationMessage", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      <FormValidationMessage errors={null}>
        Drawer content...
      </FormValidationMessage>
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
