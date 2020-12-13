class Food{
    constructor(){
        this.image=loadImage("Milk.png");
        this.foodStock=0;
        this.lastFed;
    }
    updateFoodStock(foodStock){
        this.foodStock=foodStock;

    }
getFetchTime(lastFed){
    this.lastFed=lastFed;
}
deductFood(){
    if(this.foodStock>0){
        this.foodStock=foodStock-1;
    }
}

getFoodStock(){
    return this.foodStock;
}


    display(){
        background(46,139,87);
        fill(255);
        textSize(15);
        if(lastFed>=12){
            text("last feed: "+lastFed%12+"pm",50,30);
        }else if(lastFed===0){
            text("lastfeed: 12am",50,30);
        }else{
            text("last feed: "+lastFed+"am",50,30);
        }
        var x = 80;
        var y = 100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);
        if(this.foodStock !==0){
for(var i=0;i<this.foodStock;i++){
    if(i%10===0){
        x=80
        y=y+50
    }
    image(this.image,x,y,50,50);
    x=x+30
}
        }
    }
    bedroom(){
        background(bedRoomImg,500,200);
    }
    livingroom(){
        background(livingRoomImg,500,200);
    }
    garden(){
        background(gardenImg,500,200);
    }
}