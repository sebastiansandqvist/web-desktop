import m from 'mithril'
import { shuffle } from './util'
import { redraw } from '../../index'

const initialBoard = [
  'a', 'A', 'b', 'B',
  'c', 'C', 'd', 'D',
  'e', 'E', 'f', 'F',
  'g', 'G', 'h', 'H',
  'i', 'I', 'j', 'J',
  'k', 'K', 'l', 'L',
  'm', 'M', 'n', 'N',
  'o', 'O', 'p', 'P',
  'q', 'Q', 'r', 'R',
  's', 'S', 't', 'T',
  'u', 'U', 'v', 'V',
  'w', 'W', 'x', 'X',
  'y', 'Y', 'z', 'Z'
]

function modelFactory (rows) {
  return {
    board: shuffle(initialBoard.slice(0, rows * 4)),
    solved: [],
    revealed: [] // tuple
  }
}

function pieceStyle (isSolved) {
  const style = {
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline-block',
    margin: '2px',
    padding: '20px 10px',
    textAlign: 'center',
    width: 'calc(25% - 4px)'
  }
  if (isSolved) style.visibility = 'hidden'
  return style
}

const match = (a, b) => a.toLowerCase() === b.toLowerCase()

function Memory () {
  let round = 1
  let model = modelFactory(round)
  let won = false
  const boardStyle = () => won ? { background: '#6f8' } : { background: '#eee' }

  const makeMove = function (piece) {
    const { solved, revealed, board } = model
    if (solved.includes(piece)) return
    if (revealed.length === 0) revealed.push(piece)
    else if (revealed.length === 1 && match(piece, revealed[0])) {
      if (piece !== revealed[0]) solved.push(piece, revealed[0]) // only push if match, not identical piece twice
      revealed.length = 0
    } else if (revealed.length === 1) {
      revealed.push(piece)
      setTimeout(() => {
        revealed.length = 0
        redraw()
      }, 500)
    }

    // user wins when board length is solved length
    if (board.length === solved.length) {
      round++
      model = modelFactory(round)
      won = true
      redraw()
      setTimeout(() => {
        won = false
        redraw()
      }, 200)
    }

    redraw()
  }

  return {
    view () {
      const { board, solved, revealed } = model
      return (
        m('div', { style: boardStyle() },
          board.map((piece) => {
            const symbol = (solved.includes(piece) || revealed.includes(piece)) ? piece.toLowerCase() : '*'
            return m('button', { onclick () { makeMove(piece) }, style: pieceStyle(solved.includes(piece)) }, symbol)
          })
        )
      )
    }
  }
}

export default Memory
