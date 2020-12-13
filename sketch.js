var dog,happyDog,dogImg,happyDogImg;
var foodS,foodStock;
var database; 
var feed,addFood; 
var fedTime,lastFed;
var gameState,readState;
var livingRoomImg,gardenImg,bedRoomImg;
function preload()
{
  dogImg=loadImage("images/dog1.png");
  happyDogImg=loadImage("images/dogHappy.png");
  gardenImg=loadImage("virtual pet images/Garden.png");
  livingRoomImg=loadImage("virtual pet images/Living Room.png");
  bedRoomImg=loadImage("virtual pet images/Bed Room.png");

}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
dog = createSprite(800,200,100,100);
dog.addImage(dogImg);
dog.scale=0.5;

foodStock = database.ref('food');
foodStock.on("value",readStock);

feed=createButton("feed the dog");
feed.position(700,95);

feed.mousePressed(feedDog);

addFood=createButton("add food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

foodObj=new Food();
readState=database.ref('gameState');
readState.on("value",function(data){
  gameState=data.val();
})
fedTime=database.ref('feedTime');
  fedTime.on("value",function (data){
    lastFed=data.val();
  })
}


function draw() {  
background(46, 139, 87);
currentTime=hour();
if(currentTime===(lastFed+1)){
update("playing");
foodObj.garden();
}
else if(currentTime===(lastFed+2)){
  update("sleeping");
  foodObj.bedroom();
}
else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
  update("resting");
  foodObj.livingroom();
}else{
  update("hungry");
  foodObj.display();
}
if(gameState!=="hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();

}else{
  feed.show();
  addFood.show();
dog.addImage(dogImg)
}

drawSprites();
}

function readStock(data){ 
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}


function addFoods(){
   foodS++;
   database.ref('/').update({
food:foodS
   })
}

function feedDog(){
  dog.addImage(happyDogImg);
foodObj.updateFoodStock(foodObj.getFoodStock()-1)
database.ref('/').update({
  food:foodObj.getFoodStock(),
  feedTime:hour()
})
}


function update(state){
  database.ref('/').update({
    gameState:state
  })
  
}

