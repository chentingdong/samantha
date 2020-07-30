import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import JSONEditor from "../components/JSONEditor";

const GoalEdit = (props) => (
  <Edit {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <TextInput source="goal_name" fullWidth />
      <JSONEditor source="success_conditions" fullWidth />
    </SimpleForm>
  </Edit>
);

export default GoalEdit;
