import { BlockOrDef, UiState, User } from "./models/interface"
import { EditMode, Typename } from "./models/enum"
import { InMemoryCache, ReactiveVar } from "@apollo/client"

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
        m2_user_block_participations: {
          merge(existing, incoming) {
            return incoming
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
  currentBellDefId: null,
  currentBlockId: null,
  runningBellId: null,
  showNotification: false,
  mainMenuActiveItem: "lobby",
})
