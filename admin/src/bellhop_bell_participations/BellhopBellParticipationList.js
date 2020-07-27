import React from "react";
import {
  Datagrid,
  List,
  TextField,
  ReferenceArrayField,
  ArrayField,
  SingleFieldList,
  ChipField,
  ReferenceField,
} from "react-admin";

const BellhopBellParticipationList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <ReferenceField
        label="Bellhop"
        source="bellhop_id"
        reference="m2_bellhops"
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
      <TextField source="role" />
    </Datagrid>
  </List>
);

export default BellhopBellParticipationList;
