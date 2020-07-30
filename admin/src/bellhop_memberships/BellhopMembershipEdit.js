import React from "react";
import { Edit, SimpleForm, ReferenceInput, SelectInput } from "react-admin";

const BellhopMembershipEdit = (props) => (
  <Edit {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <ReferenceInput
        label="Bellhop"
        source="bellhop_id"
        reference="m2_bellhops"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="User" source="user_id" reference="m2_users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        label="Role"
        source="role"
        reference="m2_membership_roles"
      >
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default BellhopMembershipEdit;
