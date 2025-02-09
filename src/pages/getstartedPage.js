import { create, set, event, newWatch } from 'diagne'
import '../components/Progress.js'

export const getStartedPage = () => {
  const quiz = create([
    {
      question: 'who is the best',
      options: [
        'bill gates',
        'Bamba Diagne',
        'elon musk'
      ],
      right: 1
    },
    {
      question: 'which is the best',
      options: [
        'Diagne.js',
        'react',
        'vue.js'
      ],
      right: 0
    },
    {
      question: 'where is the best',
      options: [
        'USA',
        'Dubaï',
        'Senegal'
      ],
      right: 2
    }
  ])

  let cIndex = create(0)
  let current = create(quiz[cIndex])
  let score = create(0)
  let isPlaying = create(true)
  let hasAnswer = create(false)
  let style = create(`
         width:${cIndex * 100}px;
         height: 5px;
         border-radius: 5px;
         background:blue;
         transition:0.5s ease-in-out;
  `)

  newWatch(() => {
    if (cIndex == quiz.length) {
      setTimeout(() => {
        set(() => isPlaying = false)
        set(() => score = score)
      }, 600)
      return
    }
    set(() => current = quiz[cIndex])
  }, {dependences: ['cIndex']})

  newWatch(() => {
    set(() => style = `
         width:${cIndex * 100}px;
         height: 5px;
         border-radius: 5px;
         background:blue;
         transition:0.5s ease-in-out;
  `)
  })

  let timer

  event('choice', (e, i) => {
    set(() => hasAnswer = true)
    if (i == current.right) {
      set(() => score += 1)
    } else {
      e.target.className = 'red'
    }
    setTimeout(() => {
      set(() => cIndex += 1)
      set(() => hasAnswer = false)
      e.target.className = ''
    }, 1_000)
  })
  
  event('replay', () => {
    set(() => cIndex = 0)
    set(() => isPlaying = true)
    set(() => score = 0 )
    set(() => current = quiz[cIndex])
  })

  return `
    <h1>Quiz</h1>
    <div if='isPlaying'>
    <D_Spacing size= 1/>
      Tab to edit
    </div>
    <div for='question in quiz'>
       <h1>{question.question}</h1>
         <li for='option in question.options'>{option}</li>
    </div>
    <D_Spacing size= 1/>
     <div style="width:304px; overflow: hidden; border:solid 1px gray; padding: 1px; border-radius: 8px;">
    <div d-style="style"></div>
    </div>
    <D_Spacing size= 1/>
    <h2>{current.question}</h2>
    <D_Spacing size= 2/>
    <ul>
      <button style='display:block; background:transparent '
            for="option in current.options"
            d-class="hasAnswer && ::i == current.right => 'green'"
            d-disabled="hasAnswer"
            onclick="choice: ::i">
            {option}
            <D_Spacing size=2/>
      </button>
    </ul>
    </div>
    <div else>
        Your score is { score } / 3
        <D_Spacing size=3 />
        <button onclick='replay'>replay</button>
    </div>
  `
}