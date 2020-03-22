(function(win,$){
	//生成最初的n*n个模块
	function Grid(row,col){
		this.row = row;
		this.col = col;
		this.data = new Array(row);
		for(var i=0;i<this.col;i++){
			this.data[i] = new Array(col);
		}
	};
	//借用原生的jq中的extend方法，相当于在Gird中静态添加方法
	$.extend.call(Grid,{
		formatString:function(str,data){
			return str.replace(/{{(\w+)}}/g,function(match,key){
	           return data[key]; // 替换掉原型top 值
		    })
		}
	});
	function NumCell(x,y,num){
		this.x = x;
		this.y = y;
		this.num = num;
	};
	$.extend.call(NumCell,{
		getBackgroundColor:function(number) {
		    switch (number) {
		    case 2:
		        return "#eee4da";
		        break;
		    case 4:
		        return "#eee4da";
		        break;
		    case 8:
		        return "#f26179";
		        break;
		    case 16:
		        return "#f59563";
		        break;
		    case 32:
		        return "#f67c5f";
		        break;
		    case 64:
		        return "#f65e36";
		        break;
		    case 128:
		        return "#edcf72";
		        break;
		    case 256:
		        return "#edcc61";
		        break;
		    case 512:
		        return "#9c0";
		        break;
		    case 1024:
		        return "#3365a5";
		        break;
		    case 2048:
		        return "#09c";
		        break;
		    case 4096:
		        return "#a6bc";
		        break;
		    case 8192:
		        return "#93c";
		        break;
		    }
		    return "black";
		},
		getColor:function(number) {
		    return number <= 4 ? "#776e65" : "white";
		}
	});
	NumCell.prototype = {
		constructor:NumCell,
		show:function(){
			var numberCell = $('<div class=number-cell></div>');
			   numberCell.css("background-color", NumCell.getBackgroundColor(this.num));
			    numberCell.css("color",NumCell.getColor(this.num));
			    numberCell.text(this.num);
			    numberCell.css({"top":20+120*this.y,"left":20+120*this.x}).attr("id",'NC'+this.x+this.y).hide();
			    console.log({"top":20+120*this.y,"left":20+120*this.x},[this.x,this.y])
			    $('.grid').append(numberCell);
			    numberCell.show(300); //  一个显示动画
		},
		doMoveAnimation:function(tox, toy,flag){
			var that = this;
			var $dom = $("#NC"+this.x+this.y);
    		$dom.animate({top:tox*120+20,left:toy*120+20},300,function(){
    			if(flag){
    				//只是位置移动
    				$dom.attr("id","NC"+ tox+toy);
    				that.x = tox;
    				that.y = toy;
    			}else{
    				// 格子合并
    				var $target = $("#NC"+tox+toy);
    				var newVal = $target.text()*2;
    				$target.css("background-color", NumCell.getBackgroundColor(newVal));
			    	$target.css("color", NumCell.getColor(newVal));
    				$target.text(newVal);
    				$dom.remove();
    			}
    		});
		}
	};
	Grid.prototype = {
		constructor:Grid,
	     init:function(){
             $('.grid').css({width:(this.row*120-20),height:(this.col*120-20)})
			var str = "";
			for(var i=0;i<this.row;i++){
				for(var j=0;j<this.col;j++){
					str += '<div class="gird-cell" style="top:'+(20+120*i)+'px;left:'+(20+120*j)+'px"></div>';
					// str += Grid.formatString(tmp,{top:20+120*i,left:20+120*j});

				}
			}
			$('.grid').html(str); // 生成需要用的2048棋盘 往div.grid插入数据
			this.getRandomNumber();
			//this.getRandomNumber()
		},
		hasSpace:function(){
			for(var i=0;i<this.row;i++){
				for(var j=0;j<this.col;j++){
					if(this.data[i][j]==undefined){
						return true;
					}
				}
			}
			return false;
		},
		//随机生成一个number-cell
		getRandomNumber:function(){
			if(!this.hasSpace()){
				return false;
			}
			var randx = Math.floor(Math.random()*4); // 生成x坐标
			var randy = Math.floor(Math.random()*4); // 生成y坐标
			while(true){
				if(this.data[randx][randy]==undefined){
                     break;
				}
				// console.log(this.data[randx][randy])
				randx =  Math.floor(Math.random()*4);
				randy =  Math.floor(Math.random()*4);
			}
			//随机生成一个数字
			var randNumber  = Math.random()<=0.5?2:4;
			var numcell = new NumCell(randx,randy,randNumber); // 生成对象
			this.data[randx][randy] = numcell; // 保存对象
			numcell.show();
			return true;
		},
		randomOneWithDelay:function(obj){
		    setTimeout(function(){
                obj.getRandomNumber();//每次新增一个数字就可能出现游戏结束
                obj.isgameover();//300毫秒
		    },300);
		},
		//判断水平方向，col1到col2间是否有其他的障碍物
		noBlockHorizontal:function(row,col1,col2){
			for(var i=col1+1;i<col2;i++){
				if(this.data[row][i]!=undefined){
					return false;
				}
			}
			return true;
		},
		//判断垂直方向，row1到row2间是否有其他的障碍物
		noBlockVertical:function(col,row1,row2){
             for(var i=row1+1;i<row2;i++){
             	if(this.data[i][col]!=undefined){
             		return false;
             	}
             	return true;
             }
		},
		canMoveLeft: function(){
    		for(var i = 0;i<this.row;i++){
        		for(var j = 1;j<this.col;j++){
	            	if( this.data[i][j]){
	                	if( this.data[i][j-1] == undefined || this.data[i][j-1].num == this.data[i][j].num)
	                		console.log(this.data[i][j-1],this.data[i][j])
	                    return true;
	            	}
        		}
    		}  
    		return false;
		},
		moveLeft:function(){ 
		    //判断格子是否能够向左移动
		    if( !this.canMoveLeft()){
		        return false;
		    }

		    //真正的moveLeft函数
		    for(var i = 0;i<this.row;i++){
		        for(var j = 1;j<this.col;j++){//第一列的数字不可能向左移动
		            if(this.data[i][j] != undefined){
		                //(i,j)左侧的元素
		                for(var k = 0;k<j;k++){
		                    //落脚位置的是否为空 && 中间没有障碍物
		                    // console.log([i][k])
		                    if(this.data[i][k] == undefined && this.noBlockHorizontal(i , k, j)){
		                        //move
		                        // showMoveAnimation(i, j,i,k);
		                        var numCell = this.data[i][j];
		                        numCell.doMoveAnimation(i,k,true);
		                        this.data[i][k] = numCell;
		                        this.data[i][j] = null;
		                        break;
		                    }
		                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
		                    else if(this.data[i][k].num == this.data[i][j].num && this.noBlockHorizontal(i , k, j)){
		                        //move
		                        var numCell = this.data[i][j];
		                        numCell.doMoveAnimation(i,k,false);
		                        this.data[i][k].num += this.data[i][j].num;
		                        this.data[i][j] = null;
		                        break;
		                    }
		                }
		            }
		        }
		    }
		    // setTimeout("updateBoardView()",200);
		    return true;
		},
		nomove:function(){
		    if(this.canMoveLeft() || this.canMoveRight() || this.canMoveUp() || this.canMoveDown())
		        return false;
		    return true;
		},
		isgameover:function(){
		    if(!this.hasSpace()&&this.nomove())
		    {
		    	alert("Game Over");
		    }    
		}

	};
	$(document).ready(function(){
		var grid = new Grid(4,4);
		grid.init();
		$(document.body).on('keydown',function(event){
			switch(event.keyCode){
				case 37://left左移动
					if(grid.moveLeft()){
				           grid.randomOneWithDelay(grid);
				        }
				        break;
			}
           
		 })
	});
})(window,$)