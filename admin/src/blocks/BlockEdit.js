import React from "react";
import {
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";
import BlockTitle from "./BlockTitle";
import BlockSelectField from "./BlockSelectField";
import BellSelectField from "../bells/BellSelectField";

const BlockEdit = (props) => (
  <Edit title={<BlockTitle />} {...props}>
    <SimpleForm>
      <BooleanInput source="is_definition" />
      <TextInput source="name" />
      <ReferenceInput label="Type" source="type" reference="m2_block_type">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="State" source="state" reference="m2_block_state">
        <SelectInput optionText="id" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Parent" source="parent_id" reference="m2_blocks">
        <SelectInput optionText={<BlockSelectField />} optionValue="id" />
      </ReferenceInput>
      <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
        <SelectInput optionText={<BellSelectField />} optionValue="id" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default BlockEdit;
