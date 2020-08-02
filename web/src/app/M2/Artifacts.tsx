// Artifacts.tsx. appears in single bell view, right side tabs

import React from "react"

interface ArtifactsProps {
  artifacts: any
  className?: string
}

export const Artifacts: React.FC<ArtifactsProps> = ({
  artifacts,
  ...props
}) => {
  console.log(artifacts)
  return (
    <div {...props}>
      <h4>Artifacts</h4>
      {artifacts?.map((artifact) => (
        <div className="m-4" key={artifact.url}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="block text-lg"
            href={artifact.url}
          >
            {artifact.filename}
          </a>
          <div className="italic text-gray-500">{artifact.title}</div>
        </div>
      ))}
      <h4 className="mt-8">Advanced</h4>
      <a href="#" target="_blank" rel="noopener noreferrer" className="m-4">
        View Context
      </a>
    </div>
  )
}
