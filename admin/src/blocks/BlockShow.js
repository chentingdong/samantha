import React from "react";
import {
  ShowController,
  ShowView,
  Datagrid,
  TextField,
  Tab,
  TabbedShowLayout,
  ReferenceManyField,
  ReferenceField,
  BooleanField,
  NumberField,
  ShowButton,
  DateField,
} from "react-admin";
import BlockTitle from "./BlockTitle";
import JSONField from "../components/JSONField";
import AddUserParticipationButton from "./AddUserParticipationButton";
import AddTaskDetailButton from "./AddTaskDetailButton";
import AddGoalDetailButton from "./AddGoalDetailButton";
import AddBellExecutorDetailButton from "./AddBellExecutorDetailButton";

const BlockShow = (props) => (
  <ShowController {...props}>
    {(controllerProps) => (
      <ShowView title={<BlockTitle />} {...props} {...controllerProps}>
        <TabbedShowLayout>
          <Tab label="Summary">
            <TextField source="name" />
            <BooleanField source="is_definition" />
            <TextField source="type" />
            <TextField source="state" />
            <JSONField source="configs" />
            <ReferenceField
              label="Parent"
              source="parent_id"
              reference="m2_blocks"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <NumberField source="sibling_order" />
            <ReferenceManyField
              reference="m2_blocks"
              target="parent_id"
              label="Children"
              sort={{ field: "sibling_order", order: "ASC" }}
            >
              <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="type" />
                <TextField source="state" />
                <NumberField source="sibling_order" />
              </Datagrid>
            </ReferenceManyField>
            <ReferenceField
              label="Bell"
              source="bell_id"
              reference="m2_bells"
              link="show"
            >
              <TextField source="name" />
            </ReferenceField>
            <DateField source="created_at" showTime />
            <DateField source="updated_at" showTime />
            <DateField source="started_at" showTime />
            <DateField source="ended_at" showTime />
          </Tab>
          <Tab label="Users" path="users">
            <ReferenceManyField
              addLabel={false}
              reference="m2_user_block_participations"
              target="block_id"
            >
              <Datagrid>
                <ReferenceField
                  label="Users"
                  source="user_id"
                  reference="m2_users"
                  link="show"
                >
                  <TextField source="name" />
                </ReferenceField>
                <TextField source="role" />
                <ShowButton />
              </Datagrid>
            </ReferenceManyField>
            <AddUserParticipationButton />
          </Tab>
          {controllerProps.record && controllerProps.record.type === "Task" && (
            <Tab label="Task Detail">
              <ReferenceField
                label="Title"
                source="id"
                reference="m2_tasks"
                link="edit"
              >
                <TextField source="title" />
              </ReferenceField>
              <ReferenceField
                label="Fields"
                source="id"
                reference="m2_tasks"
                link="edit"
              >
                <JSONField source="fields" />
              </ReferenceField>
              <AddTaskDetailButton />
            </Tab>
          )}
          {controllerProps.record && controllerProps.record.type === "Goal" && (
            <Tab label="Goal Detail">
              <ReferenceField
                label="Goal Name"
                source="id"
                reference="m2_goals"
                link="edit"
              >
                <TextField source="goal_name" />
              </ReferenceField>
              <ReferenceField
                label="Success Conditions"
                source="id"
                reference="m2_goals"
                link="edit"
              >
                <JSONField source="success_conditions" />
              </ReferenceField>
              <AddGoalDetailButton />
            </Tab>
          )}
          {controllerProps.record &&
            controllerProps.record.type === "BellExecutor" && (
              <Tab label="Bell Executor Detail">
                <ReferenceField
                  label="Bell"
                  source="id"
                  reference="m2_bell_executors"
                  link="edit"
                >
                  <ReferenceField
                    label="Bell"
                    source="bell_id"
                    reference="m2_bells"
                    link={false}
                  >
                    <TextField source="name" />
                  </ReferenceField>
                </ReferenceField>
                <AddBellExecutorDetailButton />
              </Tab>
            )}
        </TabbedShowLayout>
      </ShowView>
    )}
  </ShowController>
);

export default BlockShow;
