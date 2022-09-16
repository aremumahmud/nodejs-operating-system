const fs = require("fs")
const util = require('util')
const eventEmmiter = require('events').EventEmitter



function OS(){

  this.applications = {}
  this.routes = {}
  this.appdata = {}
  this.users = {}
}

OS.prototype.addApp = function (app , cont , user , done){

  fs.writeFile('apps'+ app , cont ,(err , success)=>{
        var appname = app.split('.')[0]
       // console.log(this.applications)
        var ap = require("./apps/"+app)
        addProp(this.applications , appname , ap)
        this.routes[appname+"Route"] = {}
        ap.routes.forEach( route =>{
            this.routes[appname+"Route"][route.path] = route.func
        })
        this.appdata[user+appname] = {}
        this.users[user] = {
            current : null
        }
        
        done()
  })
  return this
}

OS.prototype.LoadAppCache = function (app){
  var ap = require("./apps/"+app)
  ap.Launch(null , this)
  return this

}
OS.prototype.CloseAppCache = function (app){
  var ap = require("./apps/"+app)
  ap.close(null , this)
  return this

}

OS.prototype.launchTo = function (interface , actions){
  this.emit('launchEvent' , [interface , actions])
  return this
}

OS.prototype.closeTo = function (interface){
  this.emit('closeEvent' , [interface])
  return this
}

OS.prototype.LaunchApp = function( app, user){
    this.applications[app].Launch(this.appdata[user+app] , this)
    this.users[user].current = app
    return this

}

OS.prototype.CloseApp = function( app, user){
    this.applications[app].Close(this.appdata[user+app])
    this.users[user].current = app
    return this


}

util.inherits(OS , eventEmmiter)

module.exports = new OS()