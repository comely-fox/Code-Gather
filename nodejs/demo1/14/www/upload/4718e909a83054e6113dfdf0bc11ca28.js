   var ul=document.getElementById("main");
   var ol=document.getElementById("ol");
   var body=document.getElementById("body");
   var content=document.getElementById("content");
   var box40=document.getElementById("box40");
   var box4=document.getElementById("box41");
   var photo11=document.getElementById("photo11");
   var photo20=document.getElementById("photo20");
   var photo12=document.getElementById("photo12");
   var photo21=document.getElementById("photo21");
   var left=document.getElementById('left');
   var right=document.getElementById('right');
   var oul=document.getElementById('ol31');
   var num=0;
   var aNum0=content.children;
   var ulis=ul.children;
   var olis=ol.children;
   var position=0,target=0,time=0;
   var aNum1=['url(images/1.jpg)','url(images/2.jpg)','url(images/3.jpg)','url(images/p4-bck1.jpg)','url(images/5.jpg)'];
  for(var i=0;i<ulis.length;i++){//  整屏滑动
  	  ulis[i].style.backgroundImage=aNum1[i]; 
  	  olis[i].index=i;
      switch(i){
             case 3: 
          photo11.onclick=function(){
            photo11.style.opacity='1';
            photo12.style.backgroundColor='#d37425';
            photo20.style.opacity='0.2';
            photo21.style.backgroundColor='#272016';
            box40.style.backgroundImage='url(images/p4-bck1.jpg)'

         }
          photo20.onclick=function(){
            photo21.style.backgroundColor='#d37425';
            photo11.style.opacity='0.2';
            photo12.style.backgroundColor='#272016';
            photo20.style.opacity='1';
            photo21.style.opacity='1';
            box40.style.backgroundImage='url(images/4.jpg)'
         }  
      }
  	  olis[i].onclick=function(){
  	  	clearInterval(time);//清除定时器
  	  	ulis[this.index].style.backgroundImage=aNum1[i]; //确定背景图片
  	  	target=ulis[this.index].offsetTop;//取到点击图片到顶部的距离
          for (var j = 0; j < olis.length; j++) {
                olis[j].className="";
                }
                this.className = "red";
         time = setInterval(function(){//缓动效果
         	position=position+(target-position)/10;
         	// if(target-position<1){//自我感觉加入后反而不能滑动了
         	// 	clearInterval(time);
         	// }
         	ul.style.top=-position+'px';
         },30)
 	   }
      }
     for(var j=1;j<aNum0.length;j++){//标题栏的背景下划线
     	aNum0[j].index=j;
     	aNum0[j].onmouseover=function(){//鼠标移入标题栏加背景下划线
     		aNum0[this.index].style.backgroundImage='url(images/下划线.png)';
     		
     	}
     	aNum0[j].onmouseout=function(){//鼠标移出背景图清除下划线
     	    aNum0[this.index].style.backgroundImage=''
        }
     }

left.onclick=function(){
     num=num-315;
     num<=-630 ? num = 0 : num;
   oul.style.left=num+'px';
}
 right.onclick=function(){
     num=num+315;
    num>=630 ? num = 0 : num;
    oul.style.left=-num+'px';
  }
  