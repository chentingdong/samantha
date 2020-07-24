import React from "react";
import { Create, SimpleForm, TextInput, BooleanInput } from "react-admin";
import { nanoid } from "nanoid";

export const BlockCreate = (props) => (
  <Create title="Create New Block" {...props}>
    <SimpleForm initialValues={{ id: nanoid() }}>
      <TextInput source="id" />
      <TextInput source="type" />
      <BooleanInput source="is_definition" />
    </SimpleForm>
  </Create>
);

export default BlockCreate;
