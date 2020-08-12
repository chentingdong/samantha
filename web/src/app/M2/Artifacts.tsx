// Artifacts.tsx. appears in single bell view, right side tabs
import React from "react"
import {displayDate} from "utils/common"
import {Artifact, Bell} from "models/interface"
import {useLocation} from "react-router-dom"
import {getRouteParams} from "utils/router"
import {filterGoalArtifacts} from "utils/bell"

interface ArtifactsProps {
  artifacts: Artifact[]
  bell: Bell
  className?: string
}

export const Artifacts: React.FC<ArtifactsProps> = ({
  artifacts,
  bell,
  ...props
}) => {
  const location = useLocation()
  const params = getRouteParams(location)
  let goals = bell?.blocks.filter((block) => block.type === "Goal")
  if (params.goalId !== "all")
    goals = goals.filter(
      (goal) =>
        goal.id === params.goalId ||
        goal.parent?.id === params.goalId ||
        goal?.parent?.parent?.id === params.goalId
    )

  const goalArtifacts = filterGoalArtifacts(params.bellId, goals, artifacts)
  return (
    <div {...props}>
      <h4>Artifacts</h4>
      {goalArtifacts?.map((artifact) => (
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
          <div className="text-sm text-gray-500">
            Created at: {displayDate(artifact.created_at)}
          </div>
        </div>
      ))}
      <h4 className="mt-8">Advanced</h4>
      <a href="#" target="_blank" rel="noopener noreferrer" className="m-4">
        View Context
      </a>
    </div>
  )
}
