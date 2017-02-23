/*
 *
 * Document ready
 * --------------------------------*/

$(document).ready(function(){
    $("#edit_survey").steps({
        bodyTag: "fieldset",
        forceMoveForward: false,
        enableCancelButton: false,
        onStepChanging: function (event, currentIndex, newIndex) {
            if (currentIndex > newIndex) {
                return true;
            }
            var form = $(this);
            if (currentIndex < newIndex) {
                $(".body:eq(" + newIndex + ") label.error", form).remove();
                $(".body:eq(" + newIndex + ") .error", form).removeClass("error");
            }
            form.validate().settings.ignore = ":disabled,:hidden";
            return form.valid();
        },
        onStepChanged: function (event, currentIndex, priorIndex) {
            if (currentIndex === 2 && priorIndex === 3) {
                $(this).steps("previous");
            }
        },
        onFinishing: function (event, currentIndex) {
            var form = $(this);
            form.validate().settings.ignore = ":disabled";
            return form.valid();
        },
        onFinished: function (event, currentIndex) {
            var form = $(this);
            form.submit();
        } 
    }).validate({
        errorPlacement: function (error, element) {
            element.before(error);
        },
        rules: {
            confirm: {
                equalTo: "#password"
            }
        }
    });
    var config = {
        '.chosen-select'           : {width:"inherit"},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
});

$(document).on('click', '[data-order-the-table]', function(){
	ordenator = $(this);
	value = ordenator.attr('data-order-the-table');

	$('[data-order-the-table]').removeClass("active");
	ordenator.addClass("active");

	$('[data-pos-' + value + ']').each(function(index) {
		$(this).html($(this).attr('data-pos-' + value));
	});
});

$(document).on('click', '.pagination a', function(){
	ordenator = $('[data-order-the-table].active');

	if (ordenator.length) {
		value = ordenator.attr('data-order-the-table');

		$('[data-pos-' + value + ']').each(function(index) {
			$(this).html($(this).attr('data-pos-' + value));
		});
	}
});



