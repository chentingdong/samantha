import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User, UiState, BlockOrDef } from "./models/interface"
import { EditMode, Typename } from "./models/enum"
import uuid from "uuid"

const initBlock = {
  id: uuid.v4(),
  name: "",
  description: "",
  type: "COMPOSITE_PARALLEL",
  requestors: [],
  responders: [],
  parent: null,
  children: [],
  created_at: new Date(),
  last_updated: new Date(),
}

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authUser: {
          read() {
            return authUserVar()
          },
        },
        uiState: {
          read() {
            console.log(
              `cache uiState: ${JSON.stringify(uiStateVar(), null, 2)}`
            )

            return uiStateVar()
          },
        },
      },
    },
  },
})

export const authUserVar: ReactiveVar<User> = cache.makeVar<User>({
  isAuthenticated: false,
})

export const uiStateVar: ReactiveVar<UiState> = cache.makeVar<UiState>({
  showEditor: false,
  editorMode: EditMode.Create,
  editingTypename: Typename.Block,
  draftBlock: initBlock,
})
