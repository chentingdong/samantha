import React from "react"
import styled from "styled-components"
import tw from "tailwind.macro"
import { DraftControlledInput } from "../app/DraftControlledInput"

const SpendRequestFormRaw: React.FC<{ className: string }> = ({
  className,
}) => {
  return (
    <div className={className}>
      <form>
        <div>
          <label className="block">Form name</label>
          <DraftControlledInput fieldName="name" type="text" />
        </div>
        <div>
          <label className="block">Description</label>
          <DraftControlledInput fieldName="discription" type="text" />
        </div>
        <div>
          <label className="block">Spend</label>
          <DraftControlledInput fieldName="spend" type="number" />
        </div>
        <div>
          <label className="block">Revenue</label>
          <DraftControlledInput fieldName="revenue" type="number" />
        </div>
      </form>
    </div>
  )
}

const SpendRequestForm = styled(SpendRequestFormRaw)`
  & {
    div {
      ${tw`my-4`}
    }
  }
`
export default SpendRequestForm
