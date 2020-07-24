import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";

const BellhopMembershipEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="bellhop_id" />
      <TextInput source="user_id" />
      <TextInput source="role" />
    </SimpleForm>
  </Edit>
);

export default BellhopMembershipEdit;
