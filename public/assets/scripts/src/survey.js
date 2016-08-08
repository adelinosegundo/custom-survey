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
