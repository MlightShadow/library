/*
画面数据装填模块
*/
define(function () {
    var loadData = {
        dataForLoad: null,
        get_init: function (url, arrfn, callbackName, finalFunc) {
            var obj = this;
            //远程服务器数据获取
            $.ajax({
                type: 'get',
                dataType: 'jsonp',
                url: url,
                crossDomain: true,
                jsonp: 'callback',
                jsonpCallback: callbackName == undefined ? 'success_callback' : callbackName,
                async: false,
                success: function (result) {
                    obj.dataForLoad = JSON.parse(JSON.stringify(result)).result;
                    for (var i in arrfn) {
                        obj.load(arrfn[i]['e'], arrfn[i]['data'], arrfn[i]['format']);
                    }

                    //final方法执行
                    if (finalFunc != null) {
                        finalFunc();
                    } else {
                        ;
                    }
                }
            });
        },
        post_init: function (url, data) {
            //TODO
            //远程服务器数据获取
            $.ajax({
                type: 'get',
                dataType: 'jsonp',
                url: url,
                data: data,
                crossDomain: true,
                jsonp: 'callback',
                jsonpCallback: "success_callback",
                async: true,
                success: function (result) {
                    this.dataForLoad = result.result;
                }
            });
        },
        json_init: function (data) {
            //本地json获取
            this.dataForLoad = data;
        },
        load: function (el, data, format) {
            //装填方法
            $(el).empty().append(format(this.dataForLoad[data]));
        }
    }

    return {
        loadData: loadData
    }

})