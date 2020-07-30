import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ShowButton,
  ReferenceField,
  BooleanField,
} from "react-admin";

const BlockList = (props) => (
  <List {...props} sort={{ field: "id", order: "ASC" }}>
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
      <ShowButton />
    </Datagrid>
  </List>
);

export default BlockList;
