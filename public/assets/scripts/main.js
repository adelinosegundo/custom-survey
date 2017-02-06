(function() {
    var clickable = {
        elements: document.querySelectorAll('[data-href]'),

        redirect_to: function(href, target) {
            target = target || "";
            clickable.simulate_anchor(href, target);
        },

        simulate_anchor: function(href, target) {
            var anchor = document.createElement("a");
            anchor.setAttribute('href', href);
            anchor.setAttribute('target', target);
            anchor.click();
        },

        init: function() {
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i];
                element.style.cursor = 'pointer';
                element.addEventListener('click', function() {
                    if ($(this).attr('data-target') == "_blank") {
                        var win = window.open($(this).attr('data-href'), '_blank');
                        win.focus();
                    } else {
                        window.location = $(this).attr('data-href');
                    }
                    // clickable.redirect_to(
                    //     this.getAttribute('data-href'),
                    //     this.getAttribute('data-target')
                    // );
                }, false);
            }
        }
    };

    clickable.init();
})();

/*
 *
 * Document ready
 * --------------------------------*/

$(document).ready(function(){
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




function survey_ready(){
  rearrage();
  cocoon_after_insert_question();
}

function cocoon_after_insert_question(){
  $('#items').on('cocoon:after-insert', function(e, insertedItem) {
    re_order();
    var new_sequence = $('#items > div').size();
    var new_id = "alternatives"+new_sequence;
    var add_link = insertedItem.find("#add_alternative");
    var alternatives_container = insertedItem.find("#alternatives");
    add_link.attr("data-association-insertion-node", "#"+new_id);
    alternatives_container.prop('id', new_id);
  });
}

function re_order(){
  var items = $('#items > div');
  items.each(function(index, question){
    var sequence_input = $(this).find('input[name*=sequence]');
    sequence_input.val(index+1);
  })
}

function rearrage(){
  var items = $('#items > div');
  items.sort(function (a, b) {
      console.log(a);
      var sequence_input_a = $(a).find('input[name*=sequence]');
      var sequence_input_b = $(b).find('input[name*=sequence]');
      return parseInt(sequence_input_a.val()) > parseInt(sequence_input_b.val());
  }).each(function () {
      var elem = $(this);
      elem.remove();
      elem.appendTo("#items");
  });
}

$(document).ready(survey_ready)
$(document).on('page:load', survey_ready)

jQuery.extend(jQuery.validator.messages, {
    required: "Este campo é de preenchimento obrigatório.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});