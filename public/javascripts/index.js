function $(s){
	return document.querySelectorAll(s);
}

var musicTitle=null;
var lis = $("#list li");
var play=0;
var playButton=document.getElementById("play")

function playB(){
	
	if(playButton.value=="stop"){
		playButton.value='';
		play=0;
		playButton.value='play';
		source && source[source.stop?"stop":"nodeOff"]();
		
	}else{
		playButton.value='';
		play=1;
		playButton.value='stop';
		load("/media/"+musicTitle);
	}
}

for(var i=0; i<lis.length;i++){
    lis[i].onclick = function(){
        for(var j=0; j<lis.length;j++){
            lis[j].className = "";
        }
        this.className = "selected";
        var html=[];
        var music=document.getElementById("musicName");
        var xs=document.getElementById("child");
        var x=music.removeChild(xs);
        var newp=document.createElement("p");
        newp.id='child';
        var title=this.title.split('.m')[0];
        musicTitle=this.title;
        newp.innerHTML=""+title;
        music.appendChild(newp);
        load("/media/"+this.title);
        play=1;
        playButton.value='play';
        playB();
    }
}

var request= new XMLHttpRequest();
var ac= new (window.AudioContext || window.webkitAudioContext)();
var gainNode=ac[ac.createGain?"createGain":"createGainNode"]();
gainNode.connect(ac.destination);

var analyser = ac.createAnalyser();
var size = 128;
analyser.fftSize = 128*2;
analyser.connect(gainNode);

var source=null;
var count=0;


var box = $("#box")[0];
var height, width;
var capYPositionArray = [];
var canvas = document.getElementById('canvas');
var mirror = document.getElementById('mirror');
var ctx=canvas.getContext("2d");
var mirrorCtx=mirror.getContext("2d");
var line;

function resize2(){
	height= canvas.clientHeight;
	width = canvas.clientWidth;
	//canvas.height=height/2;
	//mirror.height=height/2;	
	 line = ctx.createLinearGradient(0,0,0,height);
	line.addColorStop(1, '#008B8B');
    line.addColorStop(0.5, '#95b55b');
    line.addColorStop(0, '#008B8B');
    
    var sline = ctx.createLinearGradient(0,0,0,height);
	sline.addColorStop(1, '#008B8B');
    sline.addColorStop(0.5, '#95b55b');
    sline.addColorStop(0, '#008B8B');
    mirrorCtx.fillStyle=sline;

}
resize2();

window.onresize = resize2;

function draw(arr){
	var baseStyle="#000";
	ctx.fillStyle=baseStyle;
	ctx.fillRect(0, 0, width, height);
	
	if(play==1){
		ctx.clearRect(0,0,width,height);
		var w = width/size;
		ctx.fillStyle=line;
		for(var i=0; i<size;i++){
			var h = arr[i]/256*height;
			
			ctx.fillRect(w * i, height-h, w*0.8, h);	
		}
		mirrorCtx.clearRect(0, 0, width, height);
	    //mirrorCtx.drawImage(canvas, 0, -100, width, height);
	    for(var i=0; i<size;i++){
			var h = arr[i]/256*height;
			if(i>30&&i<50){
				mirrorCtx.fillRect(w* i, 0, w*0.8, h/4);
			}
			if(i>50){
				mirrorCtx.fillRect(w* i, 0, w*0.8, h/5);
			}else{
				mirrorCtx.fillRect(w* i, 0, w*0.8, h/3);
			}	
		}
	}else{

					
		ctx.clearRect(0,0,width,height);
		mirrorCtx.clearRect(0, 0, width, height);
	
	}
	

}



function load(url){
		var n = ++count;
	source && source[source.stop?"stop":"nodeOff"]();
	request.abort();
	request.open("GET",url);
	request.responseType="arraybuffer";
	request.onload=function(){
		if(n != count) return;
		ac.decodeAudioData(request.response,function(buffer){
			if(n != count) return;
			var bufferSource= ac.createBufferSource();
			bufferSource.buffer=buffer;
			bufferSource.connect(analyser);
			//bufferSource.connect(gainNode);
			bufferSource[bufferSource.start?"start":"noteOn"]();		
			source=bufferSource;
		},function(err){
			console.log(err);
		});
	}
	request.send();
}
	

function visualizer(){
	var arr = new Uint8Array(analyser.frequencyBinCount);
	requestAnimationFrame= window.requestAnimationFrame || 
							window.webkitRequestAnimationFrame ||
							window.mozRequestAnimationFrame;
	function v(){
		analyser.getByteFrequencyData(arr);
		//console.log(arr);
		draw(arr);
		requestAnimationFrame(v);
	}
	
	requestAnimationFrame(v);
}

visualizer();

function changeVolume(percent){
	gainNode.gain.value = percent*percent;
}

$("#volume")[0].onchange =function(){
	changeVolume(this.value/this.max);
}
$("#volume")[0].onchange();


