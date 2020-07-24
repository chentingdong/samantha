import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";
import { nanoid } from "nanoid";

export const BellCreate = (props) => (
  <Create title="Create New Bell" {...props}>
    <SimpleForm initialValues={{ id: nanoid() }}>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="goal_name" />
      <BooleanInput source="is_definition" />
      <BooleanInput source="acts_as_main_bell" />
    </SimpleForm>
  </Create>
);

export default BellCreate;
