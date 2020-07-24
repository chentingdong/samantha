import React from "react";
import { Edit, SimpleForm, TextInput, BooleanInput } from "react-admin";
import BellTitle from "./BellTitle";

const BellEdit = (props) => (
  <Edit title={<BellTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="goal_name" />
      <BooleanInput source="is_definition" />
      <BooleanInput source="acts_as_main_bell" />
    </SimpleForm>
  </Edit>
);

export default BellEdit;
