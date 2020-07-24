import React from "react";
import {
  Datagrid,
  List,
  TextField,
  SingleFieldList,
  ChipField,
  ShowButton,
  ReferenceManyField,
  ReferenceField,
  BooleanField,
} from "react-admin";

const BlockList = (props) => (
  <List {...props} sort={{ field: "id", order: "ASC" }}>
    <Datagrid rowClick="show">
      <TextField source="type" />
      <BooleanField source="is_definition" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default BlockList;
