import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

const BellhopBellParticipationEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Bellhop"
        source="bellhop_id"
        reference="m2_bellhops"
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
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

export default BellhopBellParticipationEdit;
