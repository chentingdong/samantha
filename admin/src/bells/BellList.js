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

const BellList = (props) => (
  <List {...props} perPage={25} sort={{ field: "created_at", order: "DESC" }}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="description" />
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
  </List>
);

export default BellList;
