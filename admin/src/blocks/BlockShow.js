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
        <TextField source="type" />
        <BooleanField source="is_definition" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BlockShow;
