import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User, UiState } from "./models/interface"
import { EditMode, ItemType } from "./models/enum"

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
  editingItemType: ItemType.Block,
})
