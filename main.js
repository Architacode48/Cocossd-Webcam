status="";
objects=[];
function setup(){
    canvas=createCanvas(640,450);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide();
    compare=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model loaded!");
    status=true;
}
function draw(){
    image(video,0,0,640,450) ;
    if(status != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        compare.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Detected Objects";
            document.getElementById("number").innerHTML="Number Of Items: "+objects.length;
            percent=floor(objects[i].confidence*100);
            stroke(r,g,b);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }else{
        console.log(results);
        objects=results;
    }
}