import React from "react";
import { Create, SimpleForm, ReferenceInput, SelectInput } from "react-admin";
import { useLocation } from "react-router";
import { parse } from "query-string";

export const UserBellParticipationCreate = (props) => {
  const location = useLocation();
  const { user_id } = parse(location.search);
  const user_redirect = user_id ? `/m2_users/${user_id}/show/bells` : "";
  const { bell_id } = parse(location.search);
  const bell_redirect = bell_id ? `/m2_bells/${bell_id}/show/users` : "";

  return (
    <Create {...props}>
      <SimpleForm
        variant="outlined"
        initialValues={{ user_id, bell_id }}
        redirect={bell_redirect || user_redirect}
      >
        {!user_id && (
          <ReferenceInput label="User" source="user_id" reference="m2_users">
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        {!bell_id && (
          <ReferenceInput label="Bell" source="bell_id" reference="m2_bells">
            <SelectInput optionText="name" />
          </ReferenceInput>
        )}
        <ReferenceInput
          label="Role"
          source="role"
          reference="m2_participation_roles"
          filter={{ "id@_ilike": "bell" }}
        >
          <SelectInput optionText="id" optionValue="id" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export default UserBellParticipationCreate;
