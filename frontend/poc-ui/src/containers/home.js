import React from "react";
import CasesCards from "../case/cases-cards";

function Home({ user }) {
  return (
    <div className="container">
      <CasesCards className="row" user={user} />
    </div>
  );
}

export default Home;
