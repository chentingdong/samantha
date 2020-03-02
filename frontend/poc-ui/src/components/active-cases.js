import React, {useState, useEffect} from 'react';

function ActiveCases (props) {
  const [activeCases, setActiveCases] = useState([])

  const style = {
    caseList: {
      listStyleType: 'none'
    },
    case: {
      height: '100px'
    }
  }


  function updateCaseList () {
    // TODO: ws case list endpoint
    let cases = [
      {'name': 'case 1', 'id': 'case_1'},
      {'name': 'case 2', 'id': 'case_2'}
    ]

    setActiveCases(cases)
  }

  useEffect(updateCaseList, [])
  return (
    <div className='row' style={style.caesList}>
      {activeCases.map((activeCase, index) => {
        return <button className="col-2 m-2 p-2" key={index} style={style.cell}>{activeCase.name}</button>
      })}
    </div>
  );
};

export default ActiveCases;