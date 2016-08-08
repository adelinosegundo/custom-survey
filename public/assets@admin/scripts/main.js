var isMobile = false; //initiate as false

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

if(window.matchMedia("only screen and (max-width: 760px)").matches) isMobile = true;

/*
 * Scroll To
 *
 * When a 'data-scroll-to' element is
 * activated (by click), scroll page to
 * his element.
 *
 * data-scroll-to="#<id>"
 * data-offset="<offset>"
 * data-time="<time>"
 *
 * ------------------------------ */

var scrollTo = function(target, diff) {
  diff = diff || 0;

  scope = $('html, body');

  scope.animate({
    scrollTop: target.offset().top - diff
  }, 500);

}

 $(document).ready(function(ev){
   $('[data-scroll-to]').css('cursor', 'pointer');
 });

 $(document).on('click', '[data-scroll-to]', function(ev) {
  ev.preventDefault();

  var target = $($(this).attr('data-scroll-to'));
  var diff = $(this).attr('data-scroll-diff');

  if (!diff) {
    diff = 0;
  }

  if ( $(this).closest('.fixed-navbar').length > 0 ) {
    diff = 94;
  }

  scrollTo(target, diff);
});

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
checkUrl = function(slug) {
    var url = location.href;
    var regex = '^(http[s]?\:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-\_\:]+(\/)?' + slug + '(\#)?(\/)?$';
    if (url.match(new RegExp(regex))) { return true; } else { return false; };
}
engineGraphs = function(graph, resource, title, categories, xAxisText, yAxisText, sufix) {
    if (graph.length) {
        data = [];
        sufix = sufix || ' aluno(s)';
        xAxisText = xAxisText || 'Porcentagens de Acertos';
        yAxisText = yAxisText || 'Quantidade de Alunos';
        categories = categories || ["0-10%","11-20%","21-30%","31-40%","41-50%","51-60%","61-70%","71-80%","81-90%","91-100%",];

        for (i = 0; i < resource.length; ++i) {
            data[i] = {};
            data[i]["name"] = resource[i][0];
            data[i]["color"] = resource[i][1];
            data[i]["data"] = [];
            for (j = 2; j < resource[i].length; ++j) {
                data[i]["data"].push(parseFloat(resource[i][j]));
            }
        }

        graph.highcharts({
            chart: {
                type: 'areaspline'
            },
            title: {
                text: title
            },
            plotOptions: {
                series: {
                    enableMouseTracking: false,
                    shadow: false,
                    animation: false,
                }
            },
            xAxis: {
                title: {
                    text: xAxisText
                },
                categories: categories,
                offset: 20,
            },
            yAxis: {
                min: 0,
                title: {
                    text: yAxisText
                },
                tickInterval: 10,
            },
            tooltip: {
                shared: true,
                valueSuffix: sufix,
                crosshairs: true,
            shared: true
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5,
                    dataLabels: {
                        enabled: true,
                        format: "{y}%",
                        color: '#777'
                    },
                }
            },
            series: data
        });
    }
}

var engineDatepickers = function() {
    $('#page .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy',
    });
}
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
$('#dates').on('cocoon:after-insert', function() {
    engineDatepickers();
});
$.extend( $.fn.dataTable.defaults, {
	"language": {
		"sEmptyTable": "Nenhum registro encontrado",
		"sInfo": "Mostrando de _START_ at&eacute; _END_ de _TOTAL_ registros",
		"sInfoEmpty": "Mostrando 0 at&eacute; 0 de 0 registros",
		"sInfoFiltered": "(Filtrados de _MAX_ registros)",
		"sInfoPostFix": "",
		"sInfoThousands": ".",
		"sLengthMenu": "_MENU_ &nbsp; resultados por p&aacute;gina",
		"sLoadingRecords": "Carregando...",
		"sProcessing": "Processando...",
		"sZeroRecords": "Nenhum registro encontrado",
		"sSearch": "Pesquisar &nbsp;&nbsp;",
		"oPaginate": {
			"sNext": "Pr&oacute;ximo",
			"sPrevious": "Anterior",
			"sFirst": "Primeiro",
			"sLast": "&Uacute;ltimo"
		},
		"oAria": {
			"sSortAscending": ": Ordenar colunas de forma ascendente",
			"sSortDescending": ": Ordenar colunas de forma descendente"
		}
	},
});

