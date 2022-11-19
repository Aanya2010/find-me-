video="";
status="";
objects=[];


function setup() {
canvas=createCanvas(480, 380);
canvas.center()
video=createCapture(VIDEO);
video.size(480, 380);
video.hide();

}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status!=""){
        objectdet.detect(video, gotresults);
        for(i=0; i<objects.length; i++){
            document.getElementById("stat").innerHTML="status: objects detected";
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(object[i].label==obn){
                video.stop();
                objectdet.detect(gotresults);
                document.getElementById("obj").innerHTML=obn+" found";

            }
            else{
                document.getElementById("obj").innerHTML=obn+" not found";
            }

        }
    }
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function start(){
objectdet=ml5.objectDetector('cocossd', modelloaded);
document.getElementById("stat").innerHTML="status: Detecting objects"
obn=document.getElementById("input").value;

}

function modelloaded(){
    console.log("hi its me ");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}