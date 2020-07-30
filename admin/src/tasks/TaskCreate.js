import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
import { useLocation } from "react-router";
import { parse } from "query-string";
import JSONEditor from "../components/JSONEditor";

export const TaskCreate = (props) => {
  const location = useLocation();
  const { block_id } = parse(location.search);
  const redirect = `/m2_blocks/${block_id}/show`;

  return (
    <Create {...props}>
      <SimpleForm
        variant="outlined"
        initialValues={{ id: block_id, type: "Task" }}
        redirect={redirect}
      >
        <TextInput source="title" fullWidth />
        <JSONEditor source="fields" fullWidth />
      </SimpleForm>
    </Create>
  );
};

export default TaskCreate;
