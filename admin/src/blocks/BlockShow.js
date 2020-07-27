import React from "react";
import {
  Datagrid,
  TextField,
  Tab,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
  ReferenceField,
  BooleanField,
} from "react-admin";
import BlockTitle from "./BlockTitle";

const BlockShow = (props) => (
  <Show title={<BlockTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <BooleanField source="is_definition" />
        <TextField source="name" />
        <TextField source="type" />
        <TextField source="state" />
        <ReferenceField
          label="Parent"
          source="parent_id"
          reference="m2_blocks"
          link="show"
        >
          <TextField source="id" />
        </ReferenceField>
        <ReferenceManyField
          reference="m2_blocks"
          target="parent_id"
          label="Children"
        >
          <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="type" />
            <TextField source="state" />
          </Datagrid>
        </ReferenceManyField>
        <ReferenceField
          label="Bell"
          source="bell_id"
          reference="m2_bells"
          link="show"
        >
          <TextField source="id" />
        </ReferenceField>{" "}
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BlockShow;
