const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2

class Sprite {
    constructor({position,velocity}) {
        this.position = position 
        this.velocity = velocity
        this.height = 150
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y,50,this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        } else{
            this.velocity.y += gravity
        }
    }
}

const player = new Sprite({
    position: {
        x: 0,
        y:0,
    },
    velocity:{
        x: 0,
        y: 0
    }    
})

const enemy = new Sprite({
    position: {
        x: 400,
        y: 100,
    },
    velocity:{
        x: 0,
        y: 0
    }    
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
}
let lastKeyPlayer
let lastKeyEnemy


function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0

    if(keys.a.pressed && lastKeyPlayer == 'a'){
        player.velocity.x = -1
    } else if(keys.d.pressed && lastKeyPlayer == 'd'){
        player.velocity.x = 1
    }

    enemy.velocity.x = 0

    if(keys.ArrowLeft.pressed && lastKeyEnemy == 'ArrowLeft'){
        enemy.velocity.x = -1
    } else if(keys.ArrowRight.pressed && lastKeyEnemy == 'ArrowRight'){
        enemy.velocity.x = 1
    }
}

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            lastKeyPlayer = 'd'
            break
        case 'a':
            keys.a.pressed = true
            lastKeyPlayer = 'a'
        break
        case 'w':
            player.velocity.y = -10
            
        break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            lastKeyEnemy = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            lastKeyEnemy = 'ArrowLeft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -10
            
        break
    }
}) 

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
        break
    }
})