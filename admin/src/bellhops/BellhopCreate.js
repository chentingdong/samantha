import React from "react";
import { Create, SimpleForm, TextInput } from "react-admin";
import { nanoid } from "nanoid";

export const BellhopCreate = (props) => (
  <Create title="Create New Bellhop" {...props}>
    <SimpleForm
      variant="outlined"
      redirect="show"
      initialValues={{ id: nanoid() }}
    >
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="profile_image_url" label="Profile Image" />
    </SimpleForm>
  </Create>
);

export default BellhopCreate;
