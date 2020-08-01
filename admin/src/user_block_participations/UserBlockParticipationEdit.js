import React from "react";
import { Edit, SimpleForm, ReferenceInput, SelectInput } from "react-admin";

const UserBlockParticipationEdit = (props) => (
  <Edit undoable={false} {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <ReferenceInput label="User" source="user_id" reference="m2_users">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Block" source="block_id" reference="m2_blocks">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput
        label="Role"
        source="role"
        reference="m2_participation_roles"
      >
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default UserBlockParticipationEdit;
