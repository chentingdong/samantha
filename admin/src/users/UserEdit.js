import React from "react";
import { Edit, SimpleForm, TextInput, ImageField } from "react-admin";
import UserTitle from "./UserTitle";

const UserEdit = (props) => (
  <Edit title={<UserTitle/>} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="given_name" />
      <TextInput source="family_name" />
      <TextInput source="picture" />
      <ImageField source="picture" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
