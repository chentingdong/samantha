import { Block } from "../../../types"

const block: Block = {
  id: "0vNN_nHW0jc87jo-s8XPd",
  local_id: "7Q1HhUA6rtEsZQVLIsSCk",
  bell_id: "s4Uq5-3xUX5bljHUIJMLW",
  state: "Created",
  type: "Goal",
  is_definition: false,
  name: "Conditional Goal (Get All Approvals)",
  configs: {
    control_type: "Parallel",
    pre_conditions: {
      all: [
        {
          fact: "context",
          path: "$.task.vuJeHylhqX0YbTVtgDsZ7.fields[0].response",
          value: 10000,
          operator: "greaterThan",
        },
      ],
    },
  },
  parent_id: "11OPQ53T10ju7GYERgBOP",
  children: [
    {
      id: "QWhbnWC7Esg2UwIVIbbfG",
      name: "Task (Head of Facilities Approval)",
      type: "Task",
      state: "Success",
      sibling_order: null,
    },
    {
      id: "tuqfR-7bTIsyHXgiq8XSP",
      name: "Sub Bell (Finance Approval) (bell_id incomplete)",
      type: "BellExecutor",
      state: "Created",
      sibling_order: null,
    },
  ],
  sibling_order: 1,
  updated_at: "2020-07-30T08:41:13.975206+00:00",
}

export default block
