import {
    create,
    set,
    newWatch,
    render
    
} from './reactivity/reactivity.js'


import {seo} from './seo/seo.js'

import {event} from './custom-methods/events.js'


import {newBind}  from './attributes/attributes.js'

export {create,set,newWatch,seo,event,newBind}

export {getPageDatas} from './custom-methods/page-datas.js'

export {reUse} from './components/re-use.js'

export {navigate, redirect, newRoute} from './routing/index.js'
