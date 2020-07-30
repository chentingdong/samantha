// To simulate the tasks in a bell
export const tasks = [
  {
    id: "1",
    type: "Task",
    task: {
      title: "What are you purchasing?",
      fields: [
        {
          response: "A new HVAC machine",
          response_type: "Text",
          max_field_size: 128,
          min_field_size: 4,
          optional: false,
        },
      ],
    },
    user_participations: [
      {
        user: {
          name: "Tingdong Chen",
        },
        role: "task_assignee",
      },
    ],
    state: "Completed",
  },
  {
    id: "2",
    type: "Task",
    task: {
      title: "What categories describe this purchase?",
      fields: [
        {
          response: "Heating/Cooling",
          response_type: "MultiSelect",
          select_options: ["Heating/Cooling", "services", "other"],
          optional: false,
        },
      ],
    },
    user_participations: [
      {
        user: {
          name: "Tingdong Chen",
        },
        role: "task_assignee",
      },
    ],
    state: "Completed",
  },
  {
    id: "3",
    type: "Task",
    task: {
      title: "How much do you need to budget in dollars?",
      fields: [
        {
          response: "1234",
          response_type: "Text",
          optional: false,
        },
      ],
    },
    user_participations: [
      {
        user: {
          name: "Tingdong Chen",
        },
        role: "task_assignee",
      },
    ],
    state: "Running",
  },
  {
    id: "4",
    type: "Task",
    task: {
      title: "Capture legal requirements",
      fields: [
        {
          response: {
            title: "Fill in form",
            url: "http://example.com",
          },
          response_type: "ExternalLink",
          optional: false,
        },
      ],
    },
    user_participations: [
      {
        user: {
          name: "Tingdong Chen",
        },
        role: "task_assignee",
      },
    ],
    state: "Running",
  },
  {
    id: "5",
    type: "Task",
    task: {
      title: "Do you approve this spend?",
      fields: [
        {
          response: null,
          response_type: "AskForApproval",
          optional: false,
        },
      ],
    },
    user_participations: [
      {
        user: {
          name: "Tingdong Chen",
        },
        role: "task_assignee",
      },
    ],
    state: "Created",
  },
]
