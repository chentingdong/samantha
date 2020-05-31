import React from "react"
import { BlockDefList } from "./BlockDefList"
import { Grid, Row, Col } from "rsuite"
import { useQuery } from "@apollo/client"
import { AUTH_USER } from "../../operations/queries/authUser"
import styled from "styled-components"
import tw from "tailwind.macro"

function DemoRaw({ className }) {
  const { data } = useQuery(AUTH_USER)
  return (
    <div className={`${className} theme-dark`}>
      {data?.authUser?.isAuthenticated && (
        <Grid fluid>
          <Row>
            <BlockDefList />
          </Row>
        </Grid>
      )}
    </div>
  )
}
const Demo2 = styled(DemoRaw)`
  ${tw`p-4`}
  color: var(--color-text-primary);
  color: var(--color-text-default);
  background-color: var(--color-bg-default);
  overflow: auto;
  height: 100vh;
  border-radius: 0;
  .logo {
    ${tw`my-0 mx-4`}
    height: 2em;
    display: inline-block;
  }
`

export { Demo2 }
