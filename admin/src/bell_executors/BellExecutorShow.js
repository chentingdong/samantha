import React from "react";
import { Show, TextField, ReferenceField, SimpleShowLayout } from "react-admin";
import JSONField from "../components/JSONField";

const BellExecutorShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField
        label="Bell"
        source="bell_id"
        reference="m2_bells"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
    </SimpleShowLayout>
  </Show>
);

export default BellExecutorShow;
