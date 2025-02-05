import {dEval} from './d-eval.js'

export const methodsIntoHtml = {
  "toLowerCase()": {
    action: (target) => target.toLowerCase(),
    type: 'no param'
  },
  "toUpperCase()": {
    action: (target) => target.toUpperCase(),
    type: 'no param'
  },
  length: {
    action: (target) => target.length,
    type: 'no param'
  },
  slice: {
    action: (target, [s, e]) => target.slice(dEval(s),dEval(e)),
    type: 'with param'
  },
}