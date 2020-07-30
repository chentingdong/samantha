import React from "react";
import { Show, TextField, SimpleShowLayout } from "react-admin";
import JSONField from "../components/JSONField";

const TaskShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <JSONField source="fields" />
    </SimpleShowLayout>
  </Show>
);

export default TaskShow;
