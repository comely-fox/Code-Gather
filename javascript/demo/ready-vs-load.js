show('观察脚本加载的顺序')

document.addEventListener("DOMContentLoaded", function() {
    show('DOMContentLoaded回调')
}, false);

window.addEventListener("load", function() {
    show('load事件回调')
}, false);


show('脚本解析一')

//测试加载
$(function(){
    show('脚本解析二')
})

show('脚本解析三')

