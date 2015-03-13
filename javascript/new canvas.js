$(document).ready(function(){

	$("#canvas").attr("width", $("#canvas").parent().css("width"));
	$("#canvas").attr("height", $("#canvas").parent().css("height"));	


	var shown = false;
    var context = canvas.getContext('2d');  
    var sketch = document.querySelector('#canvas');
    var sketch_style = getComputedStyle(sketch);
    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0}; 
	var isPainting = false;
	var onEraser = false;
    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    context.lineWidth = 5;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.strokeStyle = 'black';       
	
    // canvas.addEventListener('mousedown', function(e) {
        // canvas.addEventListener('mousemove', onPaint, false);
    // }, false);

    // canvas.addEventListener('mouseup', function() {
        // canvas.removeEventListener('mousemove', onPaint, false);
    // }, false);

    function onPaint() {
        context.beginPath();
        context.moveTo(last_mouse.x, last_mouse.y);
        context.lineTo(mouse.x, mouse.y);
        context.closePath();
        context.stroke();
    };

	$(window).mousemove(function(e){
		if ( e.pageX <=2 && !shown) { 
			$('.button-collapse').sideNav('show'); shown = true;
		}
		else if($("#slide-out").css("left") == "-310px")
			shown = false;
		if(isPainting && !onEraser){
			onPaint();
		}
		else if(isPainting && onEraser) {
			onErase();
		}
	});
	
	$('#canvas').mousedown(function(e){
		isPainting = true;
	});


	$('#canvas').mouseup(function(e){
		isPainting = false;
	});

	$('#canvas').mouseleave(function(e){
		isPainting = false;
	});
	
	 function onErase() {
		console.log(last_mouse.x - (context.lineWidth/2.0) +" " + last_mouse.x);
        context.clearRect(last_mouse.x - (context.lineWidth/2.0),last_mouse.y - (context.lineWidth/2.0),context.lineWidth,context.lineWidth);
    }
	$("#erasertool").click(function sayhi(){
		onEraser = true;
        // canvas.addEventListener('mousedown', function(e) {
			// canvas.addEventListener('mousemove', onPaint, false);
		// }, false);

		// canvas.addEventListener('mouseup', function() {
			// canvas.removeEventListener('mousemove', onPaint, false);
		// }, false);
		
		
		
		// canvas.addEventListener('mousedown', function(e) {
            // canvas.addEventListener('mousemove', onErase, false);
        // }, false);

        // canvas.addEventListener('mouseup', function() {
            // canvas.removeEventListener(null, null, false);
        // }, false);

	});
	
	$("#brushtool").click(function sayhi(){
		onEraser = false;
	});

	initui(context);
});

function initui(context){

	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 225,

		hover: false, // Activate on click
		alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
		gutter: 0, // Spacing from edge
		belowOrigin: false // Displays dropdown below the button
		}
	);
	$('#picker').colpick({
		flat:true,
		layout:'hex',
		submit:0,
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			context.strokeStyle = '#'+hex;
		}
	});
	$('.button-collapse').sideNav({
		menuWidth: 300, // Default is 240
		edge: 'left', // Choose the horizontal origin
		closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
	});

	$("#slider").on('change', function(){
		context.lineWidth = $('#slider').val();
	});	
}