import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";

export const BellCreate = (props) => (
  <Create title="Create New Bell" {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="goal_name" />
      <BooleanInput source="is_definition" />
      <BooleanInput source="acts_as_main_bell" />
    </SimpleForm>
  </Create>
);

export default BellCreate;
