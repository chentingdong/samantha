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
import BellTitle from "./BellTitle";
import AddBellhopParticipationButton from "./AddBellhopParticipationButton";

const BellShow = (props) => (
  <Show title={<BellTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <TextField source="goal_name" />
        <BooleanField source="is_definition" />
        <BooleanField source="acts_as_main_bell" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BellShow;