$.extend( $.fn.dataTableExt.oSort, {
    "only-float-pre": function ( a ) {
        result = parseFloat(a.match(/[0-9]*\.[0-9]*\%/g)[0].replace("%", ""));
        return result;
    },
    "only-float-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
    "only-float-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});
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
$(document).ready(function() {
    var answerDropZone = $("#new-answers-dropzone");

    if (answerDropZone.lenght > 0) {
        var newAnswersDropzone = new Dropzone("#new-answers-dropzone", {
            paramName: "answers",
            autoProcessQueue: false,
        });

        newAnswersDropzone.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            newAnswersDropzone.processQueue();
        });
    }
})
$(document).ready(function () {
	$("#login-form").validate();
    $(".form-horizontal").validate();
});

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: PT (Portuguese; português)
 * Region: BR (Brazil)
 */
$.extend( $.validator.messages, {

	// Core
	required: "Este campo &eacute; mandat&oacute;rio.",
	remote: "Por favor, corrija este campo.",
	email: "Por favor, forne&ccedil;a um endere&ccedil;o de email v&aacute;lido.",
	url: "Por favor, forne&ccedil;a uma URL v&aacute;lida.",
	date: "Por favor, forne&ccedil;a uma data v&aacute;lida.",
	dateISO: "Por favor, forne&ccedil;a uma data v&aacute;lida (ISO).",
	number: "Por favor, forne&ccedil;a um n&uacute;mero v&aacute;lido.",
	digits: "Por favor, forne&ccedil;a somente d&iacute;gitos.",
	creditcard: "Por favor, forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.",
	equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente.",
	maxlength: $.validator.format( "Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres." ),
	minlength: $.validator.format( "Por favor, forne&ccedil;a ao menos {0} caracteres." ),
	rangelength: $.validator.format( "Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento." ),
	range: $.validator.format( "Por favor, forne&ccedil;a um valor entre {0} e {1}." ),
	max: $.validator.format( "Por favor, forne&ccedil;a um valor menor ou igual a {0}." ),
	min: $.validator.format( "Por favor, forne&ccedil;a um valor maior ou igual a {0}." ),

	// Metodos Adicionais
	maxWords: $.validator.format( "Por favor, forne&ccedil;a com {0} palavras ou menos." ),
	minWords: $.validator.format( "Por favor, forne&ccedil;a pelo menos {0} palavras." ),
	rangeWords: $.validator.format( "Por favor, forne&ccedil;a entre {0} e {1} palavras." ),
	accept: "Por favor, forne&ccedil;a um tipo v&aacute;lido.",
	alphanumeric: "Por favor, forne&ccedil;a somente com letras, n&uacute;meros e sublinhados.",
	bankaccountNL: "Por favor, forne&ccedil;a com um n&uacute;mero de conta banc&aacute;ria v&aacute;lida.",
	bankorgiroaccountNL: "Por favor, forne&ccedil;a um banco v&aacute;lido ou n&uacute;mero de conta.",
	bic: "Por favor, forne&ccedil;a um c&oacute;digo BIC v&aacute;lido.",
	cifES: "Por favor, forne&ccedil;a um c&oacute;digo CIF v&aacute;lido.",
	creditcardtypes: "Por favor, forne&ccedil;a um n&uacute;mero de cart&atilde;o de cr&eacute;dito v&aacute;lido.",
	currency: "Por favor, forne&ccedil;a uma moeda v&aacute;lida.",
	dateFA: "Por favor, forne&ccedil;a uma data correta.",
	dateITA: "Por favor, forne&ccedil;a uma data correta.",
	dateNL: "Por favor, forne&ccedil;a uma data correta.",
	extension: "Por favor, forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.",
	giroaccountNL: "Por favor, forne&ccedil;a um n&uacute;mero de conta corrente v&aacute;lido.",
	iban: "Por favor, forne&ccedil;a um c&oacute;digo IBAN v&aacute;lido.",
	integer: "Por favor, forne&ccedil;a um n&uacute;mero n&atilde;o decimal.",
	ipv4: "Por favor, forne&ccedil;a um IPv4 v&aacute;lido.",
	ipv6: "Por favor, forne&ccedil;a um IPv6 v&aacute;lido.",
	lettersonly: "Por favor, forne&ccedil;a apenas com letras.",
	letterswithbasicpunc: "Por favor, forne&ccedil;a apenas letras ou pontua&ccedil;ões.",
	mobileNL: "Por favor, fornece&ccedil;a um n&uacute;mero v&aacute;lido de telefone.",
	mobileUK: "Por favor, fornece&ccedil;a um n&uacute;mero v&aacute;lido de telefone.",
	nieES: "Por favor, forne&ccedil;a um NIE v&aacute;lido.",
	nifES: "Por favor, forne&ccedil;a um NIF v&aacute;lido.",
	nowhitespace: "Por favor, n&atilde;o utilize espa&ccedil;os em branco.",
	pattern: "O formato fornenecido &eacute; inv&aacute;lido.",
	phoneNL: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
	phoneUK: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
	phoneUS: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
	phonesUK: "Por favor, fornece&ccedil;a um n&uacute;mero de telefone v&aacute;lido.",
	postalCodeCA: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
	postalcodeIT: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
	postalcodeNL: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
	postcodeUK: "Por favor, fornece&ccedil;a um n&uacute;mero de c&oacute;digo postal v&aacute;lido.",
	postalcodeBR: "Por favor, forne&ccedil;a um CEP v&aacute;lido.",
	require_from_group: $.validator.format( "Por favor, forne&ccedil;a pelo menos {0} destes campos." ),
	skip_or_fill_minimum: $.validator.format( "Por favor, optar entre ignorar esses campos ou preencher pelo menos {0} deles." ),
	stateUS: "Por favor, forne&ccedil;a um estado v&aacute;lido.",
	strippedminlength: $.validator.format( "Por favor, forne&ccedil;a pelo menos {0} caracteres." ),
	time: "Por favor, forne&ccedil;a um hor&aacute;rio v&aacute;lido, no intervado de 00:00 e 23:59.",
	time12h: "Por favor, forne&ccedil;a um hor&aacute;rio v&aacute;lido, no intervado de 01:00 e 12:59 am/pm.",
	url2: "Por favor, fornece&ccedil;a uma URL v&aacute;lida.",
	vinUS: "O n&uacute;mero de identifica&ccedil;&atilde;o de ve&iacute;culo informada (VIN) &eacute; inv&aacute;lido.",
	zipcodeUS: "Por favor, fornece&ccedil;a um c&oacute;digo postal americano v&aacute;lido.",
	ziprange: "O c&oacute;digo postal deve estar entre 902xx-xxxx e 905xx-xxxx",
	cpfBR: "Por favor, forne&ccedil;a um CPF v&aacute;lido."
} );
$(document).ready(function () {

	
    // Add body-small class if window less than 768px
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click( function() {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').click( function() {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Close menu in canvas mode
    $('.close-canvas-menu').click( function() {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });

    // Open close right sidebar
    $('.right-sidebar-toggle').click(function(){
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    // Initialize slimscroll for right sidebar
    $('.sidebar-container').slimScroll({
        height: '100%',
        railOpacity: 0.4,
        wheelStep: 10
    });

    // Open close small chat
    $('.open-small-chat').click(function(){
        $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
        $('.small-chat-box').toggleClass('active');
    });

    // Initialize slimscroll for small chat
    $('.small-chat-box .content').slimScroll({
        height: '234px',
        railOpacity: 0.4
    });

    // Small todo handler
    $('.check-link').click( function(){
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Minimalize menu
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();

    });

    // Tooltips demo
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });

    // Move modal to body
    // Fix Bootstrap backdrop issu with animation.css
    $('.modal').appendTo("body");

    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if(navbarHeigh > wrapperHeigh){
            $('#page-wrapper').css("min-height", navbarHeigh + "px");
        }

        if(navbarHeigh < wrapperHeigh){
            $('#page-wrapper').css("min-height", $(window).height()  + "px");
        }

        if ($('body').hasClass('fixed-nav')) {
            $('#page-wrapper').css("min-height", $(window).height() - 60 + "px");
        }

    }
    fix_height();

    // Fixed Sidebar
    $(window).bind("load", function () {
        if ($("body").hasClass('fixed-sidebar')) {
            $('.sidebar-collapse').slimScroll({
                height: '100%',
                railOpacity: 0.9
            });
        }
    })

    // Move right sidebar top after scroll
    $(window).scroll(function(){
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav') ) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $(window).bind("load resize scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    $("[data-toggle=popover]")
        .popover();

    // Add slimscroll to element
    $('.full-height-scroll').slimscroll({
        height: '100%'
    })
    
    var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
        $(selector).chosen(config[selector]);
    }
});


// Minimalize menu when screen is less than 768px
$(window).bind("resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('body-small')
    } else {
        $('body').removeClass('body-small')
    }
});

