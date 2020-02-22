import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Stringify from 'react-stringify'

function MineSwipper () {
  const board = {
    width: 5,
    height: 5,
    mines: 5
  }

  return (
    <div className="mine-sweeper">
      <Board height={board.height} width={board.width} mines={board.mines} />
    </div>
  )
}

function Cell (props) {
  const { value, onClick, cMenu } = props;

  function getValue () {
    if (!value.isRevealed) return value.isFlagged ? "o" : null;
    if (value.isMine) return "x";
    if (value.neighbour === 0) return null
    return value.neighbour;
  }

  let cn = value.isRevealed ? 'revealed cell' : 'cell'
  return (
    <div className={cn} onClick={onClick} onContextMenu={cMenu}>
      <div className="inner"> {getValue()}</div>
    </div>
  )
}

function Board (props) {
  let [ gameStatus, setGameStatus ] = useState("Playing")
  let [ mineCount, setMineCount ] = useState(props.mines)
  let [ boardData, setBoardData ] = useState(createEmptyData())

  useEffect(() => {
    initBoardData();
  }, [])

  function initBoardData () {
    console.log("init board...")
    let data = createEmptyData()
    data = plantMines(data)
    data = getNeighbours(data)
    setBoardData(data)
  }

  function createEmptyData () {
    let data = [];
    for (let i = 0; i < props.height; i++) {
      data.push([])
      for (let j = 0; j < props.width; j++) {
        data[ i ][ j ] = {
          x: i,
          y: j,
          cellWidth: 10,
          cellHeight: 10,
          isMine: false,
          neighbour: 0,
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
      randomx = getRandomNumber(props.width - 1);
      randomy = getRandomNumber(props.height - 1);
      if (!(data[ randomx ][ randomy ].isMine)) {
        data[ randomx ][ randomy ].isMine = true;
        minesPlanted++;
      }
    }
    // data[0][0].isMine = true;
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
    return Math.floor(Math.random() * (range - 1))
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

  function RenderInfo () {
    return (
      <div className="board text-center">
        <div>
          <span className="info">
            mines left: {props.mines}
          </span>
          <br />
          <span className="info">
            game status: {gameStatus}
          </span>
          {gameStatus==="Game over." && <div className="btn btn-default" onClick={initBoardData}>Restart</div>}
        </div>
      </div>
    )
  }

  function digMine (event, x, y) {
    event.preventDefault();

    console.log(`digging at (${x}, ${y})`)

    if (boardData[ x ][ y ].isRevealed || boardData[ x ][ y ].isFlagged) {
      return null;
    }

    if (boardData[ x ][ y ].isMine) {
      setGameStatus("You Lost.");
      revealBoard();
      setGameStatus("Game over.")
    }

    setBoardData((boardData) => {
      let updatedData = boardData.slice();

      if (updatedData[ x ][ y ].isEmpty) {
        updatedData = revealEmpty(x, y, updatedData);
      }
      return updatedData;
    })
  }

  function flagMine (event, x, y) {
    console.log(`flagging at (${x}, ${y})`);
    event.preventDefault();
    let updatedData = boardData;
    let mines = mineCount;

    // check if already revealed
    if (updatedData[ x ][ y ].isRevealed) return;
    if (updatedData[ x ][ y ].isFlagged) {
      updatedData[ x ][ y ].isFlagged = false;
      mines++;
    } else {
      updatedData[ x ][ y ].isFlagged = true;
      mines--;
    }
    if (mines === 0) {
      alert("You Win");
    }
    setBoardData(updatedData)
    setMineCount(mines)
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
    let updatedData = boardData;
    updatedData.map((row) => {
      row.map((cell) => {
        cell.isRevealed = true;
      })
    })
    setBoardData(updatedData)
  }

  function RenderBoard () {
    return boardData.map((row) => {
      return row.map((cell) => {
        let key = cell.x * row.length + cell.y

        return (
          <div key={key}>
            <Cell
              onClick={(e) => digMine(e, cell.x, cell.y)}
              cMenu={(e) => flagMine(e, cell.x, cell.y)}
              value={cell}
            />
            {(row[ row.length - 1 ] === cell) ? <div className="clear" /> : ""}
          </div>
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
        {RenderBoard()}
      </Card.Body>
    </Card>
  )
}

export default MineSwipper;