import React, { useReducer, setState, createContext } from "react";
import apiWrapper from "../libs/api-wrapper";

export const CaseDefContext = createContext();
/************************************ */
// not in use, leave it here for later reference.
/************************************ */

const initialState = {
  caseDefinitions: [],
  loading: false,
  error: null,
};

async function listCaseDefinitions(state) {
  let path = "/case-definitions";
  try {
    let resp = await apiWrapper.get(path);
    state.caseDefinitions = resp.data;
  } catch (err) {
    console.error(err);
  }
  return true;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CASEDEFINITION":
      return {
        loading: listCaseDefinitions(state),
      };
    // api call to reload caseDefinitions
    case "DEL_CASEDEFINITION":
      return {
        loading: listCaseDefinitions(state),
        // api call to reload caseDefinitions
      };
    case "UPDATE_CASEDEFINITION":
      return {
        loading: listCaseDefinitions(state),
        // api call to reload caseDefinitions
      };
    default:
      throw new Error();
  }
};

export const CaseDefContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  listCaseDefinitions(state);

  return (
    <CaseDefContext.Provider value={[state, dispatch]}>
      {props.children}
    </CaseDefContext.Provider>
  );
};
