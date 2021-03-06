import React from "react"
import { Dropdown, IconButton, Icon } from "rsuite"
import { useQuery } from "@apollo/client"
import { BLOCK_CATALOG } from "../../operations/queries/blockCatalog"
import { BlockDef } from "../../models/interface"
import { setUiState } from "../../operations/mutations/setUiState"
import { EditMode } from "../../models/enum"
import { AUTH_USER } from "../../operations/queries/authUser"
import { getIconByType } from "../../utils/styles"
import { createBlock } from "../../operations/blockOperations"
import cloneDeep from "lodash/cloneDeep"

const CatalogDropdown = ({ editingTypename, ...rest }) => {
  const { data: authUserResult } = useQuery(AUTH_USER)
  const { data } = useQuery(BLOCK_CATALOG)

  if (!authUserResult || !data) return <></>

  const { authUser } = authUserResult

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
      {data.blockDefs.map((blockDef: BlockDef) => (
        <Dropdown.Item
          icon={<Icon icon={getIconByType(blockDef.type)} />}
          key={blockDef.id}
          onSelect={() => {
            setUiState(
              {
                showEditor: true,
                editingTypename,
                editorMode: EditMode.Create,
                draftBlock: createBlock(
                  blockDef.id,
                  cloneDeep(blockDef),
                  editingTypename,
                  authUser
                ),
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
