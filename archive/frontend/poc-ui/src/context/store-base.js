import { createStore } from "react-context-global-store";

const store = createStore({
  user: {
    currentUser: {},
    users: [],
  },
  case: {
    currentCase: {},
    cases: [],
  },
  caseDefinitions: {
    currentCaseDef: {},
    caseDefinitions: [],
  },
  task: {
    currentTask: {},
    tasks: [],
  },
  message: {
    currentMessage: {},
    messages: [],
  },
});

export default store;
