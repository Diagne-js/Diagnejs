import { create, set, event, newWatch } from 'diagne'

export const getStartedPage = () => {

  const quiz = [
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
  ]

  let cIndex = create(0)
  let current = create(quiz[cIndex])
  let score = create(0)
  let isPlaying = create(true)

  newWatch(() => {
    if (cIndex == quiz.length) {
      set(() => isPlaying = false)
      return
    }
    set(() => current = quiz[cIndex])
  })

  event('choice', (i) => {
    if (i == current.right) {
      set(() => score += 1)
    }
    set(() => cIndex += 1)
  })

  return `
    <h1>Quiz</h1>
    <br>
    <br>
    <br>
    <div if='isPlaying'>
    <h2>
      {current.question}
    </h2>
    <ul>
      <li for="option in current.options" onclick="choice: ::i">
         {option}
      </li>
    </ul>
    </div>
    <div else>Your score is {score} / 3 </div>
  `
}