import React from "react";
import {
  ShowController,
  ShowView,
  Datagrid,
  TextField,
  Tab,
  Show,
  TabbedShowLayout,
  ReferenceManyField,
  ReferenceField,
  BooleanField,
} from "react-admin";
import BlockTitle from "./BlockTitle";
import JSONField from "../components/JSONField";
import AddTaskDetailButton from "./AddTaskDetailButton";
import AddGoalDetailButton from "./AddGoalDetailButton";
import AddBellExecutorDetailButton from "./AddBellExecutorDetailButton";

const BlockShow = (props) => (
  <ShowController title={<BlockTitle />} {...props}>
    {(controllerProps) => (
      <ShowView {...props} {...controllerProps}>
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
              <TextField source="id" />
            </ReferenceField>
            <ReferenceManyField
              reference="m2_blocks"
              target="parent_id"
              label="Children"
            >
              <Datagrid rowClick="show">
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="type" />
                <TextField source="state" />
              </Datagrid>
            </ReferenceManyField>
            <ReferenceField
              label="Bell"
              source="bell_id"
              reference="m2_bells"
              link="show"
            >
              <TextField source="id" />
            </ReferenceField>
          </Tab>
          {controllerProps.record && controllerProps.record.type === "Task" && (
            <Tab label="Task Detail">
              <ReferenceField
                label="Title"
                source="id"
                reference="m2_tasks"
                link="show"
              >
                <TextField source="title" />
              </ReferenceField>
              <ReferenceField
                label="Fields"
                source="id"
                reference="m2_tasks"
                link="show"
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
                link="show"
              >
                <TextField source="goal_name" />
              </ReferenceField>
              <ReferenceField
                label="Success Conditions"
                source="id"
                reference="m2_goals"
                link="show"
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
                  reference="m2_goals"
                  link="show"
                >
                  <ReferenceField
                    label="Bell"
                    source="bell_id"
                    reference="m2_bells"
                    link="show"
                  >
                    <TextField source="id" />
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
