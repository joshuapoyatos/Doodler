$(document).ready(function(){
	
	var tools = [0,0,0,0,0,0];
	
	
	$("#canvas").attr("width", $("#canvas").parent().css("width"));
	$("#canvas").attr("height", $("#canvas").parent().css("height"));	
	var context = document.getElementById('canvas').getContext("2d");
	var clickX = new Array();
	var clickY = new Array();
	var clickDrag = new Array();
	var paint;
	
	function addClick(x, y, dragging)
	{
	  clickX.push(x);
	  clickY.push(y);
	  clickDrag.push(dragging);
	}
	function redraw(){
	  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
	  
	  context.strokeStyle = "#df4b26";
	  context.lineJoin = "round";
	  context.lineWidth = 5;

	  for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
		if(clickDrag[i] && i){
		  context.moveTo(clickX[i-1], clickY[i-1]);
		 }else{
		   context.moveTo((clickX[i]-1), clickY[i]);
		 }
		 context.lineTo(clickX[i], clickY[i]);
		 context.closePath();
		 context.stroke();
	  }
	}
	$('#canvas').mousedown(function(e){
	  var mouseX = e.pageX - $( "#canvas").offset().left;
	  var mouseY = e.pageY - $( "#canvas").offset().top;
			
	  paint = true;
	  addClick(e.pageX - $( "#canvas").offset().left, e.pageY - $( "#canvas").offset().top);
	  redraw();
	});

	$('#canvas').mousemove(function(e){
	  if(paint){
		addClick(e.pageX - $( "#canvas").offset().left, e.pageY - $( "#canvas").offset().top, true);
		redraw();
	  }
	});
	$('#canvas').mouseup(function(e){
	  paint = false;
	});

	$('#canvas').mouseleave(function(e){
	  paint = false;
	});
	
	
	$('.grow img').mousedown(function(e){
		if(tools[$(this).parent().index()] == 0){
			$(this).css({"transition": "all 0.3s ease-in-out", "transform": "scale(1.2)"});
			tools[$(this).parent().index()] = 1;
			console.log(tools);
		}
		else{
			$(this).css({"transition": "all 0.3s ease-in-out", "transform": "scale(1)"});
			tools[$(this).parent().index()] = 0;
		}
	});
	
});