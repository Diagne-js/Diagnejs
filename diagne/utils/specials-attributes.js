const events = Object.keys(window).filter(m => m.startsWith('on'))

export const specialsAttributes = [
      'for',
      'if',
      'else',
      'show',
      'hide',
      'd-class',
      'd-id',
      'd-value',
      'd-type',
      'd-placeholder',
      'd-disabled',
      'd-style',
      ...events
  ]
  
  