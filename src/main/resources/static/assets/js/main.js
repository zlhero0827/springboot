/**
 * Created by xulinfan on 2018/6/7.
 */
(function ($) {
    // $("#wrapper").load("nav.html");
    $("#nav").load("nav.html");
    $("#footer").load("footer.html");

    /** json formatter and validate */
    $('#json-src').numberedtextarea(1);
    $('.tip').tooltip();
    $('#json-src').keyup(function () {
        var nthis = $(this);
        $.jsonVerfiy.verfiy(nthis);
    });

    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }

    $.requestAction = function (json, flag, requestUrl, successcallback, errorcallback) {
        var originData;
        if (json != null) {
            if (flag) {
                var data = {};
                $(json).serializeArray().map(function (x) {
                    data[x.name] = x.value;
                });
                originData = data;
            } else {
                originData = json
            }
        } else {
            originData = {};
        }
        var requestData = JSON.stringify(originData);
        console.log(requestData)
        $.ajax({
            contentType: "application/json;charset=utf-8",
            type: "POST",
            url: requestUrl,
            data: requestData,
            dataType: "json",
            success: function (data) {
                if (successcallback != null) {
                    successcallback(data)
                }
            },
            error: function (data) {
                if (data.status == 403) {
                    window.location.href = "login.html"
                } else {
                    if (errorcallback != null) {
                        errorcallback();
                    }
                }
            }
        })
    }

    $.requestFormAction = function (formData, flag, requestUrl, successcallback, errorcallback) {
        console.log(formData)
        $.ajax({
            type: "POST",
            url: requestUrl,
            data: formData,
            dataType: "json",
            success: function (data) {
                if (successcallback != null) {
                    successcallback(data)
                }
            },
            error: function (data) {
                if (data.status == 403) {
                    window.location.href = "login.html"
                } else {
                    $.jGrowl("请求异常，请查看服务器是否正常", {header: "9999"});
                    if (errorcallback != null) {
                        errorcallback();
                    }
                }
            }
        })
    }

    $.GB2312UnicodeConverter = {
        ToUnicode: function (str) {
            var txt = escape(str).toLocaleLowerCase().replace(/%u/gi, '\\u');
            //var txt= escape(str).replace(/([%3F]+)/gi,'\\u');
            return txt.replace(/%7b/gi, '{').replace(/%7d/gi, '}').replace(/%3a/gi, ':').replace(/%2c/gi, ',').replace(/%27/gi, '\'').replace(/%22/gi, '"').replace(/%5b/gi, '[').replace(/%5d/gi, ']').replace(/%3D/gi, '=').replace(/%20/gi, ' ').replace(/%3E/gi, '>').replace(/%3C/gi, '<').replace(/%3F/gi, '?').replace(/%5c/gi, '\\');//
        }
        , ToGB2312: function (str) {
            return unescape(str.replace(/\\u/gi, '%u'));
        }
    };

    var current_json = '';
    var current_json_str = '';
    var xml_flag = false;
    var zip_flag = false;
    var shown_flag = false;

    function init() {
        xml_flag = false;
        zip_flag = false;
        shown_flag = false;
        renderLine();
        $('.xml').attr('style', 'color:#999;');
        $('.zip').attr('style', 'color:#999;');
    }

    function renderLine() {
        var line_num = $('#json-target').height() / 20;
        $('#line-num').html("");
        var line_num_html = "";
        for (var i = 1; i < line_num + 1; i++) {
            line_num_html += "<div>" + i + "<div>";
        }
        $('#line-num').html(line_num_html);
    }

    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    }

    String.space = function (len) {
        var t = [], i;
        for (i = 0; i < len; i++) {
            t.push(' ');
        }
        return t.join('');
    };

    $.jsonVerfiy = {
        verfiy: function (data) {
            var schema_type = $(":radio[name='schema_type']:checked").val();

            if (schema_type == "静态") {
                $('#json-target').html('');
                return;
            }
            init();
            var content = $.trim(data.val());
            var result = '';
            if (content != '') {
                //如果是xml,那么转换为json
                if (content.substr(0, 1) === '<' && content.substr(-1, 1) === '>') {
                    try {
                        var json_obj = $.xml2json(content);
                        content = JSON.stringify(json_obj);
                    } catch (e) {
                        result = 'XULIN：解析错误：<span style="color: #f1592a;font-weight:bold;">' + e.message + '</span>';
                        current_json_str = result;
                        $('#json-target').html(result);
                        return false;
                    }

                }
                try {
                    current_json = jsonlint.parse(content);
                    current_json_str = JSON.stringify(current_json);
                    //current_json = JSON.parse(content);
                    result = new JSONFormat(content, 4).toString();
                } catch (e) {
                    result = 'XULIN：解析错误：<span style="color: #f1592a;font-weight:bold;">' + e + '</span>';
                    current_json_str = result;
                }

                $('#json-target').html(result);
            } else {
                $('#json-target').html('');
            }
        },
        getRemoveWhiteSpace: function (btext) {
            var text = btext.split("\n").join(" ");
            var t = [];
            var inString = false;
            for (var i = 0, len = text.length; i < len; i++) {
                var c = text.charAt(i);
                if (inString && c === inString) {
                    // TODO: \\"
                    if (text.charAt(i - 1) !== '\\') {
                        inString = false;
                    }
                } else if (!inString && (c === '"' || c === "'")) {
                    inString = c;
                } else if (!inString && (c === ' ' || c === "\t")) {
                    c = '';
                }
                t.push(c);
            }
            return t.join('');
        }, removeReturnCode: function (btext) {
            return btext.replace(/[\r\n]/g, "");
        },
        removeZhuanyi: function (btext) {
            var a = btext.replace(/\\\\/g, "\\").replace(/\\\"/g, '\"');
            return a;
        }, format: function (btext) {
            var text = btext.split("\n").join(" ");
            var t = [];
            var tab = 0;
            var inString = false;
            for (var i = 0, len = text.length; i < len; i++) {
                var c = text.charAt(i);
                if (inString && c === inString) {
                    if (text.charAt(i - 1) !== '\\') {
                        inString = false;
                    }
                } else if (!inString && (c === '"' || c === "'")) {
                    inString = c;
                } else if (!inString && (c === ' ' || c === "\t")) {
                    c = '';
                } else if (!inString && c === ':') {
                    c += ' ';
                } else if (!inString && c === ',') {
                    c += "\n" + String.space(tab * 2);
                } else if (!inString && (c === '[' || c === '{')) {
                    tab++;
                    c += "\n" + String.space(tab * 2);
                } else if (!inString && (c === ']' || c === '}')) {
                    tab--;
                    c = "\n" + String.space(tab * 2) + c;
                }
                t.push(c);
            }
            return t.join('');
        },
    }

})(jQuery)
