import React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import { nanoid } from "nanoid";
import BlockSelectField from "../blocks/BlockSelectField";
import BellSelectField from "./BellSelectField";

export const BellCreate = (props) => (
  <Create title="Create New Bell" {...props}>
    <SimpleForm
      initialValues={{
        id: nanoid(),
        state: "Draft",
        is_definition: true,
      }}
    >
      <TextInput source="id" />
      <TextInput source="name" />
      <BooleanInput source="is_definition" />
      <BooleanInput source="acts_as_main_bell" />
      <ReferenceInput label="State" source="state" reference="m2_block_state">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput
        label="Main Bell"
        source="main_bell_id"
        reference="m2_bells"
      >
        <SelectInput optionText={<BellSelectField />} optionValue="id" />
      </ReferenceInput>{" "}
      <ReferenceInput
        label="Root Block"
        source="root_block_id"
        reference="m2_blocks"
      >
        <SelectInput optionText={<BlockSelectField />} optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default BellCreate;
