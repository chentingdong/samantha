/**
 * customized 404 not found page.
 */
import * as React from "react"
import { injectRsuiteStyle, getLogoByTheme } from "../utils/styles"

const NotFound = () => {
  injectRsuiteStyle("bell")

  return (
    <div className="h-screen">
      <a href="/lobby">
        <img
          className={"logo bell m-3 h-8"}
          src={getLogoByTheme("bell")}
          alt="Bellhop"
        />
      </a>
      <h3 className="mt-64 text-center">Sorry, page not found!</h3>
    </div>
  )
}

export default NotFound
