import React from "react";
import { Datagrid, List, TextField, ReferenceField } from "react-admin";

const BellhopMembershipList = (props) => (
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
        label="User"
        source="user_id"
        reference="m2_users"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="role" />
    </Datagrid>
  </List>
);

export default BellhopMembershipList;
