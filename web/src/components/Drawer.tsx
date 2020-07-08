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
    setOffset(6)
  }, [show])

  return (
    <>
      {show && (
        <div className={className}>
          <Grid fluid>
            <Row onClick={hide} className="backdrop">
              <Col xs={18} xsOffset={offset} className="content p-4">
                <Icon
                  icon="close"
                  className="float-right cursor-pointer m-4"
                  onClick={hide}
                />
                <div className="children" onClick={(e) => e.stopPropagation()}>
                  {children}
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      )}
    </>
  )
}

const Drawer: React.FC<DrawerType> = styled(DrawerRaw)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  height: 100vh;
  overflow: auto;
  width: 100%;
  .backdrop {
    background: var(--color-bg-dark);
    .content {
      min-height: 100vh;
      background: var(--color-bg-default);
      transition: margin-left 0.5s ease;
    }
  }
`

export { Drawer }
