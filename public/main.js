const socket = io('/')
const el =(e,d)=>{
return d["getElementById"](e)
}

socket.on('launch' , (interface)=>{
    el('launching' , document).innerHTML = `<iframe id="apptest" frameborder="4" width="300px" height="300px"></iframe>`
   // console.log(el('apptest').contentWindow)
   var doc = el('apptest' , document).contentDocument
   
   doc.body.onload = function(){
       console.log(interface,'ee')
        el('apptest',document).contentDocument.body.innerHTML = interface[0]
        let actions = interface[1]
        let actionArr = Object.keys(actions)
        var modEl = (e)=>el(e, doc)
        actionArr.forEach( act =>{
            let acts = actions[act]
            console.log(actions)
      //console.log(eval(acts.func) , 'ff')
            el(acts.el , doc).addEventListener(acts.type ,()=> {eval(acts.func)(modEl)})
                
        })
   }
  
})


socket.emit('launch' , 'e')