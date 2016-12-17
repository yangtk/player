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

//公共变量
var oA = document.getElementById('audio1')  //mp3
var aCtrls = document.querySelectorAll('.control span') //五个按钮
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
    // oDisk.style.WebkitAnimationPlayState="running";
}


// -------按钮-------
aCtrls[2].onclick = function(){

    player.play();
    toggle(this,'on');

}


