import React from "react";
import {
  Datagrid,
  TextField,
  Tab,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
  ShowButton,
  ReferenceField,
  BooleanField,
} from "react-admin";
import BlockTitle from "./BlockTitle";
import AddUserParticipationButton from "./AddUserParticipationButton";

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
