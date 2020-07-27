import React from "react";
import { Show, TextField, ReferenceField, SimpleShowLayout } from "react-admin";

const BellhopBellParticipationShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField
        label="Bellhop"
        source="bellhop_id"
        reference="m2_bellhops"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField
        label="Bell"
        source="bell_id"
        reference="m2_bells"
        link="show"
      >
        <TextField source="name" />
      </ReferenceField>
      <TextField source="role" />
    </SimpleShowLayout>
  </Show>
);

export default BellhopBellParticipationShow;
