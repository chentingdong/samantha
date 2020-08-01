import React from "react";
import { Create, SimpleForm, ReferenceInput, SelectInput } from "react-admin";
import { useLocation } from "react-router";
import { parse } from "query-string";

export const BellhopBellParticipationCreate = (props) => {
  const location = useLocation();
  const { bellhop_id } = parse(location.search);
  const bellhop_redirect = bellhop_id
    ? `/m2_bellhops/${bellhop_id}/show/bells`
    : "";
  const { bell_id } = parse(location.search);
  const bell_redirect = bell_id ? `/m2_bells/${bell_id}/show/bellhops` : "";

  return (
    <Create {...props}>
      <SimpleForm
        variant="outlined"
        initialValues={{ bellhop_id, bell_id }}
        redirect={bell_redirect || bellhop_redirect}
      >
        {!bellhop_id && (
          <ReferenceInput
            label="Bellhop"
            source="bellhop_id"
            reference="m2_bellhops"
          >
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

export default BellhopBellParticipationCreate;
