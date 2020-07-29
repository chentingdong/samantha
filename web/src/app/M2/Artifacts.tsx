// Artifacts.tsx. appears in single bell view, right side tabs

import React from "react"
import { artifacts } from "../../../data/artifacts"

interface ArtifactsProps {
  className?: string
}

export const Artifacts: React.FC<ArtifactsProps> = (props) => {
  return (
    <div {...props}>
      <h4>Artifacts</h4>
      {artifacts?.map((artifact) => (
        <div className="m-4" key={artifact.url}>
          <a target="blank" className="block text-lg" href={artifact.url}>
            {artifact.filename}
          </a>
          <div className="italic text-gray-500">{artifact.title}</div>
        </div>
      ))}
      <h4 className="mt-8">Advanced</h4>
      <a href="#" target="blank" className="m-4">
        View Context
      </a>
    </div>
  )
}
