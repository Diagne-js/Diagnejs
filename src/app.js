import { create, set, newEvent } from 'diagne' 

export const App = () => {
  let board = create(['','','','','','','','',''])
  let player = create('X')
  let isWinner = create(false)
  
  let states = create([])
  
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
  
  let wP = create(['','','','','','','','',''])
  
  
  const checkWin = () => {
    for (let pos of winPositions) {
       const [a,b,c] = pos
       if (board[a] != '' && board[a] == board[b] && board[a] == board[c]) {
         set(() => isWinner = true)
         if (player == 'O') {
           set(() => wP[a] = 'green',{a:a})
           set(() => wP[b] = 'green',{b:b})
           set(() => wP[c] = 'green',{c:c})
         }else{
           set(() => wP[a] = 'red',{a:a})
           set(() => wP[b] = 'red',{b:b})
           set(() => wP[c] = 'red',{c:c})
         }
       }
    }
  }
  
  newEvent('play', (i) => {
    if (isWinner) return
    i = parseFloat(i[0])
    if(board[i] == '') { 
       set(() => board[i] = player,{i:i})
        checkWin()
        set(() => states = [...states, {
                 board: [...board],
                 wp: [...wP],
                 player: player,
                 isWinner: isWinner,
                 id: states.length + 1
              }
        ])
        set(() => player = player == 'X' ? 'O' : 'X')
    }
  })
  
  
  newEvent('jumpTo',  (target) => {
    if (target[0] != 'start') {
      const id = parseFloat(target[0])
      const state = states[id]
  
      for (var i = 0; i < board.length; i++) {
         set(() => board[i] = state.board[i], {i:i})
         set(() => wP[i] = state.board[i], {i:i})
      }
      set(()=> player = state.player == 'X' ? 'O' : 'X')
      set(() => isWinner = state.isWinner)
      return
    }
     for (var i = 0; i < board.length; i++) {
       set(() => board[i] = '', {i:i})
       set(() => wP[i] = '', {i:i})
       set(() => states = [])
     }
     set(() => isWinner = false)
  })
  
  
  
  return `
     <h1>Morpion game</h1>
     
    <p if='isWinner'>{player} has lose</p>
     <p else>next player is {player}</p>

     <section class='morpion'>
        <div 
            for='case from board'
            click='play: ::i'
            d-class='wP[::i]'
        >{case}</div>
     </section>
     
     <button click='jumpTo:start'>reset</button>
     <button for='state of states' click='jumpTo: ::i'>
         move to #{state.id}
     </button>
     
     <GetStarted />
     
     
  `
}                                                                                                                                                                                                                                                                                                                                                                                                                              
