$(document).ready(function() {
	$('.input-daterange').datepicker({
		format: 'dd/mm/yyyy',
	    keyboardNavigation: false,
	    forceParse: false,
	    autoclose: true
	});
	
	$('.date').datepicker({
		format: 'dd/mm/yyyy',
	    todayBtn: "linked",
	    keyboardNavigation: false,
	    forceParse: false,
	    calendarWeeks: true,
	    autoclose: true
	});
})