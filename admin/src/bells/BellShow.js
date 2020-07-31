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
  DateField,
} from "react-admin";
import BellTitle from "./BellTitle";
import AddBellhopParticipationButton from "./AddBellhopParticipationButton";
import AddUserParticipationButton from "./AddUserParticipationButton";
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
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          label="Root Block"
          source="root_block_id"
          reference="m2_blocks"
          link="show"
        >
          <TextField source="name" />
        </ReferenceField>
        <DateField source="created_at" showTime />
        <DateField source="updated_at" showTime />
        <DateField source="started_at" showTime />
        <DateField source="ended_at" showTime />
      </Tab>
      <Tab label="Blocks">
        <ReferenceManyField
          target="bell_id"
          reference="m2_blocks"
          label="Blocks"
          sort={{ field: "created_at", order: "DESC" }}
        >
          <Datagrid rowClick="show">
            <TextField source="name" />
            <BooleanField source="is_definition" />
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
            </ReferenceField>
            <DateField source="created_at" showTime />
            <DateField source="updated_at" showTime />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Sub Bells">
        <ReferenceManyField
          target="main_bell_id"
          reference="m2_bells"
          label="Sub Bells"
          sort={{ field: "created_at", order: "DESC" }}
        >
          <Datagrid rowClick="show">
            <TextField source="name" />
            <BooleanField source="is_definition" />
            <BooleanField source="acts_as_main_bell" />
            <TextField source="state" />
            <ReferenceField
              label="Main Bell"
              source="main_bell_id"
              reference="m2_bells"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <ReferenceField
              label="Root Block"
              source="root_block_id"
              reference="m2_blocks"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <DateField source="created_at" showTime />
            <DateField source="updated_at" showTime />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
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
      <Tab label="Users" path="users">
        <ReferenceManyField
          addLabel={false}
          reference="m2_user_bell_participations"
          target="bell_id"
        >
          <Datagrid>
            <ReferenceField
              label="Users"
              source="user_id"
              reference="m2_users"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <TextField source="role" />
            <ShowButton />
          </Datagrid>
        </ReferenceManyField>
        <AddUserParticipationButton />
      </Tab>
    </TabbedShowLayout>
  </Show>
);

export default BellShow;
