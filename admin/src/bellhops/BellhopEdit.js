import React from "react";
import { Edit, SimpleForm, TextInput, ImageField } from "react-admin";
import BellhopTitle from "./BellhopTitle";

const BellhopEdit = (props) => (
  <Edit undoable={false} title={<BellhopTitle />} {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <TextInput source="name" />
      <TextInput source="profile_image_url" label="Profile Image" />
      <ImageField source="profile_image_url" />
    </SimpleForm>
  </Edit>
);

export default BellhopEdit;
