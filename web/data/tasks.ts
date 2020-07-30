// To simulate the tasks in a bell
export const tasksDev = [
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
      title: "What categories describe this purchase? (completed view)",
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
    id: "2.1",
    type: "Task",
    task: {
      title: "What categories describe this purchase? (running view)",
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
    state: "Running",
  },
  {
    id: "3.1",
    type: "Task",
    task: {
      title: "How much do you need to budget in dollars? (completed view)",
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
    state: "Completed",
  },
  {
    id: "3",
    type: "Task",
    task: {
      title: "How much do you need to budget in dollars? (running view)",
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
    id: "4.1",
    type: "Task",
    task: {
      title: "Capture legal requirements (completed view)",
      fields: [
        {
          response: {
            title: "Fill in this legal form",
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
    state: "Completed",
  },
  {
    id: "4",
    type: "Task",
    task: {
      title: "Capture legal requirements (running view)",
      fields: [
        {
          response: {
            title: "Fill in this legal form",
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
    id: "5.1",
    type: "Task",
    task: {
      title: "Do you approve this spend? (completed view)",
      fields: [
        {
          response: true,
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
    state: "Completed",
  },
  {
    id: "5",
    type: "Task",
    task: {
      title: "Do you approve this spend? (running view)",
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
    state: "Running",
  },
]

// const tasks = tasksDev.filter((task) => {
//   return ["1", "2", "3", "4", "5"].includes(task.id)
// })
const tasks = tasksDev

export { tasks }
