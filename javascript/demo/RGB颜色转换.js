<script>

// 生成十六进制颜色
var getRandomColor = function(){    

  return  '#' +    
    (function(color){    
    return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])    
      && (color.length == 6) ?  color : arguments.callee(color);    
  })('');    
} 

var b 
function generateColor( color = '' ) {
	
	var string = '0123456789abcdef';
	var index = Math.random() * 16 | 0;
	var once = string.charAt( index );

	
	return ( color += once ).length === 6 ? ( '#' + color ) : generateColor( color );
}
function generateColor(  ) {
	return '#' + ( ( Math.random() * 0x1000000 | 0 ).toString(16) + '000000').substring(0, 6);
}




//十六进制颜色值域RGB格式颜色值之间的相互转换
 
//-------------------------------------
//十六进制颜色值的正则表达式
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
/*RGB颜色转换为16进制*/
String.prototype.colorHex = function(){
	var that = this;
	if(/^(rgb|RGB)/.test(that)){
	
		// 把rgb,(,),RGB,' '清除掉再分割成数组 例:[ 123, 21, 223 ]
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");

		var strHex = "#"; // 十六进制
		
		for(var i=0; i<aColor.length; i++){
			var hex = Number(aColor[i]).toString(16);
			console.log( hex)
			
			// 十六进制满16的时候十位上才有数不然没有
			if(aColor[i] < 16){
				hex = '0' + hex;	
			}
			strHex += hex;
		}
		if(strHex.length !== 7){
			strHex = that;	
		}
		return strHex;
	}
	// 16进制缩写或全写
	else if(reg.test(that)){
		var aNum = that.replace(/#/,"").split("");
		if(aNum.length === 6){
			return that;	
		}
		// 缩写#fff
		else if(aNum.length === 3){
			var numHex = "#";
			for(var i=0; i<aNum.length; i+=1){
			
				// 填充成六位
				numHex += (aNum[i]+aNum[i]);
			}
			return numHex;
		}
	}
	
	// 并不是rgb或者16进制写法
	else{
		return that;	
	}
};
 
//-------------------------------------------------
 
/*16进制颜色转为RGB格式*/
String.prototype.colorRgb = function(){
	var sColor = this.toLowerCase();
	if(sColor && reg.test(sColor)){
	
		// 缩小
		if(sColor.length === 4){
			var sColorNew = "#";
			for(var i=1; i<4; i+=1){
				sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));	
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for(var i=1; i<7; i+=2){
			sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));	
		}
		return "RGB(" + sColorChange.join(",") + ")";
	}else{
		return sColor;	
	}
};

var sRgb = "RGB(255, 255, 255)" , sHex = "#00538b";
var sHexColor = sRgb.colorHex();//转换为十六进制方法

</script>