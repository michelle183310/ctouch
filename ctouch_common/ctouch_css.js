//generated by ctouch_touch_inner.rb
var s=document.createElement('script');
s.type='text/javascript';
s.id='ctouch_css_js';
s.innerHTML="\
(function(){\n\
document.getElementsByTagName('body')[0].style.overflow='visible';\n\
document.getElementsByTagName('body')[0].style.webkitUserSelect='auto';\n\
var opt=document.getElementsByTagName('option');\n\
if(opt)for(i=0;i<opt.length;i++)opt[i].style.color='black';\n\
//var meta=document.getElementsByTagName('meta');\n\
//if(meta)for(i=0;i<meta.length;i++)if(meta[i].name=='viewport'){meta[i].parentNode.removeChild(meta[i]);break;}\n\
var embed=document.getElementsByTagName('embed');\n\
if(embed&&embed.length==1){\n\
	console.log(embed);\n\
	var parent=embed[0].parentNode;\n\
	if(parent.tagName=='DIV')parent.style.height='100%';\n\
}\n\
\n\
var hackcanvas_cnt=0;\n\
var hackcanvas=function(){\n\
	var canvas=document.getElementsByTagName('canvas');\n\
	if(canvas&&canvas.length==1){\n\
		var ctx=canvas[0].getContext('2d');\n\
		ctx.__proto__.__fillText=ctx.__proto__.fillText;\n\
		ctx.__proto__.fillText=function(s,x,y,l){\n\
			l = l || 0;\n\
			if(l<10)ctx.__fillText.call(this,s,x,y);\n\
			else ctx.__fillText.call(this,s,x,y,l);\n\
		};\n\
	}else{\n\
		hackcanvas_cnt++;\n\
		if(hackcanvas_cnt<5)setTimeout(hackcanvas,200);\n\
	}\n\
};\n\
setTimeout(hackcanvas,200);\n\
\n\
var myself = document.getElementById('ctouch_css_js');\n\
myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
