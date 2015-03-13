$(document).ready(function() {

	$('.modal-trigger').leanModal();
	$('select').material_select();
	$('.dropdown-button').dropdown({
		inDuration: 300,
		outDuration: 225,
		hover: false, // Activate on click
		alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
		gutter: 0, // Spacing from edge
		belowOrigin: false // Displays dropdown below the button
	});
});