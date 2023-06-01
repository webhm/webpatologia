import sidebarTr from '../sidebarTr';
import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            window.location.reload();
        }
        m.redraw();
    },

    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 100;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-b-0", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Actualización en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play.pd-2", {
                                    title: "Start",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }
                                })] : [m("i.fas.fa-pause.pd-2", {
                                    title: "Pause",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }

                                })]),


                            ),



                        ),


                    ]),
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];



        },
        onremove() {
            actions.stop(model);
        },

    };
};


const tablePedidosTR = {
    oncreate: () => {
        PedidosTR.loadPedidos();
        if (PedidosTR.searchField.length !== 0) {
            var table = $('#table-pedidos').DataTable();
            table.search(PedidosTR.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Pedidos de Terapia Respiratoria:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PedidosTR.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PedidosTR.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos entre Fechas';
                                        }
                                        if (PedidosTR.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PedidosTR.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa';
                                        }
                                        if (PedidosTR.idFiltro == 5) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PedidosTR.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PedidosTR.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos entre Fechas';
                                        }
                                        if (PedidosTR.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PedidosTR.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa';
                                        }
                                        if (PedidosTR.idFiltro == 5) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización';
                                        }
                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PedidosTR.idFiltro == 1 ? 'd-none' : 'd-flex')
                            }, [
                                m("div.link-03", {
                                        title: "Desde"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Desde:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Desde"
                                    },

                                    m("input.tx-light.pd-4[type='date'][id='desde']", {
                                        oncreate: (el) => {
                                            el.dom.value = (PedidosTR.idFiltro !== 1 ? moment(moment(PedidosTR.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PedidosTR.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PedidosTR.loader = true;
                                            PedidosTR.pedidos = [];
                                            PedidosTR.fetchPedidos();
                                            m.route.set("/terapia-respiratoria/pedidos?idFiltro=" + PedidosTR.idFiltro + "&fechaDesde=" + PedidosTR.fechaDesde + "&fechaHasta=" + PedidosTR.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                ),
                                m("div.link-03", {
                                        title: "Hasta"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Hasta:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Hasta"
                                    },
                                    m("input.tx-light.pd-4[type='date'][id='hasta']", {
                                        oncreate: (el) => {
                                            el.dom.value = (PedidosTR.idFiltro !== 1 ? moment(moment(PedidosTR.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PedidosTR.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PedidosTR.loader = true;
                                            PedidosTR.pedidos = [];
                                            PedidosTR.fetchPedidos();
                                            m.route.set("/terapia-respiratoria/pedidos?idFiltro=" + PedidosTR.idFiltro + "&fechaDesde=" + PedidosTR.fechaDesde + "&fechaHasta=" + PedidosTR.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                )
                            ]),
                            m("div.dropdown.dropleft", [
                                m("div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                        style: { "cursor": "pointer" },
                                        title: "Filtrar"
                                    },
                                    m("i.fas.fa-filter.tx-18.pd-5")
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/terapia-respiratoria/pedidos/?idFiltro=1" }, [
                                        "Pedidos de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/terapia-respiratoria/pedidos/?idFiltro=2&fechaDesde=" + PedidosTR.fechaDesde + "&fechaHasta=" + PedidosTR.fechaHasta }, [
                                        "Pedidos entre Fechas"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/terapia-respiratoria/pedidos/?idFiltro=3&fechaDesde=" + PedidosTR.fechaDesde + "&fechaHasta=" + PedidosTR.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/terapia-respiratoria/pedidos/?idFiltro=4&fechaDesde=" + PedidosTR.fechaDesde + "&fechaHasta=" + PedidosTR.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/terapia-respiratoria/pedidos/?idFiltro=5&fechaDesde=" + PedidosTR.fechaDesde + "&fechaHasta=" + PedidosTR.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),

                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (PedidosTR.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { PedidosTR.searchField = e.target.value; },
                                value: PedidosTR.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-pedidos'][width='100%']"),


                ])
            ])
        ]);
    }
};

const PedidosTR = {
    notificaciones: [],
    pedidos: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        sidebarTr.page = "";

        if (PedidosTR.pedidos.length == 0) {

            moment.lang("es", {
                months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
                    "_"
                ),
                monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
                    "_"
                ),
                weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
                    "_"
                ),
                weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
                weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
            });



            PedidosTR.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            PedidosTR.fechaHasta = moment().format('DD-MM-YYYY');
            PedidosTR.loader = true;
            PedidosTR.pedidos = [];
            PedidosTR.fetchPedidos();

        }

    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Terapia-Respiratoria');
    },
    loadPedidos: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-pedidos").DataTable({
            data: PedidosTR.pedidos,
            dom: 'ltp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,

            destroy: true,
            columns: false,
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PRE_MED;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PACIENTE;

                    },
                    visible: false,
                    aTargets: [2],
                    orderable: false,

                }, {
                    mRender: function(data, type, full) {
                        return full.NM_PACIENTE;

                    },
                    visible: false,
                    aTargets: [3],
                    orderable: false,

                }, {
                    mRender: function(data, type, full) {
                        return full.MED_MV;

                    },
                    visible: false,
                    aTargets: [4],
                    orderable: false,

                }, {
                    mRender: function(data, type, full) {
                        return "";

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: false,

                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function(settings) {

                PedidosTR.loader = false;

                settings.aoData.map(function(_i) {

                    $(_i.anCells[5]).css("padding", "0").css("background-color", "#f7fafe");

                    m.mount(_i.anCells[5], {
                        view: function() {

                            return [
                                m("div.d-flex", {}, [
                                    m("div.pd-0.flex-grow-1",
                                        m("div.pd-2", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            m('i.fas.fa-file-alt.tx-semibold.tx-15.pd-2.mg-r-5'),
                                            m('.d-inline.tx-15.mg-r-5', _i._aData.CD_PRE_MED),
                                            m('i.fas.fa-hospital.tx-semibold.tx-12.pd-2'),
                                            m('.tx-semibold.d-inline.tx-12', " SECTOR: "),
                                            m('.d-inline.tx-12.mg-r-5', (_i._aData.SECTOR !== null ? _i._aData.SECTOR + " " + _i._aData.UBICACION : 'No Disponible')),
                                            m('i.fas.fa-user-md.tx-semibold.tx-12.pd-2'),
                                            m('.tx-semibold.d-inline.tx-12', " MED: "),
                                            _i._aData.MED_MV
                                        ),
                                    ),
                                    m("div.pd-2.tx-medium.mg-l-auto", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        _i._aData.EDAD + " - " + _i._aData.PESO + " - " + _i._aData.ALTURA + "."
                                    )
                                ]),
                                m("div.d-flex.mg-b-20", { "style": { "background-color": "rgb(234, 239, 245)" } }, [
                                    m("div.pd-0.flex-grow-1",
                                        m("td.wd-1p.tx-white", { "style": { "background-color": (_i._aData.SECTOR == 'EMERGENCIA' ? "#f10075" : "#0168fa") } },
                                            (_i._aData.SECTOR == 'EMERGENCIA' ? "E" : "H")
                                        ),
                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "FECHA:"
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.FECHA_PEDIDO + " " + _i._aData.HORA_PEDIDO
                                        ),
                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "NHC:"
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.CD_PACIENTE
                                        ),
                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "N° AT.: "
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.AT_MV
                                        ),

                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "PTE: "
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.NM_PACIENTE
                                        ),



                                    ),

                                    m("div.pd-0.mg-l-auto", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        m("td.tx-10", {
                                                "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" },
                                                onclick: () => {
                                                    m.route.set("/terapia-respiratoria/pedido/", {
                                                        numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                                        numeroAtencion: _i._aData.AT_MV,
                                                        numeroPedido: _i._aData.CD_PRE_MED,
                                                        track: "view",
                                                    });
                                                }
                                            },
                                            m(".tx-normal",
                                                m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                "Ver Pedido"
                                            )
                                        ),
                                    )
                                ]),


                            ]




                        }
                    });

                })




            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function(e) {

            table.search($('#searchField').val()).draw();
        });

        return table;
    },
    fetchPedidos: () => {

        let _queryString = '';

        if (PedidosTR.idFiltro == 1) {
            _queryString = '?idFiltro=' + PedidosTR.idFiltro;
        } else {
            _queryString = '?idFiltro=' + PedidosTR.idFiltro + '&fechaDesde=' + PedidosTR.fechaDesde + '&fechaHasta=' + PedidosTR.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/terapia-respiratoria/pedidos" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                PedidosTR.loader = false;
                PedidosTR.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { PedidosTR.fetchPedidos(); }, 2000);
            });


    },
    reloadData: () => {
        var table = $('#table-pedidos').DataTable();
        table.clear();
        table.rows.add(PedidosTR.pedidos).draw();
    },
    view: (_data) => {

        return PedidosTR.loader ? [
            m(sidebarTr, { oncreate: sidebarTr.setPage(18) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/terapia-respiratoria" }, [
                                " Terapia Respiratoria "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]


                            ),


                        ])
                    ]),






                ])
            ),

        ] : PedidosTR.error.length !== 0 ? [
            m(sidebarTr, { oncreate: sidebarTr.setPage(18) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/terapia-respiratoria" }, [
                                " Terapia Respiratoria "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe infrmac dd ncin')
                    ]),





                ])
            ),

        ] : !PedidosTR.loader && PedidosTR.pedidos.length !== 0 ? [
            m(sidebarTr, { oncreate: sidebarTr.setPage(18) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/terapia-respiratoria" }, [
                                " Terapia Respiratoria "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m(tablePedidosTR)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "RECEPCIÓN DE PedidosTR"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "N° de PedidosTR:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PedidosTR.pedidos.length
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ])
                    ),
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !PedidosTR.loader && PedidosTR.pedidos.length == 0 ? [
            m(sidebarTr, { oncreate: sidebarTr.setPage(18) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/terapia-respiratoria" }, [
                                " Terapia Respiratoria "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m(".alert.alert-danger[role='alert']",
                                "No existe información disponible."
                            )


                        ])
                    ]),






                ])
            ),
        ] : [
            m(sidebarTr, { oncreate: sidebarTr.setPage(18) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/terapia-respiratoria" }, [
                                " Terapia Respiratoria "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("p", " Error interno."

                            ),


                        ])
                    ]),






                ])
            ),
        ];


    },

};


export default PedidosTR;