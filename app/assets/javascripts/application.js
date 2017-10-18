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
//= require ckeditor/init
//= require_tree .


function ready(){
  cocoon_after_insert_question();
}

$(document).ready(ready)
$(document).on('page:load', ready)

function cocoon_after_insert_question(){
  $(document).on('cocoon:after-insert', function(e, insertedItem) {
    re_order();
  });
}

function re_order(){
  var items = $('.items > div');
  items.each(function(index, question){
    var order_input = $(this).find('input[name*=sequence]');
    order_input.val(index+1);
  })
}

void function($) {
    $.fn.cousins = function(selector) {
        return this.parent().siblings().children(selector);
        //         ^ parent ^ uncles   ^ cousins
    };
}(jQuery);
