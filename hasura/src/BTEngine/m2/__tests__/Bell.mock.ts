import { BellWithContext } from "../../../types"

const bell: BellWithContext = {
  blocks: [
    {
      id: "QWhbnWC7Esg2UwIVIbbfG",
      local_id: "8o_yyJjEDKmhsRA1gIlv7",
      type: "Task",
      state: "Success",
      started_at: null,
      ended_at: null,
      parent_id: "0vNN_nHW0jc87jo-s8XPd",
      children: [],
      sibling_order: null,
      task: {
        fields: [
          {
            optional: false,
            question: "Do you approve this purchase?",
            response_type: "SingleSelect",
            select_options: ["Approve", "Reject", "Reject for Edit"],
          },
        ],
      },
      bell_executor: null,
      users: [],
    },
    {
      id: "QwpfcdLPH_iQqzbz7nFg-",
      local_id: "ZKinThbIS7TwdHA49RpZp",
      type: "Task",
      state: "Running",
      started_at: null,
      ended_at: "2020-07-31T08:20:08.788528+00:00",
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: 4,
      task: {
        fields: [
          {
            optional: true,
            question: "Is it capitalizable?",
            response: "No",
            response_type: "SingleSelect",
            select_options: ["Yes", "No"],
          },
        ],
      },
      bell_executor: null,
      users: [
        {
          user_id: "Google_109551792009621810100",
          role: "task_follower",
        },
      ],
    },
    {
      id: "WWazDMHYOxCXCgTyND2js",
      local_id: "zFi6jh6a-pkIEXi1_8-md",
      type: "Task",
      state: "Created",
      started_at: null,
      ended_at: "2020-08-01T08:29:20.515691+00:00",
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: 5,
      task: {
        fields: [
          {
            optional: true,
            question: "What is the depreciation period",
            response: "10+ years",
            response_type: "SingleSelect",
            select_options: ["<5 years", "5-10 years", "10+ years"],
          },
        ],
      },
      bell_executor: null,
      users: [],
    },
    {
      id: "G-M8ECueR0697Gx8buehJ",
      local_id: "vuJeHylhqX0YbTVtgDsZ7",
      type: "Task",
      state: "Success",
      started_at: null,
      ended_at: null,
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: 3,
      task: {
        fields: [
          {
            optional: false,
            question: "How much do you need to budget in dollars?",
            response: 1234,
            min_value: 0,
            response_type: "Decimal",
          },
        ],
      },
      bell_executor: null,
      users: [],
    },
    {
      id: "HttfA2gqDC5Uek_WD-rpn",
      local_id: "cO64qn3wioY6O7h_LOi-L",
      type: "Task",
      state: "Success",
      started_at: "2020-07-30T07:42:49.683987+00:00",
      ended_at: "2020-08-04T07:56:09.051986+00:00",
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: null,
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
      bell_executor: null,
      users: [
        {
          user_id: "Google_115419186368884878540",
          role: "task_assignee",
        },
      ],
    },
    {
      id: "05rDLPiegRuF7-f72D-PK",
      local_id: "Fw2rwZaa27CIyilQKNqge",
      type: "Task",
      state: "Success",
      started_at: null,
      ended_at: null,
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: 2,
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
      bell_executor: null,
      users: [],
    },
    {
      id: "790hOnMXtRMBWhiZetAIK",
      local_id: "38CVmndMM-H1xXEIkWvrH",
      type: "Goal",
      state: "Success",
      started_at: null,
      ended_at: "2020-07-30T09:51:25.1418+00:00",
      parent_id: "11OPQ53T10ju7GYERgBOP",
      children: [
        {
          id: "f9-D98KF8ZHvNn5GIhBGw",
        },
      ],
      sibling_order: 2,
      task: null,
      bell_executor: null,
      users: [
        {
          user_id: "Google_109551792009621810100",
          role: "task_follower",
        },
        {
          user_id: "Google_111918078641246610063",
          role: "goal_follower",
        },
      ],
    },
    {
      id: "tuqfR-7bTIsyHXgiq8XSP",
      local_id: "qzUHD8X2uc6Qomg2Oh7iM",
      type: "BellExecutor",
      state: "Created",
      started_at: null,
      ended_at: null,
      parent_id: "0vNN_nHW0jc87jo-s8XPd",
      children: [],
      sibling_order: null,
      task: null,
      bell_executor: {
        context: {},
      },
      users: [],
    },
    {
      id: "f9-D98KF8ZHvNn5GIhBGw",
      local_id: "2tAIiTBtJXmVC2xF_Wcr4",
      type: "APIExecutor",
      state: "Created",
      started_at: null,
      ended_at: null,
      parent_id: "790hOnMXtRMBWhiZetAIK",
      children: [],
      sibling_order: null,
      task: null,
      bell_executor: null,
      users: [],
    },
    {
      id: "w7WjLJgmw-8IcoJPwymUV",
      local_id: "sTOp8e44a9NdJweWr828_",
      type: "APIExecutor",
      state: "Created",
      started_at: null,
      ended_at: null,
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: 1,
      task: null,
      bell_executor: null,
      users: [],
    },
    {
      id: "0vNN_nHW0jc87jo-s8XPd",
      local_id: "7Q1HhUA6rtEsZQVLIsSCk",
      type: "Goal",
      state: "Created",
      started_at: null,
      ended_at: null,
      parent_id: "11OPQ53T10ju7GYERgBOP",
      children: [
        {
          id: "QWhbnWC7Esg2UwIVIbbfG",
        },
        {
          id: "tuqfR-7bTIsyHXgiq8XSP",
        },
      ],
      sibling_order: 1,
      task: null,
      bell_executor: null,
      users: [
        {
          user_id: "Google_111918078641246610063",
          role: "goal_follower",
        },
        {
          user_id: "Google_109551792009621810100",
          role: "task_follower",
        },
      ],
    },
    {
      id: "bVeXuHvMlUVpbM2e4zMy9",
      local_id: "rJnhPkEpzbL_KnF6uBBD1",
      type: "Goal",
      state: "Running",
      started_at: "2020-08-02T18:51:23.776224+00:00",
      ended_at: "2020-08-03T04:23:53.760417+00:00",
      parent_id: "11OPQ53T10ju7GYERgBOP",
      children: [
        {
          id: "w7WjLJgmw-8IcoJPwymUV",
        },
        {
          id: "05rDLPiegRuF7-f72D-PK",
        },
        {
          id: "G-M8ECueR0697Gx8buehJ",
        },
        {
          id: "QwpfcdLPH_iQqzbz7nFg-",
        },
        {
          id: "HttfA2gqDC5Uek_WD-rpn",
        },
        {
          id: "ZmafozjAljqxYe5jn4voG",
        },
        {
          id: "WWazDMHYOxCXCgTyND2js",
        },
      ],
      sibling_order: null,
      task: null,
      bell_executor: null,
      users: [
        {
          user_id: "Google_115419186368884878540",
          role: "goal_assignee",
        },
      ],
    },
    {
      id: "ZmafozjAljqxYe5jn4voG",
      local_id: "OfuLt7QWe8HTV5ArYLjza",
      type: "Notification",
      state: "Success",
      started_at: null,
      ended_at: "2020-08-05T20:20:29.928067+00:00",
      parent_id: "bVeXuHvMlUVpbM2e4zMy9",
      children: [],
      sibling_order: 6,
      task: null,
      bell_executor: null,
      users: [],
    },
    {
      id: "11OPQ53T10ju7GYERgBOP",
      local_id: "H2_a_Rk3ay03OozK5aeyK",
      type: "Goal",
      state: "Created",
      started_at: null,
      ended_at: null,
      parent_id: null,
      children: [
        {
          id: "790hOnMXtRMBWhiZetAIK",
        },
        {
          id: "bVeXuHvMlUVpbM2e4zMy9",
        },
        {
          id: "0vNN_nHW0jc87jo-s8XPd",
        },
      ],
      sibling_order: null,
      task: null,
      bell_executor: null,
      users: [
        {
          user_id: "Google_115419186368884878540",
          role: "goal_assignee",
        },
      ],
    },
  ],
  root_block_id: "11OPQ53T10ju7GYERgBOP",
  context: {
    artifacts: [
      {
        url:
          "https://samantha-assets.s3.amazonaws.com/artifacts/HVAC+Permit.pdf",
        title: "Submission of city for HVAC approval",
        filename: "HVAC Permit.pdf",
      },
      {
        url:
          "https://www.standardheating.com/wp-cms/wp-content/uploads/2015/09/HVACdiagram2-1024x634.png",
        title: "HVAC system",
        filename: "HVAC system diagram.png",
      },
    ],
  },
  started_at: "2020-08-04T05:36:50.33183+00:00",
  ended_at: "2020-08-05T00:08:25.929326+00:00",
  users: [
    {
      user_id: "Google_115419186368884878540",
      role: "bell_follower",
    },
    {
      user_id: "Google_109551792009621810100",
      role: "bell_initiator",
    },
  ],
  bellhops: [
    {
      bellhop_id: "kK70A5g3BM9mjbHQoYnjL",
      role: "bell_owner",
    },
    {
      bellhop_id: "6U0uG2uaSVCOgFW_6RU0G",
      role: "bell_initiator",
    },
  ],
}

export default bell
