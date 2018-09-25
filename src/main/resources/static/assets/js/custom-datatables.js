(function ($) {
    $.httpOtable = {
        init: function (url, data, errcallback) {
            var columns = [
                {"data": "rowid", "sDefaultContent": ''},
                {"data": "env", "sDefaultContent": ''},
                {"data": "key", "sDefaultContent": ''},
                {"data": "value", "sDefaultContent": ''},
                {
                    "data": "null",
                },
                {"data": "id", "sDefaultContent": ''},
            ];
            var renders = [{"bVisible": false, "aTargets": [3, 5]},
                {
                    "render": function () {
                        return '<button id="update" class="btn btn-primary"><i class="fa fa-edit "></i> 更新</button>\r\n<button id="danger" class="btn btn-danger"><i class="fa fa-pencil"></i> 删除</button>'
                    },
                    "targets": 4
                }]
            return $.otable.init(url, data, columns, renders, errcallback)
        }
    }

    $.otable = {
        init: function (url, data, columns, renders, errorcallback) {
            return $('#dataTables-example').dataTable({
                language: {
                    "url": "assets/js/dataTables/dataTables.zh.json"
                },
                showRowNumber: true,
                ajax: {
                    contentType: "application/json;charset=utf-8",
                    type: "POST",
                    data: data,
                    url: url,
                    error: function () {
                        if (errorcallback != null) {
                            errorcallback();
                        }
                    }
                },
                fnDrawCallback: function () {
                    var api = this.api();
                    api.column(0).nodes().each(function (cell, i) {
                        cell.innerHTML = i + 1;
                    });
                },
                columns: columns,
                aoColumnDefs: renders
            })
        },
        getTrData: function (object) {
            return $('#dataTables-example').DataTable().row(object.parents('tr')).data();
        },
        refresh: function(){
            $('#dataTables-example').DataTable().api().ajax.reload();
        }
    }
})(jQuery)