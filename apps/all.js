//$%additionApp.js
var interfaces = [`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <input type="text" id='${'a'}'>
    <input type="text"  id='${'b'}'>
    <input type="button" id='${'c'}' value="add">
    <p id='n'></p>
</body>
</html>
`]

function additionApp(){
   //this.interface = new InterfaceStack(interfaces)
   this.launch = (a,main)=>{
       main.launchTo(interfaces[0] , this.actions)
   }
   this.close =(a,main)=>{
       main.closeTo('')
   }
   
   this.actions = {
        add : {
            el : 'c',
            type : 'click',
            func :"(element)=> element('n').innerHTML  = Number(element('a').value) + Number(element('b').value)"
        }
   }

}

var add = new additionApp()
module.exports = {
    routes : [],
    additionApp : add,
    Launch : add.launch,
    Close : add.close
}
//$%aremu