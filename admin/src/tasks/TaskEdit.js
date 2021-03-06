import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import JSONEditor from "../components/JSONEditor";

const TaskEdit = (props) => (
  <Edit undoable={false} {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <TextInput source="title" fullWidth />
      <JSONEditor source="fields" fullWidth />
    </SimpleForm>
  </Edit>
);

export default TaskEdit;
