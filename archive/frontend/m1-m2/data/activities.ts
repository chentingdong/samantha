// activities is union of tasks and goals
export const activities = [
  {
    id: 1,
    name: "Facilities Purchase Request Started",
    source: "bell",
    state: "Started",
    ended_at: new Date(2020, 1, 1, 1, 11),
    requestor: { id: "Google_111918078641246610063", name: "Baiji He" },
  },
  {
    id: 2,
    name: "Get Purchase Information",
    source: "goal",
    state: "Completed",
    ended_at: new Date(2020, 2, 1, 2, 32),
    requestor: {
      id: "Google_115419186368884878540",
      name: "Tingdong Chen",
    },
  },
  {
    id: 3,
    name: "What Categories describe this purchase?",
    source: "task",
    state: "Completed",
    ended_at: new Date(2020, 3, 1, 3, 10),
    requestor: {
      id: "Google_115419186368884878540",
      name: "Tingdong Chen",
    },
  },
  {
    id: 4,
    name: "What is your employment status?",
    source: "task",
    state: "Running",
    ended_at: null,
    requestor: {
      id: "Google_115419186368884878540",
      name: "Tingdong Chen",
    },
  },
  {
    id: 5,
    name: "How much do you need to budget in dollars?",
    source: "task",
    state: "Running",
    requestor: {
      id: "Google_115419186368884878540",
      name: "Tingdong Chen",
    },
  },
  {
    id: 6,
    name: "Goal name here...",
    source: "goal",
    state: "Created",
    updated_at: new Date(2020, 7, 31),
    requestor: {
      id: "Google_115419186368884878540",
      name: "Tingdong Chen",
    },
  },
]
