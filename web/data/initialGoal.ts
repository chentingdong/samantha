export const goalData = {
  name: "Gather facilities purchase request details",
  owner: {
    id: "Google_115419186368884878540",
    name: "Tingdong",
    email: "tchen@bellhop.io",
    bellhops: ["Facilities"],
  },
  participants: [
    {
      id: "Google_115419186368884878540",
      name: "Tingdong",
      email: "tchen@bellhop.io",
      bellhops: ["Facilities"],
    },
  ],
  notifications: ["notification 1", "notification 2", "notification 3"],
  chatMessages: [
    { from: "user 1", to: "user 2", timestamp: new Date() },
    { from: "user 2", to: "user 1", timestamp: new Date() },
  ],
  documents: [
    { name: "doc 1", url: "http://example.com" },
    { name: "doc 1", url: "http://example.com" },
  ],
  tasks: [
    {
      id: "task1",
      name: "task 1 that's completed",
      owner: "Sue Brown",
      bellhops: ["Facilities"],
      state: "Success",
    },
    {
      id: "task2",
      name: "task 2 that is completed",
      owner: "Ameet Singh",
      bellhops: ["Facilities", "Engineering"],
      state: "Failure",
    },
    {
      id: "task3",
      name: "Internal executive review",
      owner: "Sue Brown",
      bellhops: ["Facilities"],
      state: "Running",
    },
    {
      id: "task4",
      name: "Engineering viability review",
      owner: "Ameet Singh",
      bellhops: ["Facilities", "Engineering"],
      state: "Running",
    },
    {
      id: "task5",
      name: "Review vendor quotes executive",
      owner: "Sue Brown",
      bellhops: ["Facilities"],
      state: "Created",
    },
    {
      id: "task6",
      name: "Review vendor quotes",
      owner: null,
      bellhops: [],
      state: "Ready",
    },
  ],
}
