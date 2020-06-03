import React from "react"
import { Dropdown, IconButton, Icon, Button } from "rsuite"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../operations/queries/blockCatalog"
import { BlockDef } from "../models/interface"
import { setUiState } from "../operations/mutations/setUiState"
import { Typename } from "../models/enum"
import { AUTH_USER } from "../operations/queries/authUser"
import { getIconByType } from "../utils/Styles"
import uuid from "uuid"

const CatalogDropdown = ({ editingTypename, editorMode, ...rest }) => {
  const { data: authUser } = useQuery(AUTH_USER)
  const { data } = useQuery(BLOCK_CATALOG)

  return (
    <Dropdown
      {...rest}
      renderTitle={(children) => {
        return (
          <IconButton appearance="default" icon={<Icon icon="bell-o" />}>
            {children}
          </IconButton>
        )
      }}
    >
      {data?.blockDefs?.map((blockDef: BlockDef) => (
        <Dropdown.Item
          icon={<Icon icon={getIconByType(blockDef.type)} />}
          key={blockDef.id}
          onSelect={(eventKey, event) => {
            setUiState(
              {
                showEditor: true,
                editingTypename,
                editorMode,
                draftBlock: {
                  // TODO: deep clone
                  ...blockDef,
                  id: uuid.v4(),
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
