// map route to uiState.
import { setUiState, resetUiState } from "operations/mutations/setUiState"
import { matchPath } from "react-router"

const mainMenuMapping = (pathname: string): void => {
  console.log(pathname)
  setUiState({ mainMenuActiveItem: pathname })
}
const bellMenuMapping = (pathname: string, type: string): void => {
  console.log(pathname)
  const match = matchPath(pathname, {
    path: "/bells/:runningBellId",
    exact: true,
    strict: false,
  })
  if (match && type === "Ins")
    setUiState({ runningBellId: match.params["runningBellId"] })
  else if (match && type === "Def")
    setUiState({ currentBellDefId: match.params["currentBellDefId"] })
}

const route2ui = (pathname: string): void => {
  if (matchPath(pathname, {path: "/bells/:runningBellId"})) {
    if (type === "Ins")

  }

}
export { route2ui }
