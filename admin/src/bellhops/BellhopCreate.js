import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
import { nanoid } from "nanoid";

export const BellhopCreate = (props) => (
  <Create title="Create New Bellhop" {...props}>
    <SimpleForm initialValues={{ id: nanoid() }}>
      <TextInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export default BellhopCreate;