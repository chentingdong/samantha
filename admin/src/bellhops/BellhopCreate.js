import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";

export const BellhopCreate = (props) => (
  <Create title="Create New Bellhop" {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

export default BellhopCreate;
