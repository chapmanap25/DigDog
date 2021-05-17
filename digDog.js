$(document).ready(function () {
    $("button#start").on("click", start);
});
const NUM_BONES = 3;
var boneCount = 0;
var dangerMeter = 0;
var clickedArray = [];
var gameOver = 0;
var isStarted = 0;
var f = 0;
function start() {
    if(isStarted === 0)
    {
        isStarted++;
        for(let i = 0;i< NUM_BONES * NUM_BONES;i++){
            var newElement = document.createElement("div");
            newElement.className += 'grid-item' + (i + 1);

            //Add event listener for this grid item
            newElement.onclick = function(){
                gameLogic(this.id,this.name);
            }
            let randNumber =(Math.floor(Math.random() * 2) + 1);
            if(randNumber === 1 && boneCount < NUM_BONES){
                newElement.id = "bone";
                boneCount++;
            }
            else if(i > 6 && boneCount < 3){//To guarantee that we get 3 bones
                newElement.id = "bone";
                boneCount++;
            }
            else{
                newElement.id = "nonBone";
            }
            newElement.name = i+1;
            document.getElementById("grid").appendChild(newElement);
        }
        $("p#bonesRemaining").text('Bones remaining: ' + boneCount);
        $("p#dangerMeter").text('Danger Meter:' + dangerMeter);
        //Add secret 'bones' to a secret number of squares
    }
}
function gameLogic(clicked_id,clicked_name){
    if(!clickedArray.includes(clicked_name) && gameOver === 0){
        clickedArray.push(clicked_name);
        if(clicked_id === "bone"){
            boneCount--;
            $("p#bonesRemaining").text('Bones remaining: ' + boneCount);
            //Add logic here to add a photo to div item
            var bone = document.createElement("img");
            bone.setAttribute("src", "bone.jpg");
            bone.setAttribute("height", "35");
            bone.setAttribute("width", "50");
            bone.setAttribute("alt", "bone");
            $('.grid-item'+clicked_name+'#bone').append(bone);
        }
        $('.grid-item'+clicked_name).css('background-color', 'rgb(139,69,19)');
        dangerMeter += randomNumber(1/(NUM_BONES*NUM_BONES),(4/(NUM_BONES*NUM_BONES)));
        move(dangerMeter);
        $("p#dangerMeter").text('Danger Meter:' + (dangerMeter*100).toFixed(2) + "%");
        if(boneCount === 0){
            $("p#dangerMeter").text('Congratulations doggo! You won!');
            gameOver = 1;
        }
        if(dangerMeter > 1 && boneCount > 0){
            $("p#dangerMeter").text('Oh no doggo you got caught!');
            gameOver = 1;
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function move(dangerMeter) {
    document.getElementById("Bar").style.width = dangerMeter*100 + "%"
}