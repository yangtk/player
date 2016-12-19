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
function addZero(num){
    return num<10?"0" + num:""+num;
}

//公共变量
var oA = document.getElementById('audio1')  //mp3
var aCtrls = document.querySelectorAll('.control span') //五个按钮
var oNeedle = document.querySelector('.needle')
var oDisk = document.querySelector('.disk')
var oTotalTime = document.querySelector('.total-time')
var oCurrentTime = document.querySelector('.currentTime')
var onOff = true;

var player = { // 播放器对象

}

player.play = function(){

    if(onOff){
        oA.play();
    }
    else{
        oA.pause();
    }
    onOff = !onOff
}

player.totalTime = function(){

    var min = Math.floor(oA.duration/60);
    var sec = Math.floor(oA.duration%60);
    return addZero(min) +":"+addZero(sec);
}
player.currentTime = function(){
    return oA.currentTime;
}

player.init = function(){
    oTotalTime.innerHTML = player.totalTime();
    oCurrentTime.innerHTML = player.currentTime();
}

window.onload = function(){
    player.init();
}

// -------按钮-------
//播放按钮
aCtrls[2].onclick = function(){

    player.play();
    toggle(this,'on');
    toggle(oNeedle,'in');
    toggle(oDisk,'rotate');    

}



