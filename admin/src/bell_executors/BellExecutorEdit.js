import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import JSONEditor from "../components/JSONEditor";

const BellExecutorEdit = (props) => (
  <Edit {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default BellExecutorEdit;
