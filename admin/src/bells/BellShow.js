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
  RichTextField,
} from "react-admin";
import BellTitle from "./BellTitle";
import AddBellhopParticipationButton from "./AddBellhopParticipationButton";
import JSONField from "../components/JSONField";

const BellShow = (props) => (
  <Show title={<BellTitle />} {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <BooleanField source="is_definition" />
        <BooleanField source="acts_as_main_bell" />
        <TextField source="state" />
        <JSONField source="context" />
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
      <Tab label="Bellhops" path="bellhops">
        <ReferenceManyField
          addLabel={false}
          reference="m2_bellhop_bell_participations"
          target="bell_id"
        >
          <Datagrid>
            <ReferenceField
              label="Bellhops"
              source="bellhop_id"
              reference="m2_bellhops"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <TextField source="role" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <AddBellhopParticipationButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BellShow;
