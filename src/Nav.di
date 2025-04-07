import Links from "Links.di"

export default () => { 
    let isDark = true
    return <template>
      <div style="width:100%; padding:6px 0; border-bottom:1px gray solid;background: {isDark ? 'black' : 'white'}; display:flex; justify-content:space-between;align-items:center">
           <div style='width:60px;height:30px;border:solid 1px; border-radius:30px; position:relative;padding:2px'
           onclick={(e) => set isDark = !isDark}>
              <button style="width:30px; height:30px; border-radius:50%; box-shadow:1px 1px 1px;border:1px solid;position:absolute;transition:0.4s;left:{isDark ? '50%' : '3%'}"
               onclick={(e) => {
                  e.stopPropagation()
                  set isDark = !isDark
            }}
           ></button>
           <Links />
          </div>
    </div>
  </template>
}