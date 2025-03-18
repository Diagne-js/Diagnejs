import {D, create, getPageDatas} from 'diagne'
import '../components/Todo.js'


export const home = () => {
  const array = ['','','','','','','','','']
  const setPlayer = (player) => player == 'X' ? 'O' : 'X'
  
  const style = create(
    D.newStyle({
    color: 'red',
    background: 'green',
  })
  )

  let board = create([...array])
  let player = create('X', {setter:setPlayer})
  let isWinner = create(false)
  let wP = create([...array])
  let statesLength = create(0)
  let states = []
  
  const winPositions = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
  ]
  
  const checkWin = () => {
    for (let pos of winPositions) {
       const [a,b,c] = pos
       if (board[a] != '' && board[a] == board[b] && board[a] == board[c]) {
         D.set(() => isWinner = true)
         if (player == 'O') {
           D.set(() => wP[a] = 'green',{a:a})
           D.set(() => wP[b] = 'green',{b:b})
           D.set(() => wP[c] = 'green',{c:c})
         }else{
           D.set(() => wP[a] = 'red',{a:a})
           D.set(() => wP[b] = 'red',{b:b})
           D.set(() => wP[c] = 'red',{c:c})
         }
       }
    }
  }
  
  D.event('play', (i) => {
    if (isWinner) return
    if(board[i] == '') { 
       D.set(() => board[i] = player,{i})
       D.set(() => statesLength += 1)
        checkWin()
       states = [...states, {
                 board: [...board],
                 wp: [...wP],
                 player: player,
                 isWinner: isWinner,
                 id: states.length + 1
              }
        ]
        player = D.set('player')
    }
  })
  
  
  D.event('jumpTo',  (target) => {
    if (target != 'start') {
      const id = target
      const state = states[id]
      
      D.set(() => board = state.board)
      D.set(() => wP = [...array])
         
      D.set(() => player = state.player == 'X' ? 'O' : 'X')
      D.set(() => isWinner = state.isWinner)
      return
    }
    D.set(() => board = [...array])
    D.set(() => wP = [...array])
    states = []
    D.set(() => isWinner = false)
  })
  
  return `
     <h1>Morpion game</h1>
    <p if='isWinner == true'>{player} has lose</p>
    <p else>next player is { player }</p>
     
     <section class='morpion'>
        <div 
            for='case from board'
            onclick="play: ::i"
            d-class='wP[::i]'
        >{case}</div>
     </section>
     <button onclick="jumpTo:'start'">reset</button>
     <button for='let l = 0 from statesLength' onclick='jumpTo: l'>
         move to #{l}
     </button>
     <Todo />
   
  `
}