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
  SingleFieldList,
  ChipField,
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
        <TextField source="state" />
        <ReferenceManyField
          reference="m2_bells"
          target="main_bell_id"
          label="Goals"
        >
          <SingleFieldList linkType="show">
            <ChipField source="goal_name" />
          </SingleFieldList>
        </ReferenceManyField>
        <ReferenceField
          label="Main Bell"
          source="main_bell_id"
          reference="m2_bells"
          link="show"
        >
          <TextField source="id" />
        </ReferenceField>
        <ReferenceField
          label="Root Block"
          source="root_block_id"
          reference="m2_blocks"
          link="show"
        >
          <TextField source="id" />
        </ReferenceField>
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BellShow;
