const alpha = 'abcdefghijklmnopqrstuvwxyz'
const lowerAlpha = alpha.split('')
const upperAlpha = alpha.toUpperCase().split('')
const numbers = ('0123456789').split('')

function random (length){
    return Math.floor(Math.random()*length)
}

class generate_random_id {
    constructor(length){
        this.length = length
        this.ids = {}
        this.contain = [lowerAlpha , upperAlpha , numbers]
    }

    print(msg){
        console.log(msg + this.length)
    }

    generate(callback){
        let result_id = []
        for(let i = 0 ; i < this.length ; i++){
            let char;
            var rnd_type  = this.contain[random(this.contain.length)]
            char = rnd_type[random(rnd_type.length)]
            result_id.push(char)
        }
        process.nextTick(()=>{
             callback(result_id.join(''))
        })
       

    }
}

// export the generate random id class
module.exports = generate_random_id