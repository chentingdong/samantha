import React, { useState, useEffect } from "react"
import { Icon } from "rsuite"
import { styled } from "@storybook/theming"
import { Grid, Row, Col } from "rsuite"

type DrawerType = {
  className?: string
  show: boolean
  close: () => void
}
const DrawerRaw: React.FC<DrawerType> = ({
  className,
  show,
  children,
  close,
}) => {
  const [offset, setOffset] = useState(24)

  const hide = () => {
    setOffset(24)
    setTimeout(close, 500)
  }

  useEffect(() => {
    if (show) setOffset(4)
  }, [show])

  return (
    show && (
      <div className={className}>
        <div className="backdrop">
          <Grid fluid>
            <Row onClick={hide}>
              <Col xs={20} xsOffset={offset} className="p-4">
                <Icon
                  icon="close"
                  className="float-right cursor-pointer m-4"
                  onClick={hide}
                />
                <div onClick={(e) => e.stopPropagation()}>{children}</div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  )
}

const Drawer: React.FC<DrawerType> = styled(DrawerRaw)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  .rs-col {
    background: var(--color-bg-default);
    transition: margin-left 0.5s ease;
  }
`

export { Drawer }
