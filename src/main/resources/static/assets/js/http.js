var HttpCore = function (url) {

    var editor = null;

    function createEditor() {
        editor = CodeMirror.fromTextArea(document.getElementById("expression"), {
            lineNumbers: true,
            matchBrackets: true,
            mode: "text/x-java",
            indentUnit: 4,
            indentWithTabs: true,
            theme: "dracula",
            firstLineNumber: 1,
            styleActiveLine: true,
            gutters: ['CodeMirror-lint-markers'],
            lint: true,
            autoRefresh: true,
        });
    }

    /** datatables **/
    var otable = $.httpOtable.init("/api/" + url + "/query");
    /** ------------ **/

    /** toggle事件 **/
    $("#dataTables-example tbody").on("click", "#update", function () {
        $(".fa-save").parent().attr("id", "save");
        var row = $.otable.getTrData($(this));
        $('#id').val(row.id)
        $('#env').val(row.env)
        $('#key').val(row.key)
        $('#json-src').val(row.value)
        if ($("#expression").length > 0) {
            initCodeMirror(row.expression)
        }
        $('#myModal').modal('show');
        $('#json-src').keyup();
    });
    /** ------------ **/

    /** 保存事件 **/
    $(document).on('click', '#save', function () {
        var env = $('#env').val().trim().length;
        var key = $('#key').val().trim().length;
        var value = $('#json-src').val().trim().length;
        if ($("#expression").length > 0) {
            $('#expression').val(editor.getValue());
        }
        if (env <= 0 || key <= 0 || value <= 0) {
            alert("参数不能为空");
            return;
        }
        $.requestAction("#formdata", true, "/api/" + url + "/update", function (result) {
            if (result.code == "0000") {
                otable.api().ajax.reload();
                $('#myModal').modal('hide');
            } else {
                alert(result.code + "\r\n" + result.msg);
            }
        }, function () {
            alert("系统异常");
        })
    })
    /** ------------ **/

    /** 删除事件 **/
    $("#dataTables-example tbody").on("click", "#danger", function () {
        var row = $.otable.getTrData($(this))
        $.requestAction(row, false, "/api/" + url + "/delete", function (result) {
            if (result.code == "0000") {
                otable.api().ajax.reload();
                $('#myModal').modal('hide');
            } else {
                alert(result.code + "\r\n" + result.msg);
            }
        }, function () {
            alert("系统异常");
        })
    });
    /** ------------ **/

    /** 新增事件 **/
    $(document).on('click', '#add', function () {
        var env = $('#env').val().trim().length;
        var key = $('#key').val().trim().length;
        var value = $('#json-src').val().trim().length;
        if ($("#expression").length > 0) {
            $('#expression').val(editor.getValue());
        }
        if (env <= 0 || key <= 0 || value <= 0) {
            alert("参数不能为空");
            return;
        }
        $.requestAction("#formdata", true, "/api/" + url + "/add", function (result) {
            if (result.code == "0000") {
                otable.api().ajax.reload();
                $('#myModal').modal('hide');
            } else {
                alert(result.code + "\r\n" + result.msg);
            }
        }, function () {
            alert("系统异常");
        })
    })
    /** ------------ **/

    /** 新增事件 **/
    $(document).on('click', '#query', function () {
        otable.api().ajax.reload();
    })
    /** ------------ **/

    /** 因添加和更新调用同一个toggle modal，所以在每次点击添加按钮前，先清空toggle-modal中各域值 **/
    $(document).on('click', '#addbtn', function () {
        $('#env').val("");
        $('#key').val("");
        $('#json-src').val("");
        $('#json-target').html('');
        if ($("#expression").length > 0) {
            initCodeMirror('')
        }
        $(".fa-save").parent().attr("id", "add");
    });
    /** ------------ **/

    function initCodeMirror(value) {
        $('#expression_div').html('<textarea id="expression" name="expression" class="form-control" placeholder="在此输入表达式" rows="18"></textarea>')
        createEditor()
        if (value == null) {
            value = '';
        }
        editor.setValue(value)
        editor.refresh()
    }
}