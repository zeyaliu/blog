
//generic function to get selector
        function g(selector){
            var method=selector.substr(0,1)=='.'?'getElementsByClassName':'getElementById';
                return document[method](selector.substr(1));
        }
//calculate left right area range
function range(){
	var range={left:{x:[],y:[]},right:{x:[],y:[]}};
	var wrap={
		w:g("#wrap").clientWidth,
		h:g("#wrap").clientHeight
	}
	var photo={
		w:g(".photo")[0].clientWidth,
		h:g(".photo")[0].clientHeight
	}

	range.wrap=wrap;
	range.photo=photo;

	range.left.x=[0-photo.w, wrap.w/2-photo.w];
	range.left.y=[0-photo.h, wrap.h];

	range.right.x=[wrap.w/2+photo.w, wrap.w+photo.w];
	range.right.y=range.left.y;
	return range;
}
//sort photoes
        function rsort(n){
        	var _photo=g(".photo");
        	var photoes=[];
        	for(var s=0;s<_photo.length;s++){
        		_photo[s].className=_photo[s].className.replace(/\s*photo-center\s*/,"");
                _photo[s].className=_photo[s].className.replace(/\s*photo-front\s*/,"");
                _photo[s].className=_photo[s].className.replace(/\s*photo-back\s*/,"");
                _photo[s].className+=" photo-front";
                _photo[s].style.top='';
                _photo[s].style.left='';
                _photo[s].style['-webkit-transform']='rotate(360deg) scale(1.3)';
        		photoes.push(_photo[s]);
        	}

            var photo_center=g("#photo_"+n);
            photo_center.className+=" photo-center";
            photo_center=photoes.splice(n,1)[0];

            //splice photoes into left right side
            var photoes_left=photoes.splice(0,Math.ceil(photoes.length/2));
            var photoes_right=photoes;

            var ranges=range();
            for(s in photoes_left){
            	var photo=photoes_left[s];
            	photo.style.left=random(ranges.left.x)+"px";
            	photo.style.top=random(ranges.left.y)+"px";
            	photo.style["-webkit-transform"]="rotate("+random([-150,150])+"deg) scale(1)";
            }
            for(s in photoes_right){
            	var photo=photoes_right[s];
            	photo.style.left=random(ranges.right.x)+"px";
            	photo.style.top=random(ranges.right.y)+"px";
            	photo.style["-webkit-transform"]="rotate("+random([-150,150])+"deg) scale(1)";

            }
            var navs=g('.i');
            for(var s=0;s<navs.length;s++){
                navs[s].className= navs[s].className.replace(/\s*i_current\s*/,' ');
                navs[s].className= navs[s].className.replace(/\s*i_back\s*/,' ');
            }
            g('#nav_'+n).className+=' i_current ';

        }
//get random number for center use
		function random(range){
			var max=Math.max(range[0],range[1]);
			var min=Math.min(range[0],range[1]);
			var diff=max-min;
			var number=Math.ceil(Math.random()*diff+min);
			return number;
		}

//turn photos control

        function turn(elem){
            var cls=elem.className;
            var n=elem.id.split('_')[1];

            if(!/photo-center/.test(cls)){
                return rsort(n);
            }

            if(/photo-front/.test(cls)){
                cls=cls.replace(/photo-front/,"photo-back");
                g('#nav_'+n).className+=' i_back ';
            }else{
                cls=cls.replace(/photo-back/,"photo-front");
                g('#nav_'+n).className=g('#nav_'+n).className.replace(/\s*i_back\s*/,' ');
            }
            return elem.className=cls;
        }

