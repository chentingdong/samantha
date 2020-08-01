import React from "react";
import { Edit, SimpleForm, ReferenceInput, SelectInput } from "react-admin";

const BellExecutorEdit = (props) => (
  <Edit undoable={false} {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default BellExecutorEdit;
