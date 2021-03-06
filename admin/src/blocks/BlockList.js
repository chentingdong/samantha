import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  ReferenceField,
  BooleanField,
  DateField,
} from "react-admin";
import BlockFilter from "./BlockFilter";

const BlockList = (props) => (
  <List
    {...props}
    perPage={25}
    sort={{ field: "created_at", order: "DESC" }}
    filters={<BlockFilter />}
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
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Bell"
        source="bell_id"
        reference="m2_bells"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <DateField source="created_at" showTime />
      <DateField source="updated_at" showTime />
      <ShowButton />
    </Datagrid>
  </List>
);

export default BlockList;
