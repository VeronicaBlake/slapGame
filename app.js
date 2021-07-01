let moves = ({
    punch: {
        damage: 5,
        btnClass: 'btn-success'
    },
    kick: {
        damage: 10,
        btnClass: 'btn-warning'
    },
    slap: {
        damage: 1,
        btnClass: 'btn-info'
    }
})

let enemy ={
    health: 100,
    hitCounter: 0
}

/**
 * this will be the function that updates health of enemy for move 
 * @param {String} str 
 */
function hit(str){
    let attack = moves[str]
    updateHealth(attack.damage)
    drawHealth()
    updateHitCounter()
    drawHitCounter()
}

//responsible for updating user interface when changed 
//target element id w/ health

//conditional for 0 health 
function updateHealth(damage){
    (enemy.health ? enemy.health -= damage: '')
}

function drawHealth(){
    document.getElementById('health').innerText=enemy.health
}

function drawHitCounter(){
    document.getElementById('hitCount').innerText=enemy.hitCounter
}

function updateHitCounter(){
 enemy.hitCounter += 1
}

function drawButtons(){
    let template = ''
    for(let key in moves){
        let element = moves[key]
        template += `<button class="btn ${element.btnClass} mx-1" onclick="hit('${key}')">${key}</button>`
    }
    document.getElementById('buttons').innerHTML = template
}

drawButtons()