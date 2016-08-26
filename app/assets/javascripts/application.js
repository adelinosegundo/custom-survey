// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery_ujs
//= require cocoon
//= require_tree .


function ready(){
  cocoon_after_insert_question();
}

$(document).ready(ready)
$(document).on('page:load', ready)

function cocoon_after_insert_question(){
  $('#items').on('cocoon:after-insert', function(e, insertedItem) {
    re_order();
    var new_order = $('#items > div').size();
    var new_id = "alternatives"+new_order;
    var add_link = insertedItem.find("#add_alternative");
    var alternatives_container = insertedItem.find("#alternatives");
    add_link.attr("data-association-insertion-node", "#"+new_id);
    alternatives_container.prop('id', new_id);
  });
}

function re_order(){
  var items = $('#items > div');
  items.each(function(index, question){
    var order_input = $(this).find('input[name*=sequence]');
    order_input.val(index+1);
  })
}