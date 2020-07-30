import React from "react";
import { Show, TextField, SimpleShowLayout } from "react-admin";
import JSONField from "../components/JSONField";

const GoalShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="goal_name" label="Goal Name" />
      <JSONField source="success_conditions" label="Success Conditions" />
    </SimpleShowLayout>
  </Show>
);

export default GoalShow;
