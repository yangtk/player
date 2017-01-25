// 公共函数
function toggle(obj,className){

    var CN = obj.className;
    var arr = CN.split(' ');

    for(var i=0; i<arr.length; i++){

        if(arr[i]==className){
            arr.splice(i,1);
            obj.className = arr.join();
        }
        else{
            obj.className += ' ' + className;
        }
    }
}
function trueFalse(state,fun1,fun2){
    state? fun1() : fun2();
    return state = !state;
}

// 1秒 => 01                     toDoubleDigit变两位数
function toDD(num){
    return num<10? "0"+num : ""+num;
}
// 2.2秒 => 00:02
function toTime(num){
    var min = Math.floor(num/60);
    var sec = Math.floor(num%60);
    return toDD(min) +":"+ toDD(sec);
}

//公共变量
var oA = document.getElementById('audio1')  //mp3
var aCtrls = document.querySelectorAll('.control span') //五个按钮
var oNeedle = document.querySelector('.needle')
var oDisk = document.querySelector('.disk')
var oTotalTime = document.querySelector('.total-time')
var oCurrentTime = document.querySelector('.currentTime')
var oBtnCur = document.querySelector('.btn-cur')
var oProgress = document.querySelector('.progress-cur')
// 补充
var oProgressWidth = document.querySelector('.progress-bar')
var player = { // 播放器对象
    onOff : true,
    total_Time : 0,
    curTime : 0,
}

player.switchPlay = function(){

    player.onOff = trueFalse(player.onOff,player.play,player.pause);    
}

player.play = function(){
    oA.play();
    player.getCurTime();
    player.progress();
}

player.pause = function(){
    oA.pause();
    player.pauseCurTime();
    player.pauseProgress();
}

player.totalTime = function(){    //console.log(oA.duration); console.log( toTime(player.total_Time = oA.duration) );

    var timer = setInterval(function(){  //处理防止载入时候duration报错NaN

        if(!isNaN(oA.duration)){   
            oTotalTime.innerHTML = toTime(oA.duration);
            clearInterval(timer);
        }

    },100)

}

player.getCurTime = function(){

    player.getCurTime_timer = setInterval(function(){                             //console.log('当前时间定时器')//播放时执行暂停结束
        oCurrentTime.innerHTML = toTime(player.curTime = oA.currentTime);

    },1000)   
}

player.pauseCurTime = function(){
    clearInterval(player.getCurTime_timer);
}

player.progress = function(){ 

    this.progress_timer = setInterval(function(){ 
                                                        
        oProgress.style.width = player.curTime/oA.duration*100 +'%';  //进度条宽度 = （当前时间 / 总时间）% ;
    },1000)

}

player.pauseProgress = function(){
    clearInterval(this.progress_timer);
}

player.drag = function(){

}


// 初始化
player.init = function(){
    player.totalTime();
    // oCurrentTime.innerHTML = player.currentTime();
}
window.onload = function(){
    player.init();
    
}

// -------按钮-------
aCtrls[1].onclick = function(){alert(2)
    clearInterval(player.timer);
}
//播放按钮
aCtrls[2].onclick = function(){

    player.switchPlay();    
    toggle(this,'on');
    toggle(oNeedle,'in');
    toggle(oDisk,'rotate');    

}

//-----拖拽----
oBtnCur.onmousedown = function(ev){

    var oEvent = event || ev;
    disX = oEvent.clientX - this.offsetLeft;

    document.onmousemove = function(ev){

        var oEvent = event || ev;
        var tar = oEvent.clientX - disX;
        var oWidth = oProgressWidth.offsetWidth;
        tar>oWidth-7&&(tar=oWidth-7);              //7来自于小圆形按钮宽度一半。
        tar<-7&&(tar=-7);

        oBtnCur.style.left = tar + 'px';
        oProgress.style.width = (tar+7)/oWidth*100 + '%';  // 一下要整理啦
        // console.log(player.total_Time);
        // console.log( Number((tar+7)/oWidth*100));
        // console.log( oA.duration);
        // console.log(Number((tar+7)/oWidth*100)*oA.duration/100);  // 怎么样获得总时长？ 存起来，还有总时长的bug是啥？
        oA.currentTime = Number((tar+7)/oWidth*100)*oA.duration/100;
        oA.pause();// end 一下要整理啦
    }
    document.onmouseup = function(){
        oA.play();// 包括这个？ 要整理啦
        document.onmousemove = document.onmouseup = null;
    }
    return false;
}





















