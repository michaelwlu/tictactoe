let board = createBoard()
let playerTurn = 0
let turn = 0
let gameOver = false
let remainingSpaces = '123456789'

const playerMarkers = ['X', 'O']

// Tracks spaces for each player
const playerSpaces = {
  'X': '',
  'O': ''
}

// Tracks win status for each player
const playerWin = {
  'X': false,
  'O': false
}

// All possible combinations required to win
let winningCombos = ['123', '456', '789', '147', '258', '369', '159', '357']


// Create board
function createBoard() {
  const board = []
  let spaceLabel = 1

    for (let i = 0; i < 3; ++i) {
      const row = []

      for (let j = 0; j < 3; ++j) {
        row.push(spaceLabel + '|  -  |')
        spaceLabel++
      }

      board.push(row)
    }

  return board
}

// Make a move
function move(playerSide, space) {
  
  remainingSpaces = remainingSpaces.replace(String(space), '')
  // console.log(remainingSpaces)

  // Provides 'X' or 'O' based on playerSide (0 or 1)
  const selectedPlayerMarker = playerMarkers[playerSide]

  // Adds space to playerSpaces
  playerSpaces[selectedPlayerMarker] = playerSpaces[selectedPlayerMarker].concat(space)

  // Updates display board
  for (let i = 0; i < board.length; ++i) {
    const selectedRow = board[i]

    for (let j = 0; j < selectedRow.length; ++j) {
      let selectedSpace = selectedRow[j]

      if (selectedSpace[0] === String(space)) {
        
        board[i][j] = selectedSpace.replace('-', selectedPlayerMarker)
      }
    }
  }
}

// Prompt player for move
function promptPlayer() {
  let input = prompt(`Player ${playerTurn + 1}, please make your move.`, ).toString()
  
  while (JSON.stringify(playerSpaces).includes(input)) { // If input space is already marked
    input = prompt(`Invalid move. Player ${playerTurn + 1}, please try again.`).toString()
  }

  return input
}

// Checks if any player has won
function checkWin() {

  for (let player in playerSpaces) {
    for (let i = 0; i < winningCombos.length; ++i) {
      let win = true

      for (let j = 0; j < winningCombos[i].length; ++j) {
        if (!playerSpaces[player].includes(winningCombos[i][j])) {
          win = false
        }
      }

      if (win) {
        gameOver = true
        return `Game over! Player ${playerTurn + 1} wins!`
      }
    }
  }
}

function computerMove() {

  for (let i = 0; i < winningCombos.length; ++i) {
    let selectedWinningCombo = winningCombos[i].slice()

    for (let j = 0; j < winningCombos[i].length; ++j) {
      if (playerSpaces['X'].includes(winningCombos[i][j])) {
        selectedWinningCombo = selectedWinningCombo.replace(winningCombos[i][j], '')
      }
    }

    if (selectedWinningCombo.length === 1 && remainingSpaces.includes(selectedWinningCombo)) {
      console.log('Computer is trying to prevent a loss', selectedWinningCombo)
      return selectedWinningCombo
    }
  }
  
  let computerInputIndex = Math.ceil(Math.random() * remainingSpaces.length)

  let computerInput = remainingSpaces[computerInputIndex - 1]

  return computerInput
}

// Umbrella for game functions
function newGame() {
  
  // Initial display of board
  console.log(board)

  // Loop while game is active
  while (gameOver === false) {
    
    let selectedSpace
    if (playerTurn === 0) {
      selectedSpace = promptPlayer() // Prompt player for action
    } else {
      selectedSpace = computerMove()
      console.log(`Computer has selected space ${selectedSpace}`)
    }

    move(playerTurn, selectedSpace) // Make move

    console.log(board) // Display board

    // Check win status, print win message if true
    let winStatus = checkWin()
    if (winStatus) console.log(winStatus)

    // Switch player turn
    if (!playerTurn) playerTurn++
    else playerTurn--
    turn++
    
    // Detect draw
    if (turn === 9) {
      gameOver = true
      console.log('It\'s a draw!')
    }
  }
}

newGame()
