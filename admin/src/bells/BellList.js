import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  ReferenceField,
  BooleanField,
} from "react-admin";

const BellList = (props) => (
  <List {...props} sort={{ field: "name", order: "ASC" }}>
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
      <ShowButton />
    </Datagrid>
  </List>
);

export default BellList;