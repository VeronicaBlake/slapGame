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
    },
    heldItems: []
})

let items = ({
    wolverine: {
        mod: .45,
        description: 'is so sharp!',
        durability: 5, 
        btnClass: 'btn-light',
        inUse: false
    },
    acid: {
        mod: .50,
        description: 'is so corrosive!',
        durability: 2, 
        btnClass: 'btn-light',
        inUse: false
    },
    fire: {
        mod: -1.6,
        description: 'is pleasantly warm.',
        durability: 10,
        btnClass: 'btn-light',
        inUse: false 
    }
})

let enemy ={
    health: 100,
    hitCounter: 0,
    name: 'Scary Clown'
}

/**
 * this will be the function that updates health of enemy for move 
 * @param {String} str 
 */
function hit(str){
    let attack = moves[str]
    updateHealth(Math.round(attack.damage*modTotal()))
    drawHealth()
    updateHitCounter()
    drawHitCounter()
    drawProgress()
}

function giveItem(element){
    let itemGiven = items[element]
    moves['heldItems'].push(itemGiven)
}

function usingItem(item){

    let expression = items[item].inUse;
    if(expression){
        items[item].inUse = false
    } else {
        items[item].inUse = true
    }
}

function giveAll(){
    for(let keys in items ){
        giveItem(keys)
    }
}

function modTotal(){
let total = 1
moves['heldItems'].forEach(element => {
    if(element.inUse){
        total += element.mod
    }
})
    return total
}

//responsible for updating user interface when changed 
//target element id w/ health

//conditional for 0 health 
function updateHealth(damage){
    if(enemy.health <= 0){
        enemy.health = 0;
    }
    else {
        enemy.health -= damage
    }
}

function drawHealth(){
    document.getElementById('health').innerText=enemy.health
}

function drawHitCounter(){
    document.getElementById('hits').innerText=enemy.hitCounter
}

function updateHitCounter(){
 enemy.hitCounter += 1
}

function drawButtons(){
    let template = ''
    for(let key in moves){
        if( key == 'heldItems'){
            continue
        }
        let element = moves[key]
        template += `<button class="btn ${element.btnClass} mx-2" onclick="hit('${key}')">${key}</button>`
    }
    document.getElementById('buttons').innerHTML = template
}

function buttonSelect(id){
if(doesContain(id)) {
 document.getElementById(id).classList.remove('border', 'border-white', 'border-4')
} else{
    document.getElementById(id).classList.add('border', 'border-white', 'border-4')
}
}

function doesContain(id){
    return document.getElementById(id).classList.contains('border-white') 
}

function drawProgress(){
    let template = ''
    if(enemy.health > 100){
        template = `<div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar"
    style="width: 100%; height: 30px " aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>`
    } else {
        template = `<div class="progress-bar bg-danger progress-bar-striped progress-bar-animated" role="progressbar"
    style="width: ${enemy.health}%; height: 30px " aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>`
    }

    document.getElementById('progress').innerHTML = template
}

function drawItemButtons(){
    let template = ''
    let abc = 'a'
     for(let key in items){
        let element = items[key]
        template += `<button id='${abc}' class="btn ${element.btnClass} mx-2" onclick="buttonSelect('${abc}');usingItem('${key}')">${key}</button>`;
        abc += 'a'
    }
    document.getElementById('item-buttons').innerHTML = template
}

function initEnemy(){
    document.getElementById('name').innerHTML = enemy.name
    drawHealth()
    drawHitCounter
}

drawProgress()
initEnemy()
drawButtons()
drawItemButtons()
giveAll()