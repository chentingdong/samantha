import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import BellTitle from "./BellTitle";
import BlockSelectField from "../blocks/BlockSelectField";
import BellSelectField from "./BellSelectField";
import RichTextInput from "ra-input-rich-text";

const BellEdit = (props) => (
  <Edit title={<BellTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <BooleanInput source="is_definition" />
      <BooleanInput source="acts_as_main_bell" />
      <ReferenceInput label="State" source="state" reference="m2_block_state">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <TextInput source="context" />
      <ReferenceInput
        label="Main Bell"
        source="main_bell_id"
        reference="m2_bells"
      >
        <SelectInput optionText={<BellSelectField />} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput
        label="Root Block"
        source="root_block_id"
        reference="m2_blocks"
      >
        <SelectInput optionText={<BlockSelectField />} optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default BellEdit;
