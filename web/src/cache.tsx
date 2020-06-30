import { InMemoryCache, ReactiveVar } from "@apollo/client"
import { User, UiState, BlockOrDef } from "./models/interface"
import { EditMode, Typename } from "./models/enum"
import { initialBlock } from "../data/initialBlock"
import { initialUser } from "../data/initialUser"

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
  currentBlockId: "",
})
