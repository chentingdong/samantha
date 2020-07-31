import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import JSONEditor from "../components/JSONEditor";

const GoalEdit = (props) => (
  <Edit undoable={false} {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <TextInput source="goal_name" fullWidth />
      <JSONEditor source="success_conditions" fullWidth />
    </SimpleForm>
  </Edit>
);

export default GoalEdit;
