import { BlockOrDef, UiState, User } from "./models/interface"
import { EditMode, Typename } from "./models/enum"
import { InMemoryCache, ReactiveVar } from "@apollo/client"

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        authUser: {
          read(user) {
            return user || authUserVar()
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

export const authUserVar: ReactiveVar<User> = cache.makeVar<User>({
  id: '',
  name: '',
  email: ''
})

export const uiStateVar: ReactiveVar<UiState> = cache.makeVar<UiState>({
  showEditor: false,
  showBellEditor: false,
  editorMode: EditMode.Create,
  editingTypename: Typename.blocks,
  currentBellhopId: null,
  currentBellDefId: null,
  currentBlockId: null,
  runningBellId: null,
  showNotification: false,
  mainMenuActiveItem: "lobby",
})
