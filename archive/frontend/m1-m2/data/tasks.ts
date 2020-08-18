// To simulate the tasks in a bell
const tasksDev = [
  {
    id: "HttfA2gqDC5Uek_WD-rpn",
    local_id: "cO64qn3wioY6O7h_LOi-L",
    name: "Task (What are you purchasing?)",
    type: "Task",
    state: "Completed",
    task: {
      fields: [
        {
          optional: false,
          question: "What are you purchasing?",
          response: "A new HVAC machine",
          response_type: "Text",
          max_field_size: 128,
          min_field_size: 4,
        },
      ],
    },
    parent_id: "bVeXuHvMlUVpbM2e4zMy9",
    configs: {},
    user_participations: [
      {
        role: "task_assignee",
        user: {
          id: "Google_115419186368884878540",
          name: "Tingdong Chen",
        },
      },
    ],
    created_at: "2020-07-30T07:42:49.683987+00:00",
    updated_at: "2020-07-30T07:42:49.683987+00:00",
    started_at: null,
    ended_at: null,
  },
  {
    id: "05rDLPiegRuF7-f72D-PK",
    local_id: "Fw2rwZaa27CIyilQKNqge",
    name: "Task (What categories describe this purchase?)",
    type: "Task",
    state: "Draft",
    task: {
      fields: [
        {
          optional: false,
          question: "What categories describe this purchase?",
          response: "Heating/Cooling",
          response_type: "MultiSelect",
          select_options: ["Heating/Cooling", "services", "other"],
        },
      ],
    },
    parent_id: "bVeXuHvMlUVpbM2e4zMy9",
    configs: {},
    user_participations: [],
    created_at: "2020-07-30T08:17:57.465675+00:00",
    updated_at: "2020-07-30T08:17:57.465675+00:00",
    started_at: null,
    ended_at: null,
  },
  {
    id: "G-M8ECueR0697Gx8buehJ",
    local_id: "vuJeHylhqX0YbTVtgDsZ7",
    name: "Task (How much do you need to budget?)",
    type: "Task",
    state: "Draft",
    task: {
      fields: [
        {
          optional: false,
          question: "How much do you need to budget in dollars?",
          response: 1234,
          max_value: null,
          min_value: 0,
          response_type: "Text",
        },
      ],
    },
    parent_id: "bVeXuHvMlUVpbM2e4zMy9",
    configs: {},
    user_participations: [],
    created_at: "2020-07-30T08:19:26.854575+00:00",
    updated_at: "2020-07-30T08:19:26.854575+00:00",
    started_at: null,
    ended_at: null,
  },
  {
    id: "QwpfcdLPH_iQqzbz7nFg-",
    local_id: "ZKinThbIS7TwdHA49RpZp",
    name: "Optional Task (Is it capitalizable?)",
    type: "Task",
    state: "Draft",
    task: {
      fields: [
        {
          optional: true,
          question: "Is it capitalizable?",
          response: "No",
          response_type: "single_select",
          select_options: ["Yes", "No"],
        },
      ],
    },
    parent_id: "bVeXuHvMlUVpbM2e4zMy9",
    configs: {},
    user_participations: [],
    created_at: "2020-07-30T08:20:08.788528+00:00",
    updated_at: "2020-07-30T08:20:08.788528+00:00",
    started_at: null,
    ended_at: null,
  },
  {
    id: "WWazDMHYOxCXCgTyND2js",
    local_id: "zFi6jh6a-pkIEXi1_8-md",
    name: "Conditional Task: (What is the depreciation period?)",
    type: "Task",
    state: "Draft",
    task: {
      fields: [
        {
          optional: true,
          question: "What is the depreciation period",
          response: "10+ years",
          response_type: "MultiSelect",
          select_options: ["<5 years", "5-10 years", "10+ years"],
        },
      ],
    },
    parent_id: "bVeXuHvMlUVpbM2e4zMy9",
    configs: {
      pre_conditions: [
        {
          op: "eq",
          lhs: "${Block.by_local_id=1234}.response",
          rhs: "Yes",
        },
      ],
    },
    user_participations: [],
    created_at: "2020-07-30T08:29:20.515691+00:00",
    updated_at: "2020-07-30T08:29:20.515691+00:00",
    started_at: null,
    ended_at: null,
  },
  {
    id: "QWhbnWC7Esg2UwIVIbbfG",
    local_id: "8o_yyJjEDKmhsRA1gIlv7",
    name: "Task (Head of Facilities Approval)",
    type: "Task",
    state: "Draft",
    task: {
      fields: [
        {
          optional: false,
          question: "Do you approve this purchase?",
          response: null,
          response_type: "MultiSelect",
          select_options: ["Approve", "Reject", "Reject for Edit"],
        },
      ],
    },
    parent_id: "0vNN_nHW0jc87jo-s8XPd",
    configs: {},
    user_participations: [],
    created_at: "2020-07-30T08:47:52.045784+00:00",
    updated_at: "2020-07-30T08:47:52.045784+00:00",
    started_at: null,
    ended_at: null,
  },
]
// const tasks = tasksDev?.filter((task) => {
//   return ["1", "2", "3", "4", "5"].includes(task.id)
// })
const tasks = tasksDev

export { tasks }
