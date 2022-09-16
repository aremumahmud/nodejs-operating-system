const { EventEmitter } = require("events");
const fs = require('fs')
const generate_random_id = require('./generate-random')
const generate_id = new generate_random_id(20)


class db {
    constructor(){
      this.busy = {}
      this.hold = {}
      this.cache = {
          addit:{
              bakery : {}
          }
      }
    }

    shoot( app , collection , new_data , callback ){
      //  console.log(this.busy[collection] , 'test')
        if(this.busy[collection] == 'busy'){
            generate_id.generate(id=>{
                new_data._id = id
                this.hold[collection].push(new_data)
               // console.log(this.hold[collection] , 'kk')
             })
        }else{
            this.busy[collection] = 'busy'
            this.hold[collection] = []
            fs.readFile( `./apps/${app}/collections/${collection}.json` , ( err , data )=>{
                
                if(err){
                    //create the collection
                    let empty_data = []
                    generate_id.generate(id=>{
                        new_data._id = id
                        empty_data.push(new_data)
                        this.updateCache(app , collection , new_data , 'add',()=>{})
                        empty_data = JSON.stringify(empty_data ,null, 2)
                        fs.writeFile( `./apps/${app}/collections/${collection}.json` , empty_data, (err , datas)=>{
                        if(err){
                            process.nextTick(()=>callback(err , null)) 
                        }else{
                            process.nextTick(()=>callback(null , datas))
                        }
                        })
                        this.notify(app , collection ,(nx,ff)=>{
                           // console.log(ff , nx)
                        } )
                    })
                    
                }else{
                    //read and write to the collection
                    var collection_data = JSON.parse(data.toString())
                    generate_id.generate(id=>{
                        new_data._id = id
                        this.updateCache(app , collection , new_data , 'add', ()=>{})
                        collection_data.push(new_data)
                        collection_data = JSON.stringify(collection_data ,null, 2)
                        fs.writeFile( `./apps/${app}/collections/${collection}.json` , collection_data, (err , datas)=>{
                            if(err){
                                process.nextTick(()=>callback(err , null))
                            }else{
                                process.nextTick(()=>callback(null , datas))
                            }
                            this.notify(app , collection ,(nx,ff)=>{
                               // console.log(ff , nx)
                            } )
                        })
                    })

                }
            })
        }
        

    }

    notify(app , collection, callback){
        //console.log(this.hold,'ll')
        //console.log(this.busy,'ll')
        if(this.hold[collection].length == 0){
             delete this.busy[collection]
        }else{
            fs.readFile( `./apps/${app}/collections/${collection}.json` , ( err , data )=>{
               // console.log(this.hold[collection])
                this.updateCache(app , collection , this.hold[collection] , 'add' , (d)=>{
                   console.log(d,'ll')
                })
                var collection_data = JSON.parse(data.toString())
                    collection_data = collection_data.concat(this.hold[collection])
                    this.hold[collection] = []
                    collection_data = JSON.stringify(collection_data ,null, 2)
                   // console.log(collection_data  ,'cum')
                    fs.writeFile( `./apps/${app}/collections/${collection}.json` , collection_data, (err , datas)=>{
                        if(err){
                            process.nextTick(()=>callback(err , null))
                        }else{
                            process.nextTick(()=>callback(null , datas))
                        }
                      // setTimeout(()=>console.log(this.cache.addit.bakery),7000)
                        this.notify(app , collection , callback)
                    })
            
            })
        }
        
    }

    loadDbCache(app , collections){
        if(collections.constructor.name == 'Array'){
            console.log('kkn')
        }else if(typeof collections == 'string'){
            console.log('kk')
        }

    }

    updateCache(app , collection , data , operation , callback){
        var cache = this.cache[app][collection]
        switch (operation) {
            case 'add':
                if (data.constructor.name == 'Array'){
                    data.forEach(data => {
                        cache[data._id] = data
                        
                    });
                   // console.log(cache , 'array')
                }else if(data.constructor.name == 'Object'){
                    cache[data._id] = data
                  //  console.log(cache , 'object')
                }else{
                    throw new Error('unacceptable data type')
                }
                
                process.nextTick(()=>callback(cache))
                break;

            case 'delete':
                break;

            case 'update':
                break;
        
            default:
                throw new Error('use a valid operation or try operations: `add` , `delete`, `update`');
        }


    }

    findById(app , collection , _id , callback){
          var found = this.cache[app][collection][_id]
          if (found){
            process.nextTick(()=>callback(null , found))
          }else{
            process.nextTick(()=>callback({
                error : true.push,
                errType : 'EONENT'
            } , null))
          }
          
    }
}














let dbs = new db('l,')

dbs.loadDbCache('ll',[])
// dbs.shoot('addit','bakery' ,{
//     caketype : ' synergy',
//     cakecus : 'ayila'
// },(err , sucss)=>{
//     if(!err){
//        console.log('sucess'  , err , sucss)
//     }
// })

// dbs.updateCache('addit','bakery',{
//     null:'l'
// },'add',n=>{
//     console.log(dbs.cache , n)
// })
console.log('bitch AS MOFU')