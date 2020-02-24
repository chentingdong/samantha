import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faBomb } from '@fortawesome/free-solid-svg-icons'

function MineSwipper () {
  const board = {
    width: 30,
    height: 16,
    mines: 99
  }

  return (
    <div className="mine-sweeper">
      <Board height={board.height} width={board.width} mines={board.mines} />
    </div>
  )
}

const style = {
  cell: {
    width: '20px',
    height: '20px'
  }
}

function Board (props) {
  let [ gameStatus, setGameStatus ] = useState("New game...")
  let [ mineCount, setMineCount ] = useState(props.mines)
  let [ boardData, setBoardData ] = useState(createEmptyData())
  const cellWidth = parseInt(style.cell.width)
  const boardWidth = cellWidth * props.width

  useEffect(() => {
    initBoardData();
  }, [])

  async function initBoardData () {
    console.log("init board...")
    let data = await createEmptyData()
    data = plantMines(data)
    data = getNeighbours(data)
    setBoardData(data)

    setGameStatus('New game')
  }

  function createEmptyData () {
    let data = [];
    for (let i = 0; i < props.height; i++) {
      data.push([])
      for (let j = 0; j < props.width; j++) {
        data[ i ][ j ] = {
          x: i,
          y: j,
          neighbour: 0,
          className: '',
          isMine: false,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false
        }
      }
    }

    return data
  }

  function plantMines (data) {
    let randomx, randomy, minesPlanted = 0;

    while (minesPlanted < props.mines) {
      randomx = getRandomNumber(props.width);
      randomy = getRandomNumber(props.height);
      if (!(data[ randomy ][ randomx ].isMine)) {
        data[ randomy ][ randomx ].isMine = true;
        minesPlanted++;
      }
    }
    return data
  }

  function getNeighbours (data) {
    for (let i = 0; i < props.height; i++) {
      for (let j = 0; j < props.width; j++) {
        if (data[ i ][ j ].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(data[ i ][ j ].x, data[ i ][ j ].y, data);
          area.forEach(value => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            data[ i ][ j ].isEmpty = true;
          }
          data[ i ][ j ].neighbour = mine;
        }
      }
    }
    return data
  }

  function getRandomNumber (range) {
    return Math.floor(Math.random() * range)
  }

  function traverseBoard (x, y, data) {
    const el = [];
    if (x > 0) el.push(data[ x - 1 ][ y ]);
    if (x < props.height - 1) el.push(data[ x + 1 ][ y ]);
    if (y > 0) el.push(data[ x ][ y - 1 ]);
    if (y < props.width - 1) el.push(data[ x ][ y + 1 ]);
    if (x > 0 && y > 0) el.push(data[ x - 1 ][ y - 1 ]);
    if (x > 0 && y < props.width - 1) el.push(data[ x - 1 ][ y + 1 ]);
    if (x < props.height - 1 && y < props.width - 1) el.push(data[ x + 1 ][ y + 1 ]);
    if (x < props.height - 1 && y > 0) el.push(data[ x + 1 ][ y - 1 ]);
    return el;
  }

  function digCell (event, x, y) {
    event.preventDefault();
    if (gameStatus === 'New game')
      setGameStatus('Playing...');

    console.log(`digging at (${x}, ${y})`)

    if (boardData[ x ][ y ].isRevealed || boardData[ x ][ y ].isFlagged) {
      return null;
    }

    if (boardData[ x ][ y ].isMine) {
      setGameStatus("Game over.");
      revealBoard();
      return;
    }

    let updatedData = boardData.slice();
    updatedData[ x ][ y ].isRevealed = true;

    if (updatedData[ x ][ y ].isEmpty) {
      updatedData = revealEmpty(x, y, updatedData);
    }

    if (getHidden(updatedData) === 0) {
      setGameStatus("You Win.");
    }

    setBoardData(updatedData);
  }

  function flagCell (event, x, y) {
    event.preventDefault();
    console.log(`flagging at (${x}, ${y})`);

    let updatedData = boardData.slice();
    let mines = mineCount;

    if (updatedData[ x ][ y ].isRevealed)
      return;

    if (updatedData[ x ][ y ].isFlagged) {
      updatedData[ x ][ y ].isFlagged = false
      mines++;
    } else {
      updatedData[ x ][ y ].isFlagged = true
      mines--;
    }


    if (mines === 0) {
      revealBoard();
      setGameStatus("You Win.");
    }

    setBoardData(updatedData)
    setMineCount(mines)
  }

  function getHidden (data) {
    let hiddenMines = 0
    data.forEach(row => {
      row.forEach(cell => {
        if (!cell.isRevealed && !cell.isFlagged && cell.isMine)
          hiddenMines++
      })
    })
    return hiddenMines
  }

  function revealEmpty (x, y, data) {
    let area = traverseBoard(x, y, data);

    area.forEach(value => {
      if (!value.isFlagged && !value.isRevealed && (value.isEmpty || !value.isMine)) {
        data[ value.x ][ value.y ].isRevealed = true;
        if (value.isEmpty) {
          revealEmpty(value.x, value.y, data);
        }
      }
    });
    return data;
  }

  function revealBoard () {
    let updatedData = boardData.slice();
    updatedData.forEach((row) => {
      row.forEach((cell) => {
        cell.isRevealed = true;
      })
    })
    setBoardData(updatedData)
  }

  function RenderInfo () {
    return (
      <div className="board text-center">
        <div>mines left: {mineCount}. &nbsp; game status: {gameStatus}.</div>
        <div className="btn btn-small btn-primary" onClick={initBoardData}>Restart</div>
      </div>
    )
  }

  function RenderBoard () {
    return boardData.map((row) => {
      return row.map((cell, index) => {
        let key = cell.x * row.length + cell.y
        return (
          <Cell
            key={key}
            onClick={(e) => digCell(e, cell.x, cell.y)}
            cMenu={(e) => flagCell(e, cell.x, cell.y)}
            cell={cell}
          />
        )
      })
    })
  }

  return (
    <Card>
      <Card.Header>
        {RenderInfo()}
      </Card.Header>
      <Card.Body>
        <div className="board" style={{width: boardWidth}}> {RenderBoard()} </div>
      </Card.Body>
    </Card>
  )
}


function Cell (props) {
  let { cell, onClick, cMenu } = props;

  function getCell () {
    if (!cell.isRevealed)
      return (cell.isFlagged) ? <FontAwesomeIcon icon={faFlag} /> : null

    if(cell.isMine)
      return <FontAwesomeIcon icon={faBomb} />

    return (cell.neighbour !== 0) ? cell.neighbour : null
  }

  cell.className = 'cell';
  if (cell.isRevealed) {
    cell.className += ' revealed'
    if (cell.isMine)
      cell.className += ' mine'
  }

  return (
    <div className={cell.className} style={style.cell} onClick={onClick} onContextMenu={cMenu}>
      <div className="inner"> {getCell()}</div>
    </div>
  )
}

export default MineSwipper;