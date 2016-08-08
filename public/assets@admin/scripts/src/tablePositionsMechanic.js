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