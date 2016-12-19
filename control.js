var space = 20
var cellWidth = 100
var newNum = -1
var newNum_i = -1
var newNum_j = -1
var init_nums = [2,4]
var colors = ["#eee4da","#ede0c8","#f7b179","#f59563","#f67c5f","#f65e3b","#edcf72","#edcc61","#ecc84e","#edc540","#e4c02c"]
var score = 0
window.onload = function(){
	var scoreDiv = document.getElementById("score")
	var canvas = document.getElementById("canvas")
	var ctx = canvas.getContext("2d")
	ctx.font = "bold 40px Microsoft YaHei"
	ctx.textAlign = "center"
	ctx.textBaseline = "middle"
	var cells = new Array();
	//初始化二维数组
	for(var i = 0; i < 4; i++){
		cells[i] = new Array()
		for(var j = 0; j < 4; j++){
			var cell = new Object()
			cell.num = 0
			cell.flag = false
			cells[i][j] = cell;
 		}

	}
	startGame()
	drawCells()
	//增加键盘监听事件
	document.onkeydown = function(event){
		event = window.event || event
		switch(event.keyCode){
			case 37:   //左键
			moveLeft()
			break
			case 38:   //上键
			moveUp()
			break
			case 39:  //右键
			moveRight()
			break
			case 40: //下键
			moveDown() 
		}
		if(isOver()){
			ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
			ctx.fillRect(0, 0, canvas.width, canvas.height)	
			ctx.fillStyle = "rgba(0, 0, 0, 0.6)"
			ctx.beginPath()
			ctx.moveTo(canvas.width/2, 0)
			ctx.lineTo(canvas.width/2, canvas.height)
			ctx.moveTo(0, canvas.height/2)
			ctx.lineTo(canvas.width, canvas.height/2)
			ctx.closePath()
			ctx.fillText("You lost !", canvas.width/2, canvas.height/2)
			document.onkeydown = null
		}		
	}
	//判断游戏是否结束
	function isOver(){
		//棋盘是否被填满
		for (var i = 0; i < cells.length; i++) {
			for (var j = 0; j < cells[i].length; j++) {
				if( !cells[i][j].flag ){
					return false
				}
			}
		}
		return true
	}

	/*移动控制*/
	function moveLeft(){
		//按下左键
		//判断给个单元所在行，每个行中的前一个被后一个覆盖
		//同时判断每一个行是否存在加分的可能
		//一次只能相加一次

		for (var i = 0; i < cells.length; i++) {
			loop:
			for (var j = cells[i].length-1; j >= 1; j--) {
				if(cells[i][j].flag){
					for(var k = j-1; k >= 0; k--){
						if(cells[i][k].flag && cells[i][k].num == cells[i][j].num){
							cells[i][k].num = 2*cells[i][k].num
							score += cells[i][k].num
							cells[i][j].num = 0
							cells[i][j].flag = false
							break loop
						}
					}
				}
			}
		}
		for (var i = 0; i < cells.length; i++) {
			for(var k = 0; k < cells.length-1; k++){
				for (var j = 1; j < cells[i].length; j++) {
					if(cells[i][j].flag){
						if(!cells[i][j-1].flag){
							cell = cells[i][j]
							cells[i][j] = cells[i][j-1]
							cells[i][j-1] = cell
						}
					}
				}
			}
			
		}
		scoreDiv.innerHTML = "Score: " + score
		createNewNum()
		drawCells()

	}
	function moveUp(){

		//按下上键
		for (var i = 0; i < cells.length; i++) {
			loop:
			for (var j = cells[i].length-1; j >= 1; j--) {
				if(cells[j][i].flag){
					for(var k = j-1; k >= 0; k--){
						if(cells[k][i].flag && cells[k][i].num == cells[j][i].num){
							cells[k][i].num = 2*cells[k][i].num
							cells[j][i].num = 0
							cells[j][i].flag = false
							break loop
						}
					}
				}
			}
		}
		for (var i = 0; i < cells.length; i++) {
			for(var k = 0; k < cells.length-1; k++){
				for (var j = 1; j < cells[i].length; j++) {
					if(cells[j][i].flag){
						if(!cells[j-1][i].flag){
							cell = cells[j][i]
							cells[j][i] = cells[j-1][i]
							cells[j-1][i] = cell
						}
					}
				}
		    }
	    }
	    scoreDiv.innerHTML = "Score: " + score
	    createNewNum()
		drawCells()
	}
	function moveRight(){
		//按下右键
		for (var i = 0; i < cells.length; i++) {
			loop:
			for (var j = 0; j < cells[i].length-1; j++) {
				if(cells[i][j].flag){
					for(var k = j+1; k < cells[i].length; k++){
						if(cells[i][k].flag && cells[i][k].num == cells[i][j].num){
							cells[i][k].num = 2*cells[i][k].num
							cells[i][j].num = 0
							cells[i][j].flag = false
							break loop
						}
					}
				}
			}
		}
		for (var i = 0; i < cells.length; i++) {
			for(var k = 0; k < cells.length-1; k++){
				for (var j = cells[i].length-2; j >= 0; j--) {
					if (cells[i][j].flag) {
						if(!cells[i][j+1].flag){
							cell = cells[i][j]
							cells[i][j] = cells[i][j+1]
							cells[i][j+1] = cell
						}
					}
				}
		    }
	    }
	    scoreDiv.innerHTML = "Score: " + score
	    createNewNum()
	    drawCells()
	}
	function moveDown(){
		//按下下键
		for (var i = 0; i < cells.length; i++) {
			loop:
			for (var j = 0; j < cells[i].length-1; j++) {
				if(cells[j][i].flag){
					for(var k = j+1; k < cells[i].length; k++){
						if(cells[k][i].flag && cells[k][i].num == cells[j][i].num){
							cells[k][i].num = 2*cells[k][i].num
							cells[j][i].num = 0
							cells[j][i].flag = false
							break loop
						}
					}
				}
			}
		}
		for (var i = 0; i < cells.length; i++) {
			for(var k = 0; k < cells.length-1; k++){
				for (var j = cells[i].length-2; j >= 0; j--) {
					if(cells[j][i].flag){
						if(!cells[j+1][i].flag){
							cell = cells[j][i]
							cells[j][i] = cells[j+1][i]
							cells[j+1][i] = cell
						}
					}
				}
		    }
	    }
	    scoreDiv.innerHTML = "Score: " + score
	    createNewNum()
	    drawCells()
	}


	// 开始游戏时，随机生成两个数字
	
	var r = 50
	//绘图方法
	function drawCells(){

		ctx.clearRect(0, 0, canvas.width, canvas.height)
		for (var i = 0; i < cells.length; i++) {
			for (var j = 0; j < cells.length; j++) {
				ctx.fillStyle = "#ccc0b3"
				ctx.fillRect(j*cellWidth + (j+1)*space, i*cellWidth + (i+1)*space,
					cellWidth, cellWidth)
				if (cells[i][j].flag && (i != newNum_i || j != newNum_j)) {
					// console.log(i + " " + newNum_i + " " + j + " " + newNum_j)
					ctx.fillStyle = getColor(cells[i][j].num)
					ctx.fillRect(j*cellWidth + (j+1)*space, i*cellWidth + (i+1)*space,
					cellWidth, cellWidth)
					//绘制数字,使数字居中
					ctx.beginPath()
					ctx.moveTo(j*cellWidth + (j+1)*space + cellWidth/2, 0)
					ctx.lineTo(j*cellWidth + (j+1)*space + cellWidth/2, canvas.height)
					ctx.moveTo(0, i*cellWidth + (i+1)*space + cellWidth/2)
					ctx.lineTo(canvas.width, i*cellWidth + (i+1)*space + cellWidth/2)
					ctx.closePath()
					ctx.fillStyle = "rgb(119, 110, 101)"
					ctx.fillText(cells[i][j].num, j*cellWidth + (j+1)*space + cellWidth/2, 
						 i*cellWidth + (i+1)*space + cellWidth/2)
				}
			}
		}
		if(newNum_i == -1 || newNum_j == -1) return
		var drawNew = setInterval(function(){
			ctx.fillStyle = getColor(cells[newNum_i][newNum_j].num)
			ctx.fillRect(newNum_j*cellWidth + (newNum_j+1)*space + r, newNum_i*cellWidth + (newNum_i+1)*space + r,
			cellWidth - 2*r, cellWidth - 2*r)
			//绘制数字,使数字居中
			ctx.beginPath()
			ctx.moveTo(newNum_j*cellWidth + (newNum_j+1)*space + cellWidth/2, 0)
			ctx.lineTo(newNum_j*cellWidth + (newNum_j+1)*space + cellWidth/2, canvas.height)
			ctx.moveTo(0, newNum_i*cellWidth + (newNum_i+1)*space + cellWidth/2)
			ctx.lineTo(canvas.width, newNum_i*cellWidth + (newNum_i+1)*space + cellWidth/2)
			ctx.closePath()
			ctx.fillStyle = "rgb(119, 110, 101)"
			ctx.fillText(cells[newNum_i][newNum_j].num, newNum_j*cellWidth + (newNum_j+1)*space + cellWidth/2, 
				newNum_i*cellWidth + (newNum_i+1)*space + cellWidth/2)
			r -= 5
			if( r < 0){
				clearInterval(drawNew)
				r = 50
			}
						
		}, 20)
	}
	// 开始游戏时，随机生成两个数字
	function startGame(){
		var num1 = init_nums[Math.round(Math.random())]  // 第一个随机数
		var num2 = init_nums[Math.round(Math.random())]  //第二个随机数
		var num1_i = Math.round(Math.random()*3)
		var num1_j = Math.round(Math.random()*3)
		do{
			var num2_i = Math.round(Math.random()*3)
			var num2_j = Math.round(Math.random()*3)
		}
		while(num2_i == num1_i && num2_j == num1_j)
		//向二维数组中添加num1
		cells[num1_i][num1_j].num = num1
		cells[num1_i][num1_j].flag = true
		cells[num2_i][num2_j].num = num2
		cells[num2_i][num2_j].flag = true
	}

	function createNewNum(){
		//生成新的数字
		//检测当前cells中已被占的位置
		do{
			newNum = init_nums[Math.round(Math.random())]  
			newNum_i = Math.round(Math.random()*3)
			newNum_j = Math.round(Math.random()*3)
		}
		while(isNew(newNum_i, newNum_j))
		//将得到的新数字添加进cells中
	    cells[newNum_i][newNum_j].flag =true
	    cells[newNum_i][newNum_j].num = newNum
	    return newNum


	}
    function isNew(newNum_i, newNum_j){
    	for (var i = 0; i < cells.length; i++) {
    		for (var j = 0; j < cells[i].length; j++) {
    			if(cells[i][j].flag){
    				if(i == newNum_i && j == newNum_j)
    					return true
    			}
    		}
    	}
    	return false
    }

    function getColor(amount){
    	var val = 0
    	while(amount/2 != 1){
    		val++
    		amount = amount/2
    	}
    	return colors[val]
    }
}