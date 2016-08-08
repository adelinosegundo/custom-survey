$('.check-all-input').change(function(){
    input = $(this);
    container = input.closest('.check-all-container');
    if (input.prop("checked")) {
        container.find("input[type='checkbox']").prop("checked", true);
    } else {
        container.find("input[type='checkbox']").prop("checked", false);
    }
});

$('.check-all-container input[type="checkbox"]').not('.check-all-input').change(function(){
    input = $(this);
    container = input.closest('.check-all-container');
    input_check_all = container.find('.check-all-input');
    if (input_check_all.prop("checked")) { input_check_all.prop("checked", false) };
});