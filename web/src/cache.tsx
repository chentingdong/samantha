import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User, UiState, BlockOrDef } from "./models/interface"
import { EditMode, Typename } from "./models/enum"
import { initialBlock } from "../data/block"
import { initialUser } from "../data/user"

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

export const authUserVar: ReactiveVar<User> = cache.makeVar<User>(initialUser)

export const uiStateVar: ReactiveVar<UiState> = cache.makeVar<UiState>({
  showEditor: false,
  showBellEditor: false,
  editorMode: EditMode.Create,
  editingTypename: Typename.blocks,
  draftBlock: initialBlock,
  currentBellhopId: null,
  currentBellId: null,
  currentBlockId: null,
  showNotification: false,
})
