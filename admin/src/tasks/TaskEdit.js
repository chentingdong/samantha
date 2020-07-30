import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import JSONEditor from "../components/JSONEditor";

const TaskEdit = (props) => (
  <Edit {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <TextInput source="title" fullWidth />
      <JSONEditor source="fields" fullWidth />
    </SimpleForm>
  </Edit>
);

export default TaskEdit;
