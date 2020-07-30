import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
import { useLocation } from "react-router";
import { parse } from "query-string";
import JSONEditor from "../components/JSONEditor";

export const GoalCreate = (props) => {
  const location = useLocation();
  const { block_id } = parse(location.search);
  const redirect = `/m2_blocks/${block_id}/show`;

  return (
    <Create {...props}>
      <SimpleForm
        variant="outlined"
        initialValues={{ id: block_id, type: "Goal" }}
        redirect={redirect}
      >
        <TextInput source="goal_name" fullWidth />
        <JSONEditor source="success_conditions" fullWidth />
      </SimpleForm>
    </Create>
  );
};

export default GoalCreate;