// For demo purpose - animation css script
function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}

pageMechanic = function() {


    $('[data-toggle="tooltip"]').tooltip();

    if (checkUrl("simulated_tests/new")) {
        console.log('[INFO] enginePage called at: simulated_tests/new.');

        var engineDatepickers = function() {
            $('#page .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
            });
        }

        var engineSelects = function() {
            $('#page .chosen-select').chosen({width: 'inherit'});
        }

        engineDatepickers();

        engineSelects();

        $('#dates').on('cocoon:after-insert', function() {
            engineDatepickers();
        });

        $('#questions').on('cocoon:after-insert', function() {
            engineSelects();

        });

        $('.add-question').trigger('click');
    } else if (checkUrl("(simulated_tests)/[0-9]+")) {
        // console.log('[INFO] enginePage called at: simulated_tests/[0-9]+.');

        // simulatedTestTable = $('#simulated-test-table');
        // if (simulatedTestTable.length > 0) {
        //     jQuery.extend( jQuery.fn.dataTableExt.oSort, {
        //         "only-float-pre": function ( a ) {
        //             result = parseFloat(a.match(/[0-9]*\.[0-9]*\%/g)[0].replace("%", ""));
        //             return result;
        //         },
        //         "only-float-asc": function ( a, b ) {
        //             return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        //         },
        //         "only-float-desc": function ( a, b ) {
        //             return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        //         }
        //     });
        //     var t = simulatedTestTable.dataTable({
        //         responsive: true,
        //         "order": [[ 3, "desc" ], [ 4, "desc" ], [ 5, "desc" ], [ 6, "desc" ], [ 7, "desc" ],],
        //         "aoColumnDefs": [
        //         { "sType": 'only-float', "asSorting": [ "desc", "asc"], "aTargets": [ 3, 4, 5, 6, 7 ], },
        //         { "orderable": false, "targets": [2], }
        //         ],
        //         language: {
        //             "sEmptyTable": "Nenhum registro encontrado",
        //             "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        //             "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        //             "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        //             "sInfoPostFix": "",
        //             "sInfoThousands": ".",
        //             "sLengthMenu": "_MENU_ &nbsp; resultados por página",
        //             "sLoadingRecords": "Carregando...",
        //             "sProcessing": "Processando...",
        //             "sZeroRecords": "Nenhum registro encontrado",
        //             "sSearch": "Pesquisar &nbsp;&nbsp;",
        //             "oPaginate": {
        //                 "sNext": "Próximo",
        //                 "sPrevious": "Anterior",
        //                 "sFirst": "Primeiro",
        //                 "sLast": "Último"
        //             },
        //             "oAria": {
        //                 "sSortAscending": ": Ordenar colunas de forma ascendente",
        //                 "sSortDescending": ": Ordenar colunas de forma descendente"
        //             }
        //         },
        //     });
        // } else {
        //     console.log('[INFO] simulatedTestTable already loaded.');
        // }
    } else if (checkUrl("(simulated_tests/)[0-9]+(/edit_questions)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: simulated_tests/[0-9]+/edit_questions.');

        var engineSelects = function() {
            $('#page .chosen-select').chosen({width: 'inherit'});
        }




        engineSelects();

        $('#questions .question .knowledge-area-select').change(function() {
            select = $(this);
            question = select.closest('.question');
            question.find('.knowledge-object-select option').prop('selected', false);
            question.find('.skill-select option').prop('selected', false);
            question.find('.chosen-container').remove();
            question.find('.knowledge-object-select.chosen-select').chosen('destroy');
            question.find('.skill-select.chosen-select').chosen('destroy');
            question.find('.knowledge-object-select').addClass('hidden').removeClass('chosen-select');
            question.find('.skill-select').addClass('hidden').removeClass('chosen-select');

            question.find('.from-knowledge-area-' + select.val()).removeClass('hidden').addClass('chosen-select').chosen({width: 'inherit'});
        });
    } else if (checkUrl("(simulated_tests/)[0-9]+(/edit)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: simulated_tests/[0-9]+/edit.');

        var engineDatepickers = function() {
            $('#page .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
            });
        }



        engineDatepickers();


        $('#dates').on('cocoon:after-insert', function() {
            engineDatepickers();
        });
    } else if (checkUrl("(simulated_tests/)[0-9\/]*(show_statistic_report)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: simulated_tests/[0-9]+/show_statistic_report.');

        var resource1 = $('table#statistic-report-resource__general tr').get().map(function(row) {
            return $(row).find('td').get().map(function(cell) {
                return $(cell).html();
            });
        });
        var resource2 = $('table#statistic-report-resource__1 tr').get().map(function(row) {
            return $(row).find('td').get().map(function(cell) {
                return $(cell).html();
            });
        });
        var resource3 = $('table#statistic-report-resource__2 tr').get().map(function(row) {
            return $(row).find('td').get().map(function(cell) {
                return $(cell).html();
            });
        });

        graph1 = $("#statistic-report-graph1");
        graph2 = $("#statistic-report-graph2");
        graph3 = $("#statistic-report-graph3");
        engineGraphs(graph1, resource1, "Médias de Acertos Geral");
        engineGraphs(graph2, resource2, "Médias de Acertos por Área de Conhecimento - Parte 1");
        engineGraphs(graph3, resource3, "Médias de Acertos por Área de Conhecimento - Parte 2");

        $('.nestable-list').nestable();
        $('[data-action="collapse"]').trigger('click');
    } else if (checkUrl("(simulated_tests/)[0-9]+(/new_answers)")){
        console.log('[INFO] enginePage called at: simulated_tests/[0-9]+/new_answers.');

        var newAnswersDropzone = new Dropzone("#new-answers-dropzone", {
            paramName: "answers",
            autoProcessQueue: false,
        });
        newAnswersDropzone.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            newAnswersDropzone.processQueue();
        });
    } else if (checkUrl("simulated_tests/show_answer_cards")){
        $('#simulated_test_id').chosen({width: 'inherit'});
    } else if (checkUrl("students/[0-9]+/dashboard")) {
        console.log('[INFO] enginePage called at: students/[0-9]+/dashboard.');

        if ($('table#dashboard-simulated-test-graph-resource').length > 0) {
            var resource = $('table#dashboard-simulated-test-graph-resource tr').get().map(function(row) {
                return $(row).find('td').get().map(function(cell) {
                    return $(cell).html();
                });
            });

            categories = [];
            for (i = 2; i < resource.length; ++i) {
                categories.push(resource[i][0]);
            }
            data = [];
            for (j = 1; j < resource[0].length; ++j) {
                data[j-1] = {};
                data[j-1]["data"] = [];
                data[j-1]["name"] = resource[0][j];
                data[j-1]["color"] = resource[1][j];

                for (k = 2; k < resource.length; ++k) {
                    data[j-1]["data"].push(parseFloat(resource[k][j]));
                }
            }

            $('#dashboard-simulated-test-graph').highcharts({
                chart: {
                    type: 'column',
                    height: 220,
                },
                title: { text: ' '  },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'top',
                },
                credits: false,
                xAxis: {
                    categories: categories,
                    crosshair: true
                },
                yAxis: {
            // min: 0,
            // max: 100,
            tickInterval: 10,
            title: {
                text: 'Porcentagem de acertos'
            }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: data
            });
        }
    } else if (checkUrl("students/new")) {
    } else if (checkUrl("students/[0-9]+")) {
        console.log('[INFO] enginePage called at: students/[0-9]+.');

        $('.histograms').each(function(index){
            table1 = $(this).find('table.statistic-report-resource__general tr');
            table2 = $(this).find('table.statistic-report-resource__1 tr');
            table3 = $(this).find('table.statistic-report-resource__2 tr');
            graph1 = $(this).find('.histogram1');
            graph2 = $(this).find('.histogram2');
            graph3 = $(this).find('.histogram3');

            var resource1 = table1.get().map(function(row) {
                return $(row).find('td').get().map(function(cell) {
                    return $(cell).html();
                });
            });
            var resource2 = table2.get().map(function(row) {
                return $(row).find('td').get().map(function(cell) {
                    return $(cell).html();
                });
            });
            var resource3 = table3.get().map(function(row) {
                return $(row).find('td').get().map(function(cell) {
                    return $(cell).html();
                });
            });

            engineGraphs(graph1, resource1, "Médias de Acertos Geral");
            engineGraphs(graph2, resource2, "Médias de Acertos por Área de Conhecimento - Parte 2");
            engineGraphs(graph3, resource3, "Médias de Acertos por Área de Conhecimento - Parte 2");
        });


        $('.nestable-list').nestable();
        $('[data-action="collapse"]').trigger('click');
        $('span.pie').peity('pie', { fill: ['#1ab394', '#d7d7d7', '#ffffff'] });
    } else if (checkUrl("students")) {
        console.log('[INFO] enginePage called at: students.');

        studentsTable = $('#students-table');
        if (studentsTable.length > 0) {
            var t = studentsTable.dataTable({
                responsive: true,
                "columnDefs": [ { "targets": [4, 5, 6], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("students/results")) {
        console.log('[INFO] enginePage called at: students/results.');

        studentsResultsTable = $('#students-results-table');
        if (studentsResultsTable.length > 0) {
            var t = studentsResultsTable.dataTable({
                responsive: true,
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        }
    } else if (checkUrl("(students/)[0-9]+(/show_simulated_tests)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: students/0-9/show_simulated_tests.');

        $('.histograms').each(function(index){
            table = $(this).find('table tr');
            graph1 = $(this).find('.histogram1');
            graph2 = $(this).find('.histogram2');

            var resource = table.get().map(function(row) {
                return $(row).find('td').get().map(function(cell) {
                    return $(cell).html();
                });
            });

            engineGraphs(graph1, resource.slice(0, 3), "Médias de Acertos por Área de Conhecimento - Parte 1");
            engineGraphs(graph2, resource.slice(3, 5), "Médias de Acertos por Área de Conhecimento - Parte 2");
        });


        $('.nestable-list').nestable();
        $('[data-action="collapse"]').trigger('click');
        $('span.pie').peity('pie', { fill: ['#1ab394', '#d7d7d7', '#ffffff'] });
    } else if (checkUrl("(students/)[0-9]+(/simulated_tests)")) {
        console.log('[INFO] enginePage called at: students/[0-9]+/simulated_tests.');

        availableSimulatedTestsTable = $('#avaliable-simulated-tests-table');
        registeredSimulatedTestsTable = $('#registered-simulated-tests-table');
        if (availableSimulatedTestsTable.length > 0) {
            var t = availableSimulatedTestsTable.dataTable({
                responsive: true,
                "columnDefs": [ { "targets": [2, 3, 4], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        }
        if (registeredSimulatedTestsTable.length > 0) {
            var t = registeredSimulatedTestsTable.dataTable({
                responsive: true,
                "columnDefs": [ { "targets": [2], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        }
    } else if (checkUrl("users")) {
        console.log('[INFO] enginePage called at: users.');

        usersTable = $('#users-table');
        if (usersTable.length > 0) {
            var t = usersTable.dataTable({
                responsive: true,
                "columnDefs": [ { "targets": [2, 3], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("knowledge_areas")) {
        console.log('[INFO] enginePage called at: knowledge_areas.');

        table = $('#knowledge-areas-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "columnDefs": [ { "targets": [2, 3], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("knowledge_objects")) {
        console.log('[INFO] enginePage called at: knowledge_objects.');

        table = $('#knowledge-objects-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "columnDefs": [ { "targets": [2, 3], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("competences")) {
        console.log('[INFO] enginePage called at: competences.');

        table = $('#competences-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "order": [[ 1, "desc" ], [ 0, "desc" ]],
                "columnDefs": [ { "targets": [2, 3], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("skills")) {
        console.log('[INFO] enginePage called at: skills.');

        table = $('#skills-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "order": [[ 2, "desc" ], [ 1, "desc" ], [ 0, "asc" ]],
                "columnDefs": [ { "targets": [3, 4], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("jobs")) {
        console.log('[INFO] enginePage called at: jobs.');

        table = $('#jobs-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "order": [[ 0, "asc" ]],
                "columnDefs": [ { "targets": [1, 2], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("grades")) {
        console.log('[INFO] enginePage called at: grades.');

        table = $('#grades-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "order": [[ 0, "asc" ]],
                "columnDefs": [ { "targets": [1, 2], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("normals")) {
        console.log('[INFO] enginePage called at: normals.');

        table = $('#normals-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "order": [[ 0, "asc" ]],
                "columnDefs": [ { "targets": [1, 2], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] normalsTable already loaded.');
        }
    } else if (checkUrl("subjects")) {
        console.log('[INFO] enginePage called at: subjects.');

        table = $('#subjects-table');
        if (table.length > 0) {
            var t = table.dataTable({
                responsive: true,
                "order": [[ 0, "asc" ]],
                "columnDefs": [ { "targets": [1, 2], "orderable": false } ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] studentsTable already loaded.');
        }
    } else if (checkUrl("exams/new")) {
        console.log('[INFO] enginePage called at: exam/new.');

        var engineDatepickers = function() {
            $('#page .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
            });
        }

        var engineSelects = function() {
            $('#page .chosen-select').chosen({width: 'inherit'});
        }



        engineDatepickers();

        engineSelects();

        $('#exam_dates').on('cocoon:after-insert', function() {
            engineDatepickers();
        });

        $('#exam_questions').on('cocoon:after-insert', function() {
            engineSelects();

        });

        $('.add-question').trigger('click');
    } else if (checkUrl("(exams)/[0-9]+")) {
        console.log('[INFO] enginePage called at: exams/[0-9]+.');

        examTable = $('#exam-table');
        if (examTable.length > 0) {
            jQuery.extend( jQuery.fn.dataTableExt.oSort, {
                "only-float-pre": function ( a ) {
                    result = parseFloat(a.match(/[0-9]*\.[0-9]*\%/g)[0].replace("%", ""));
                    return result;
                },
                "only-float-asc": function ( a, b ) {
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                },
                "only-float-desc": function ( a, b ) {
                    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
                }
            });
            targets = [3,]
            for (i = 0; i < parseInt(examTable.attr('data-subjects')); i++) {
                targets.push(3 + 1 + i);
            }
            var t = examTable.dataTable({
                responsive: true,
                "order": [[ 3, "desc" ],],
                "aoColumnDefs": [
                    { "sType": 'only-float', "asSorting": [ "desc", "asc"], "aTargets": targets, },
                    { "orderable": false, "targets": [2], }
                ],
                language: {
                    "sEmptyTable": "Nenhum registro encontrado",
                    "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                    "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sInfoThousands": ".",
                    "sLengthMenu": "_MENU_ &nbsp; resultados por página",
                    "sLoadingRecords": "Carregando...",
                    "sProcessing": "Processando...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "sSearch": "Pesquisar &nbsp;&nbsp;",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                    "oAria": {
                        "sSortAscending": ": Ordenar colunas de forma ascendente",
                        "sSortDescending": ": Ordenar colunas de forma descendente"
                    }
                },
            });
        } else {
            console.log('[INFO] examTable already loaded.');
        }
    } else if (checkUrl("exams")) {
        // console.log('[INFO] enginePage called at: exams.');

        // examsTable = $('#exams-table');
        // if (examsTable.length > 0) {
        //     var t = examsTable.dataTable({
        //         responsive: true,
        //         "columnDefs": [ { "targets": [2, 3, 4, 5, 6], "orderable": false } ],
        //         language: {
        //             "sEmptyTable": "Nenhum registro encontrado",
        //             "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        //             "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        //             "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        //             "sInfoPostFix": "",
        //             "sInfoThousands": ".",
        //             "sLengthMenu": "_MENU_ &nbsp; resultados por página",
        //             "sLoadingRecords": "Carregando...",
        //             "sProcessing": "Processando...",
        //             "sZeroRecords": "Nenhum registro encontrado",
        //             "sSearch": "Pesquisar &nbsp;&nbsp;",
        //             "oPaginate": {
        //                 "sNext": "Próximo",
        //                 "sPrevious": "Anterior",
        //                 "sFirst": "Primeiro",
        //                 "sLast": "Último"
        //             },
        //             "oAria": {
        //                 "sSortAscending": ": Ordenar colunas de forma ascendente",
        //                 "sSortDescending": ": Ordenar colunas de forma descendente"
        //             }
        //         },
        //     });
        // } else {
        //     console.log('[INFO] examsTable already loaded.');
        // }
    } else if (checkUrl("(exams/)[0-9]+(/edit_questions)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: exams/[0-9]+/edit_questions.');

        var engineSelects = function() {
            $('#page .chosen-select').chosen({width: 'inherit'});
        }




        engineSelects();

        $('#questions .question .knowledge-area-select').change(function() {
            select = $(this);
            question = select.closest('.question');
            question.find('.knowledge-object-select option').prop('selected', false);
            question.find('.skill-select option').prop('selected', false);
            question.find('.chosen-container').remove();
            question.find('.knowledge-object-select.chosen-select').chosen('destroy');
            question.find('.skill-select.chosen-select').chosen('destroy');
            question.find('.knowledge-object-select').addClass('hidden').removeClass('chosen-select');
            question.find('.skill-select').addClass('hidden').removeClass('chosen-select');

            question.find('.from-knowledge-area-' + select.val()).removeClass('hidden').addClass('chosen-select').chosen({width: 'inherit'});
        });
    } else if (checkUrl("(exams/)[0-9]+(/edit)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: exams/[0-9]+/edit.');

        var engineDatepickers = function() {
            $('#page .input-group.date').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true,
                format: 'dd/mm/yyyy',
            });
        }



        engineDatepickers();


        $('#dates').on('cocoon:after-insert', function() {
            engineDatepickers();
        });
    } else if (checkUrl("(exams/)[0-9\/]*(show_statistic_report)[a-zA-Z0-9\/\?\=\%\&\\+\.\%\-\_]*")) {
        console.log('[INFO] enginePage called at: exams/[0-9]+/show_statistic_report.');

        var resource1 = $('table#statistic-report-resource__1 tr').get().map(function(row) {
            return $(row).find('td').get().map(function(cell) {
                return $(cell).html();
            });
        });
        var resource2 = $('table#statistic-report-resource__2 tr').get().map(function(row) {
            return $(row).find('td').get().map(function(cell) {
                return $(cell).html();
            });
        });
        var resource2__categories = $('table#statistic-report-resource__2 td[data-cat]').get().map(function(cell) {
            return $(cell).attr('data-cat');
        });

        console.log(resource2__categories)

        graph1 = $("#statistic-report-graph1");
        engineGraphs(graph1, resource1, "Acertos", ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"], 'Notas', 'Porcentagem de Alunos', '%');
        graph2 = $("#statistic-report-graph2");
        engineGraphs(graph2, resource2, "Acertos por Questão", resource2__categories, 'Questões', 'Porcentam de Alunos', '%');

        $('.nestable-list').nestable();
        $('[data-action="collapse"]').trigger('click');
    } else if (checkUrl("(exams/)[0-9]+(/new_answers)")){
        console.log('[INFO] enginePage called at: exams/[0-9]+/new_answers.');

        var newAnswersDropzone = new Dropzone("#new-answers-dropzone", {
            paramName: "answers",
            autoProcessQueue: false,
        });
        newAnswersDropzone.element.querySelector("button[type=submit]").addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            newAnswersDropzone.processQueue();
        });
    } else {
        console.log('[INFO] enginePage called at generic page.');

        if ($('table#dashboard-simulated-test-graph-resource').length > 0) {
            var resource = $('table#dashboard-simulated-test-graph-resource tr').get().map(function(row) {
                return $(row).find('td').get().map(function(cell) {
                    return $(cell).html();
                });
            });

            categories = [];
            for (i = 2; i < resource.length; ++i) {
                categories.push(resource[i][0]);
            }
            data = [];
            for (j = 1; j < resource[0].length; ++j) {
                data[j-1] = {};
                data[j-1]["data"] = [];
                data[j-1]["name"] = resource[0][j];
                data[j-1]["color"] = resource[1][j];

                for (k = 2; k < resource.length; ++k) {
                    data[j-1]["data"].push(parseFloat(resource[k][j]));
                }
            }

            $('#dashboard-simulated-test-graph').highcharts({
                chart: {
                    type: 'column',
                    height: 220,
                },
                title: { text: ' '  },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'top',
                },
                credits: false,
                xAxis: {
                    categories: categories,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    tickInterval: 20,
                    title: {
                        text: 'Porcentagem de acertos'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: data
            });
        }

        if ($('#flot-chart1').length > 0) {
            var d1 = [[1262304000000, 6], [1264982400000, 3057], [1267401600000, 20434], [1270080000000, 31982], [1272672000000, 26602], [1275350400000, 27826], [1277942400000, 24302], [1280620800000, 24237], [1283299200000, 21004], [1285891200000, 12144], [1288569600000, 10577], [1291161600000, 10295]];
            var d2 = [[1262304000000, 5], [1264982400000, 200], [1267401600000, 1605], [1270080000000, 6129], [1272672000000, 11643], [1275350400000, 19055], [1277942400000, 30062], [1280620800000, 39197], [1283299200000, 37000], [1285891200000, 27000], [1288569600000, 21000], [1291161600000, 17000]];

            var data1 = [
            { label: "Data 1", data: d1, color: '#17a084'},
            { label: "Data 2", data: d2, color: '#127e68' }
            ];
            $.plot($("#flot-chart1"), data1, {
                xaxis: {
                    tickDecimals: 0
                },
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 1
                            }, {
                                opacity: 1
                            }]
                        },
                    },
                    points: {
                        width: 0.1,
                        show: false
                    },
                },
                grid: {
                    show: false,
                    borderWidth: 0
                },
                legend: {
                    show: false,
                }
            });
        }
    }
}

$(document).ready(function() {
    // pageMechanic();
})
//function scrollHandler() {
//  var scrollTop = $(window).scrollTop();
//
//  var topbar = $('#topbar');
//  var topbarHeight = topbar.outerHeight();
//
//	if (scrollTop > topbarHeight) {
//		classie.add(topbar[0], 'fixed-topbar');
//	} else {
//		classie.remove(topbar[0], 'fixed-topbar');
//	}
//}
//
//$(window).scroll(scrollHandler);

sideMenuMechanic = function() {
    var openedMenu = $('a[href="' + location.href + '"]');
    var anchors = $('#side-menu li.active').removeClass('active');

    if (openedMenu.length <= 0) {
        try {
            openedMenu = $('a[href="' + location.pathname + '"]');
            // openedMenu = $('a[href="' + /http:\/\/([a-zA-Z0-9:.]+)\/([a-zA-Z_]+)/g.exec(location.href)[0] + '"]');
        } catch(err) {
            console.log('[ERROR] At: engineSideMenu, err: ' + err);
        }
    }

    openedMenu.parents('li').each(function(index){
        $(this).find('ul').first().addClass('in').attr('aria-expanded', 'true');
        $(this).addClass('active');
    });
}

$(document).ready(function() {
    sideMenuMechanic();
})

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