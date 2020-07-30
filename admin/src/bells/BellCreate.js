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
import JSONEditor from "../components/JSONEditor";

export const BellCreate = (props) => (
  <Create title="Create New Bell" {...props}>
    <SimpleForm
      variant="outlined"
      redirect="show"
      initialValues={{
        id: nanoid(),
        local_id: nanoid(),
        state: "Draft",
        is_definition: true,
      }}
    >
      <TextInput source="id" />
      <TextInput source="name" fullWidth />
      <BooleanInput source="is_definition" />
      <BooleanInput source="acts_as_main_bell" />
      <ReferenceInput label="State" source="state" reference="m2_block_state">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <JSONEditor source="context" fullWidth />
      <ReferenceInput
        label="Main Bell"
        source="main_bell_id"
        reference="m2_bells"
        fullWidth
      >
        <SelectInput optionText={<BellSelectField />} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput
        label="Root Block"
        source="root_block_id"
        reference="m2_blocks"
        fullWidth
      >
        <SelectInput optionText={<BlockSelectField />} optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default BellCreate;
