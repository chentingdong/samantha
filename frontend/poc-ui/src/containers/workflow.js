import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import React from 'react';
import * as initData from './workflow-data.json';
import MonacoEditor from 'react-monaco-editor';

function Workflow () {
  const $ = go.GraphObject.make;

  const diagram = $(go.Diagram, {
    "LinkDrawn": showLinkLabel,
    "LinkRelinked": showLinkLabel,
    "undoManager.isEnabled": true
  });

  function showLinkLabel (e) {
    var label = e.subject.findObject("LABEL");
    if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
  }

  diagram.addDiagramListener("Modified", function (e) {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !diagram.isModified;
    var idx = document.title.indexOf("*");
    if (diagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });

  function nodeStyle () {
    return [
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      {
        locationSpot: go.Spot.Center
      }
    ];
  }

  function textStyle () {
    return {
      font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
      stroke: "#197441"
    }
  }

  function makePort (name, align, spot, output, input) {
    var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
    return $(go.Shape, {
      fill: "transparent",
      strokeWidth: 0,
      width: horizontal ? NaN : 8,
      height: !horizontal ? NaN : 8,
      alignment: align,
      stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
      portId: name,
      fromSpot: spot,
      fromLinkable: output,
      toSpot: spot,
      toLinkable: input,
      cursor: "pointer",
      mouseEnter: function (e, port) {
        if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
      },
      mouseLeave: function (e, port) {
        port.fill = "transparent";
      }
    });
  }

  diagram.nodeTemplateMap.add("Text",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Auto",
        $(go.Shape, "Rectangle",
          { fill: "#F8F8F8", stroke: "#00A9C9", strokeWidth: 3.5 },
          new go.Binding("figure", "figure")),
        $(go.TextBlock, textStyle(),
          {
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay())
      ),
      // four named ports, one on each side:
      makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
      makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false)
    ));

  diagram.nodeTemplateMap.add("Conditional",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Auto",
        $(go.Shape, "Diamond",
          { fill: "#F8F8F8", stroke: "#00A9C9", strokeWidth: 3.5 },
          new go.Binding("figure", "figure")),
        $(go.TextBlock, textStyle(),
          {
            margin: 8,
            maxSize: new go.Size(160, NaN),
            wrap: go.TextBlock.WrapFit,
            editable: true
          },
          new go.Binding("text").makeTwoWay())
      ),
      makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, go.Spot.Left, true, true),
      makePort("R", go.Spot.Right, go.Spot.Right, true, true),
      makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
    ));

  diagram.nodeTemplateMap.add("Start",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Spot",
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(70, 70), fill: "#F8F8F8", stroke: "#09d3ac", strokeWidth: 3.5 }),
        $(go.TextBlock, "Start", textStyle(),
          new go.Binding("text"))
      ),
      makePort("L", go.Spot.Left, go.Spot.Left, true, false),
      makePort("R", go.Spot.Right, go.Spot.Right, true, false),
      makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
    ));

  diagram.nodeTemplateMap.add("End",
    $(go.Node, "Table", nodeStyle(),
      $(go.Panel, "Spot",
        $(go.Shape, "Circle",
          { desiredSize: new go.Size(70, 70), fill: "#F8F8F8", stroke: "#DC3C00", strokeWidth: 3.5 }),
        $(go.TextBlock, "End", textStyle(),
          new go.Binding("text"))
      ),
      makePort("T", go.Spot.Top, go.Spot.Top, false, true),
      makePort("L", go.Spot.Left, go.Spot.Left, false, true),
      makePort("R", go.Spot.Right, go.Spot.Right, false, true)
    ));

  diagram.linkTemplate = $(go.Link,
    {
      routing: go.Link.AvoidsNodes,
      curve: go.Link.JumpOver,
      corner: 5, toShortLength: 4,
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true,

      mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
      mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; },
      selectionAdorned: false
    },
    new go.Binding("points").makeTwoWay(),
    $(go.Shape,
      { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
    $(go.Shape,
      { isPanelMain: true, stroke: "gray", strokeWidth: 2 },
      new go.Binding("stroke", "isSelected", function (sel) { return sel ? "dodgerblue" : "gray"; }).ofObject()),
    $(go.Shape,
      { toArrow: "standard", strokeWidth: 0, fill: "gray" }),
    $(go.Panel, "Auto",
      { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
      new go.Binding("visible", "visible").makeTwoWay(),
      $(go.Shape, "RoundedRectangle",
        { fill: "#F8F8F8", strokeWidth: 0 }),
      $(go.TextBlock, "Yes",
        {
          textAlign: "center",
          font: "10pt helvetica, arial, sans-serif",
          stroke: "#333333",
          editable: true
        },
        new go.Binding("text").makeTwoWay())
    )
  );

  diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
  diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

  diagram.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true },
        new go.Binding('text').makeTwoWay()
      )
    );

  function initDiagram () {
    return diagram
  }

  function save (e) {
    // this.nodeDataArray.map(node => {
    //   return Object.assign(node, )
    // })
    // arrayOne = arrayOne.map(item1 => {
    //   return Object.assign(item1, arrayTwo.find(item2 => {
    //     return item2 && item1.text === item2.text
    //   }))
    // })
    debugger
    document.getElementById("saved-model").value = diagram.model.toJson();
    diagram.isModified = false;
  }

  function load () {
    console.log(document.getElementById("saved-model").value);
    // diagram.model = go.Model.fromJson(document.getElementById("saved-model").value);
  }

  function initPalette () {
    const palette = $(go.Palette, {
      "animationManager.initialAnimationStyle": go.AnimationManager.None,
      "InitialAnimationStarting": animateFadeDown,

      nodeTemplateMap: diagram.nodeTemplateMap,
      model: new go.GraphLinksModel([
        { category: "Start", text: "Start" },
        { category: "Text", text: "Step" },
        { category: "Conditional", text: "condition" },
        { category: "End", text: "End" }
      ])
    });
    return palette
  }

  function animateFadeDown (e) {
    var diagram = e.diagram;
    var animation = new go.Animation();
    animation.isViewportUnconstrained = true;
    animation.easing = go.Animation.EaseOutExpo;
    animation.duration = 900;

    animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
    animation.add(diagram, 'opacity', 0, 1);
    animation.start();
  }

  return (
    <div className="container-fluid ">
      <div className="row workflow">
        <ReactPalette
          divClassName='palette-component col-2'
          initPalette={initPalette}
        />
        <div className="col-10">
          <ReactDiagram
            initDiagram={initDiagram}
            divClassName='diagram-component'
            nodeDataArray={initData[ 'nodeDataArray' ]}
            linkDataArray={initData[ 'linkDataArray' ]}
            onModelChange={save}
          />
          <MonacoEditor
            id="saved-model"
            className="col-12"
            language="javascript"
            theme="vs-light"
            value=""
            options={{
              selectOnLineNumbers: true
            }}
            onChange={load}
            // editorDidMount={load}
          />
        </div>
      </div>
    </div>
  );
}

export default Workflow