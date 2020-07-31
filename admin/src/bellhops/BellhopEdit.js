import React from "react";
import { Edit, SimpleForm, TextInput } from "react-admin";
import BellhopTitle from "./BellhopTitle";

const BellhopEdit = (props) => (
  <Edit undoable={false} title={<BellhopTitle />} {...props}>
    <SimpleForm variant="outlined" redirect="show">
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export default BellhopEdit;
