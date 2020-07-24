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

const BellList = (props) => (
  <List {...props} sort={{ field: "name", order: "ASC" }}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="goal_name" />
      <BooleanField source="is_definition" />
      <BooleanField source="acts_as_main_bell" />
      <ShowButton />
    </Datagrid>
  </List>
);

export default BellList;
