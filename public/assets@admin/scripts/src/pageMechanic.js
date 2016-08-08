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