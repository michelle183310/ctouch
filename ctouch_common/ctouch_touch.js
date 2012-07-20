//generated by ctouch_touch_inner.rb
var s=document.createElement('script');
s.type='text/javascript';
s.id='ctouch_touch_js';
s.innerHTML="\
//ctouch_touch: execute anytime\n\
(function(){\n\
function rec1(o,n,d,e,z){\n\
	var sent=false;\n\
	if(n==o||!n)return false;\n\
	if(n[z]){n[z](e);sent=true;}\n\
	if(rec1(n,n.parentNode,d,e,z)){sent=true;}\n\
	return sent;\n\
}\n\
\n\
function rec2(o,x,y,d,e,z){\n\
	var sent=false;\n\
	var n = d.elementFromPoint(x,y); //\n\
	if(n==o||!n)return false;\n\
	if(n[z]){n[z](e);sent=true;}\n\
	var v = n.style.visibility; //\n\
	n.style.visibility = 'hidden'; //\n\
	if(rec2(n,x,y,d,e,z)){sent=true;}\n\
	n.style.visibility=v; //\n\
	return sent;\n\
}\n\
\n\
function rec(x,y,d,e,z){\n\
	if(rec1(null,d.elementFromPoint(x,y),d,e,z))return true;\n\
	//if(rec2(null,x,y,d,e,z))return true;\n\
	return false;\n\
}\n\
\n\
/** キーボード */\n\
var KEYBOARD = 0;\n\
/** マウス */\n\
var MOUSE = 1;\n\
/** キーボードインターバルフラグ */\n\
var key_repeat_flag = 0;\n\
/** マウスインターバル */\n\
var mouse_repeat_flag = 0;\n\
/** キーイベント保持用 */\n\
var repeatEvent;\n\
\n\
/** キーイベント保持用 */\n\
var reMouseEventDown;\n\
/** キーイベント保持用 */\n\
var reMouseEventUp;\n\
\n\
\n\
/** リピートID */\n\
var repeat_ID = new Array();\n\
/** リピート用のマウスイベント */\n\
var repeatMouse;\n\
/** リピート用のマウスイベント */\n\
var repeatKey;\n\
\n\
var isMouseDown=null;\n\
\n\
\n\
/**\n\
 * マウスイベントからタッチイベントへ変更\n\
 */\n\
var mouse2touch = function(event)\n\
{\n\
	var eventType = '';\n\
	//docmentからeventの作成\n\
	var docEvent = document.createEvent('Event');\n\
	//イベントタイプの判定\n\
	if(event.type == 'mousedown'){//ボタンが押された\n\
		//マウスイベントの偽装\n\
		docEvent = setEvent(event,'touchstart');\n\
		reMouseEventDown = event;\n\
		if(!event.shiftKey || !rec(event.clientX,event.clientY,event.target.ownerDocument,docEvent,'ontouchstart'))\n\
		event.target.dispatchEvent(docEvent);//\n\
		//event.preventDefault();event.stopPropagation();\n\
	}else if(event.type == 'mouseup'){//ボタンが放された\n\
		docEvent = setEvent(event,'touchend');\n\
		//Alt+ClickでもEnterをリピートさせる\n\
		if(event.ctrlKey && event.altKey){\n\
			key_repeat_flag = 1;//リピートフラグを立てる\n\
			startRepeat(MOUSE);//リピートの開始\n\
		}else if(event.altKey){//Altキー押下状態\n\
			//イベントの保持\n\
			key_repeat_flag = 1;//リピートフラグを立てる\n\
			startRepeat(KEYBOARD);//リピートの開始\n\
		}//あえて抜けない\n\
		reMouseEventUp = event;\n\
\n\
		if(window.click){window.click();return;}\n\
		if(!event.shiftKey || !rec(event.clientX,event.clientY,event.target.ownerDocument,docEvent,'ontouchend'))\n\
		event.target.dispatchEvent(docEvent);//\n\
		//event.preventDefault();event.stopPropagation();\n\
	}else if(event.type == 'mousemove'){//マウスが動いた\n\
		if(isMouseDown){\n\
			docEvent = setEvent(event,'touchmove');\n\
			if(!event.shiftKey || !rec(event.clientX,event.clientY,event.target.ownerDocument,docEvent,'ontouchmove'))\n\
			event.target.dispatchEvent(docEvent);//\n\
			//event.preventDefault();event.stopPropagation();\n\
		}\n\
	}else if(event.type == 'keydown'){\n\
		if(key_repeat_flag == 1){//リピート状態のキー押下(Any)\n\
			if(!event.altKey && event.keyIdentifier != 'Enter'){//Altキー押下状態でない\n\
				stopRepeat(KEYBOARD);//リピートを止める\n\
				key_repeat_flag = 0;//リピートフラグを下げる\n\
			}\n\
		}else{\n\
			if(event.altKey){//Altキー押下状態\n\
				if(event.keyIdentifier == 'Enter'){\n\
					//イベントの保持\n\
					repeatEvent = event;\n\
					key_repeat_flag = 1;//リピートフラグを立てる\n\
					startRepeat(KEYBOARD);//リピートの開始\n\
					\n\
				}\n\
			}else{//Altキー押されていない\n\
			}\n\
		}\n\
	}else{\n\
		return;//処理を抜ける\n\
	}\n\
}\n\
\n\
\n\
/**\n\
 * マウスイベントとタッチイベントのすり替えを行う\n\
 */\n\
function setEvent(event,type){\n\
	var e = document.createEvent('Event');\n\
	//イベントの設定\n\
	e.initEvent(type,true,true);\n\
	//イベント座標の受け渡し\n\
	e.screenX = event.screenX;\n\
	e.screenY = event.screenY;\n\
	e.pageX = event.pageX;\n\
	e.pageY = event.pageY;\n\
	e.clientX = event.clientX;\n\
	e.clientY = event.clientY;\n\
	//タッチイベントの初期化\n\
	e.touches = new Array();\n\
	e.touches[0] = {\n\
		screenX: event.screenX,\n\
		screenY: event.screenY,\n\
		pageX: event.pageX,\n\
		pageY: event.pageY,\n\
		clientX: event.clientX,\n\
		clientY: event.clientY\n\
	};\n\
	if(type == 'touchstart')isMouseDown=e.touches;\n\
	if(isMouseDown)isMouseDown=e.touches;\n\
	e.targetTouches = isMouseDown;\n\
	e.changedTouches = isMouseDown;\n\
	if(type == 'touchend')isMouseDown=null;\n\
	return(e);\n\
}\n\
\n\
/** リピートの開始 */\n\
function startRepeat(ID){\n\
	if(ID == MOUSE){\n\
		//０．１秒毎に呼ばれる\n\
		repeat_ID[ID] = setInterval('mouseRepeatDOWN()',500);\n\
		repeat_ID[ID+1] = setInterval('mouseRepeatUP()',500);\n\
	}else if(ID == KEYBOARD){\n\
		//０．１秒毎に呼ばれる\n\
		repeat_ID[ID] = setInterval('keyRepeat()',100);\n\
	}\n\
	\n\
}\n\
/** リピートの停止 */\n\
function stopRepeat(ID){\n\
	clearInterval(repeat_ID[ID]);\n\
	if(ID == MOUSE){\n\
		clearInterval(repeat_ID[ID+1]);\n\
	}\n\
}\n\
/** リピート本体 */\n\
function keyRepeat(){\n\
	//Enter押下を擬似的に発生させる\n\
	\n\
	//Chromeの仕様というかDOMの仕様を理解していないので\n\
	//ネットのソース丸コピ\n\
	//参考サイト\n\
	//http://groups.google.com/group/chrome-api-developers-jp/browse_thread/thread/9d9816fdceb576fb?fwc=1\n\
	\n\
	//KeyboardEventの作成\n\
	var e = document.createEvent('KeyboardEvent');\n\
	//入力パラメータの作成\n\
	var o = { \n\
			type:'keydown',\n\
			canBubble: true,\n\
			cancelable: true,\n\
			view: window, \n\
			keyIdentifier: 'Enter',\n\
			keyLocation: 0,\n\
			ctrlKey: false,\n\
			shiftKey: \n\
			false,\n\
			altKey: false,\n\
			metaKey: false,\n\
			altGraphKey: \n\
			false\n\
		};\n\
	//キーボードイベントを作成する\n\
	e.initKeyboardEvent(o.type, o.canBubble, o.cancelable, o.view,o.keyIdentifier, o.keyLocation, o.ctrlKey, o.shiftKey, o.altKey,o.metaKey, o.altGraphKey);\n\
	document.dispatchEvent(e); \n\
}\n\
/** マウスリピート本体 */\n\
function mouseRepeatDOWN(){\n\
	//Eventを作る\n\
	var e = document.createEvent('Event');\n\
	var event = reMouseEventDown;\n\
	//Touchイベントに変換\n\
	e = setEvent(event,'touchstart');\n\
	//イベントを発生させる\n\
	event.target.dispatchEvent(e);\n\
}\n\
\n\
\n\
/** マウスリピート本体 */\n\
function mouseRepeatUP(){\n\
	//Eventを作る\n\
	var e = document.createEvent('Event');\n\
	var event = reMouseEventUp;\n\
	//Touchイベントに変換\n\
	e = setEvent(event,'touchEnd');\n\
	//イベントを発生させる\n\
	event.target.dispatchEvent(e);\n\
}\n\
\n\
//イベントリスナーのセット\n\
document.addEventListener('mousedown',mouse2touch,false);\n\
document.addEventListener('mouseup',mouse2touch,false);\n\
document.addEventListener('mousemove',mouse2touch,false);\n\
document.addEventListener('keydown',mouse2touch,false);\n\
\n\
var myself = document.getElementById('ctouch_touch_js');\n\
if(myself)myself.parentNode.removeChild(myself);\n\
})();\n\
";
document.documentElement.appendChild(s);
