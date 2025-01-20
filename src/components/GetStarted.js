import {event, create, set, getPageDatas} from 'diagne'

export const GetStarted = (props) => {
  
  let inputValue = create('')
  
  event(`handlerVolume`, (e) => set(() => inputValue = e.target.value))
  
  return`
  
    { inputValue }
  
     <input 
         oninput="handlerVolume"
         d-type='props.type '
         d-placeholder="props.placeholder"/>
    
     <button>
       {props.btn}
     </button>
  `
}
