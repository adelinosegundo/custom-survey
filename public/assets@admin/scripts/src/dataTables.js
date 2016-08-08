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