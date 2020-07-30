import React from "react";
import { Show, TextField, ReferenceField, SimpleShowLayout } from "react-admin";

const UserBellParticipationShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField
        label="User"
        source="user_id"
        reference="m2_users"
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

export default UserBellParticipationShow;
