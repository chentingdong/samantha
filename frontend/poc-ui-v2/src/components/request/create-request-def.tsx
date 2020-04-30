import React, { FC } from 'react'
import PropTypes from 'prop-types'
import blockDefs from '../../../data/blockDefs.json'

interface Props {}

/**
 * @author
 * @function CreateRequestDef
 **/

const CreateRequestDef: FC<Props> = (props) => {
  return (
    <div className="row">
      <main className="col-10">
        <h2>CreateRequestDef</h2>
        <p>Request description</p>
        <p>Request Owner</p>
      </main>
      <aside className="col-2">
        <h2>Block Palette</h2>
        {blockDefs.array.forEach(element => {

        });}
      </aside>
    </div>
  )
}

CreateRequestDef.propTypes = {
  // your expected props
}

CreateRequestDef.defaultProps = {
  // your default props
}
export default CreateRequestDef
