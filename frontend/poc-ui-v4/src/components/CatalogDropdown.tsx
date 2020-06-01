import React from "react"
import { Dropdown } from "rsuite"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { BlockDef } from "../models/interface"
import { setUiState } from "../operations/mutations/setUiState"
import { Typename } from "../models/enum"
import { AUTH_USER } from "../operations/queries/authUser"

const CatalogDropdown = ({ editingTypename, editorMode, ...rest }) => {
  const { data: authUser } = useQuery(AUTH_USER)
  const { data } = useQuery(BLOCK_CATALOG)

  return (
    <Dropdown {...rest}>
      {data?.blockDefs?.map((blockDef: BlockDef) => (
        <Dropdown.Item
          key={blockDef.id}
          onSelect={(eventKey, event) => {
            setUiState(
              {
                showEditor: true,
                editingTypename,
                editorMode,
                draftBlock: {
                  ...blockDef,
                  requestors:
                    editingTypename === Typename.Block
                      ? [authUser?.authUser]
                      : [],
                  __typename: editingTypename,
                },
              },
              true
            )
          }}
        >
          {blockDef.name}
        </Dropdown.Item>
      ))}
    </Dropdown>
  )
}

export { CatalogDropdown }
