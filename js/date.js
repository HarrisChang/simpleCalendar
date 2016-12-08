//判断是否为闰年
function isLeap(year) {
    //闰年的条件是符合下面二者之一：
    // 1.年份能被4整除，但不能被100整除；
    // 2.年份能被400整除。
    if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0) ){
        return 1;
    }
    return 0;
};

//获取当前日期前后N天的日期
/*function getDateStr(addDayCount){
    var dd = new Date();
    dd.setDate(dd.getDate() + addDayCount);  //获取addDayCount天后的日期
    var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var y = dd.getFullYear();  //获取彼时的年份
    var m = dd.getMonth() + 1;  //获取彼时的月份
    var d = dd.getDate();  //获取彼时的日期
    var w = dd.getDay();  //获取彼时的星期
    return y + "/" + m + "/" + d + "/" + weekDays[w];
};*/

//获取指定日期前后N天的日期
function getDateFromCurrentDate(fromDate,dayInterval){
    var curDate = new Date(Date.parse(fromDate.replace(/-/g,"/")));
    curDate.setDate(curDate.getDate()+dayInterval);
    var year = curDate.getFullYear();
    var month = (curDate.getMonth()+1)<10?"0"+(curDate.getMonth()+1):(curDate.getMonth()+1);
    var day = curDate.getDate()<10?"0"+curDate.getDate():curDate.getDate();
    return year+"-"+month+"-"+day;
};  //例如alert(getDateFromCurrentDate("2016-12-08",32));


//日期返回
function GetDateStr(dd, AddDayCount) {
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);//获取当前月份的日期，不足10补0
    var d = dd.getDate();
    return y + "/" + m + "/" + d;
}


/*#region ****************************************判斷瀏覽器****************************************/
function isWhatBrowser() {
    var explorer = navigator.userAgent, str;
    if (explorer.indexOf("MSIE") >= 0) {
        str = "Ie";
    } else if (explorer.indexOf("Firefox") >= 0) {
        str = "Firefox";
    } else if (explorer.indexOf("Chrome") >= 0) {
        str = "Chrome";
    } else if (explorer.indexOf("Opera") >= 0) {
        str = "Opera";
    } else if (explorer.indexOf("Safari") >= 0) {
        str = "Safari";
    } else if (explorer.indexOf("Netscape") >= 0) {
        str = 'Netscape';
    } else {
        str = "Ie";
    }
    return str;
}



// date picker
var datePar, dateCallBack;
$.fn.kuiDate = function (k_date) {
    //重写k_date的参数，把所有的值初始化
    k_date = {
        isDisabled: k_date.isDisabled || '0',
        maxDate: k_date.maxDate || '',
        minDate: k_date.minDate || '',
        className: k_date.className,
        isdouble: typeof k_date.isdouble != "undefined" ? k_date.isdouble : true,
        isarea: typeof k_date.isarea != "undefined" ? k_date.isarea : true,
        ishotel: typeof k_date.ishotel != "undefined" ? k_date.ishotel : true,
        callback: k_date.callback || ''
    };
    var kDate;
    $(this).on('click', function (e) {
        $('#popup_frame,#popup_pane,#a_tips_frame,#air_down_tips').hide();
        kDate = $(this);
        datePar = $(this);
        dateCallBack = k_date.callback;
        $('#kui_d_pane').removeClass("onlyone isarea");
        if (!k_date.isdouble) { $('#kui_d_pane').addClass("onlyone"); } else {
            if (!k_date.isarea) {
                $('#kui_d_pane').addClass("isarea");
            }
        }
        kui_date_(kDate);
    })

    //清空按钮
    $('.kui_date_reset span.off').click(function () {
        //清空文本框内容
        $('#kui_d_pane').hide();
    })

    //关闭按钮
    $('.kui_date_reset span.close').click(function () {
        //清空文本框内容
        $('#kui_d_pane').hide();
    })
    function kui_date_(kDate) { //var d = new Date().getTime();
        //初始化
        $('#kui_left_t,#kui_right_t,.kui_today').html("");
        $('a.kui_prev_m,a.kui_prev_m').removeClass("disabled");
        // 给日期插件定位
        var txt_left = parseInt(kDate.parents(".iptgroup").find("[doubledate=first]").offset().left);
        if (isWhatBrowser() == "Ie") { txt_left = txt_left - 1;}
        var txt_top = parseInt(kDate.offset().top + kDate.outerHeight() + 10);
        var txt_wid = parseInt(kDate.outerWidth());
        var scrollWidth = parseInt($(window).width());
        if (txt_left + parseInt($(".kui_d_pane").width()) < scrollWidth) {
            $('#kui_d_pane').attr('style', 'left:' + txt_left + 'px; top:' + txt_top + 'px;');
        }
        else {
            $('#kui_d_pane').attr('style', 'left:' + txt_left + 'px; top:' + txt_top + 'px;');
        }
        if (kDate.parents(".iptgroup").find("[doubleDate=first]").val() == "") {
            $('#kui_d_pane').show().attr("_for", "first");
        } else {
            $('#kui_d_pane').show().attr("_for", kDate.attr("doubledate"));
        }
        if ($('#kui_d_pane').attr("_for") == "first") {
            $('#kui_d_pane .kui_d_jt').css({ left: "30px" });
        } else {
            $('#kui_d_pane .kui_d_jt').css({ left: (kDate.parents(".iptgroup").find("[doubleDate=last]").offset().left - kDate.parents(".iptgroup").find("[doubleDate=first]").offset().left) + 30 + "px" });
        }
        // 获取当前系统时间
        var kui_dd = new Date();
        if (k_date.minDate != "") {
            kui_dd = new Date(k_date.minDate);
        }
        var kui_year = kui_dd.getFullYear();
        var kui_month = kui_dd.getMonth() + 1;
        if (kui_month < 10) {
            kui_month = '0' + kui_month;
        }
        var kui_date = kui_dd.getDate();
        var kui_day = kui_dd.getDay();
        var kui_hours = kui_dd.getHours();
        var kui_minutes = kui_dd.getMinutes();
        var kui_seconds = kui_dd.getSeconds();
        var n_time = kui_dd.getTime();
        var vals = kDate.val();
        var vals_prev = kDate.parents(".iptgroup").find("[doubleDate=first]").val().replace(/\-/g, "/");
        if (kDate.parents(".iptgroup").find("[doubleDate=last]").length>0) {
            var vals_next = kDate.parents(".iptgroup").find("[doubleDate=last]").val().replace(/\-/g, "/");
        }
        if ($.trim(vals_prev) == '') {
            var now_year = kui_year;
            var now_month = kui_month;
        } else {
            if ($.trim(vals_prev).substring(0, 4).indexOf("/") != -1) {
                var now_year = new Date($.trim(vals_prev)).getFullYear();
                var now_month = new Date($.trim(vals_prev)).getMonth();
            } else {
                var now_year = $.trim(vals_prev).substring(0, 4);
                var now_month = $.trim(vals_prev).substring(5, 7);
            }
        }
        $('.kui_today').text(now_year + "年" + now_month + "月");
        if (now_year == new Date().getFullYear() && now_month * 1 == (new Date().getMonth() * 1 + 1)) {
            $(".kui_prev_m").addClass("disabled");
        } else {
            $(".kui_prev_m").removeClass("disabled");
        }
        if (now_year == (new Date().getFullYear() * 1 + 1) && now_month * 1 == (new Date().getMonth() * 1 + 1)) {
            $(".kui_next_m").addClass("disabled");
        } else {
            $(".kui_next_m").removeClass("disabled");
        }

        // 上月下月
        $('a.kui_prev_m').unbind("click");
        $('a.kui_prev_m').click(function () {
            if ($(this).hasClass("disabled")) return;
            var kui_y = now_year;
            var kui_m = now_month;
            if (kui_m == 1) {
                now_year = kui_y - 1;
                now_month = '12';
            }
            if (kui_m > 1 && kui_m < 11) {
                now_month = '0' + (kui_m - 1);
            }
            if (kui_m > 10 && kui_m < 13) {
                now_month = kui_m - 1;
            }
            if (now_year == new Date().getFullYear() && now_month * 1 == (new Date().getMonth() * 1 + 1)) {
                $(".kui_prev_m").addClass("disabled");
            } else {
                $(".kui_prev_m").removeClass("disabled");
            }
            if (now_year == (new Date().getFullYear() * 1 + 1) && now_month * 1 == (new Date().getMonth() * 1 + 1)) {
                $(".kui_next_m").addClass("disabled");
            } else {
                $(".kui_next_m").removeClass("disabled");
            }
            $('.kui_today').text(now_year + "年" + now_month + "月");
            change_date('left');
            if (k_date.isdouble) {
                change_date('right');
            }
        });
        $('a.kui_next_m').unbind("click");
        $('a.kui_next_m').click(function () {
            if ($(this).hasClass("disabled")) return;
            var kui_y = now_year;
            var kui_m = now_month;
            if (kui_m > 0 && kui_m < 9) {
                now_month = '0' + (parseInt(kui_m, 10) + 1);
            }
            if (kui_m > 8 && kui_m < 12) {
                now_month = parseInt(kui_m, 10) + 1;
            }
            if (kui_m == 12) {
                now_year++;
                now_month = '01';
            }
            if (now_year == new Date().getFullYear() && now_month * 1 == (new Date().getMonth() * 1 + 1)) {
                $(".kui_prev_m").addClass("disabled");
            } else {
                $(".kui_prev_m").removeClass("disabled");
            }
            if (now_year == (new Date().getFullYear() * 1 + 1) && now_month * 1 == (new Date().getMonth() * 1 + 1)) {
                $(".kui_next_m").addClass("disabled");
            } else {
                $(".kui_next_m").removeClass("disabled");
            }
            $('.kui_today').text(now_year + "年" + now_month + "月");
            change_date('left');
            if (k_date.isdouble) {
                change_date('right');
            }
        });
        change_date('left');
        if (k_date.isdouble) {
            change_date('right');
        }
        // 日期变化函数
        function change_date(dir) {
            // 日期 -- 根据年和月计算出来
            var kui_y = now_year;
            var kui_m = now_month;
            if (dir == 'right') {
                if (kui_m == 12) {
                    kui_y++;
                    kui_m = '01';
                }
                else {
                    kui_m++;
                    if (kui_m < 10) {
                        kui_m = '0' + kui_m;
                    }
                }
                $('.kui_tomorrow').text(kui_y + "年" + kui_m + "月");
            }
            else {
                kui_m = (kui_m < 10) ? '0' + parseInt(kui_m, 10) : kui_m;
            }
            var kui_max_date = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            if (((kui_y % 4 == 0) && (kui_y % 100 != 0)) || (kui_y % 400 == 0)) {
                kui_max_date[1] = 29;
            }
            var this_max_date = kui_max_date[kui_m - 1];
            // 计算星期数
            var C = 1;  // C是从这一年的元旦算起到这一天为止（包括这一天是内）的天数
            for (var i = 0; i < kui_m - 1; i++) {
                C += kui_max_date[i];
            }
            var kui_si = ((kui_y - 1) % 4) == 0 ? ((kui_y - 1) / 4) : ((kui_y - 1 - (kui_y - 1) % 4) / 4);
            var kui_yibai = ((kui_y - 1) % 100) == 0 ? ((kui_y - 1) / 100) : ((kui_y - 1 - (kui_y - 1) % 100) / 100);
            var kui_sibai = ((kui_y - 1) % 400) == 0 ? ((kui_y - 1) / 400) : ((kui_y - 1 - (kui_y - 1) % 400) / 400);
            var S = kui_y - 1 + kui_si - kui_yibai + kui_sibai + C; //求出S的值之后，除以7，余几就是星期几；除尽了就是星期日
            var aa = (kui_date - 1) % 7;
            var bb = S % 7; // 每月1号的星期数
            // TD表格的行数
            var kui_td_lines = (bb + this_max_date) % 7 == 0 ? (bb + this_max_date) / 7 : (bb + this_max_date - (bb + this_max_date) % 7) / 7 + 1;

            //动态添加表格数据
            var kui_tbody;
            if (dir == 'left') {
                kui_tbody = $('#kui_left_t');
            }
            else {
                kui_tbody = $('#kui_right_t');
            }
            kui_tbody.html('');
            var arr_tr = [];

            for (var i = 0; i < kui_td_lines; i++) {
                if (i == 0) {
                    // 第一行中有空白的单元格
                    for (var j = 1; j < bb + 1; j++) {
                        arr_tr.push('<dt class="kui_td_kong">&nbsp;</dt>');
                    }
                    // 第一行中有值单元格
                    var kui_i = 1;
                    for (var j = bb + 1; j <= 7; j++) {
                        arr_tr.push('<dt onmouseover="kui_mouseover_(this,' + k_date.isdouble + ',' + k_date.isarea + ')" onmouseout="kui_mouseout_(this)" onclick="kui_click_(this,' + kui_y + "," + kui_m + "," + (7 * i + kui_i) + "," + k_date.isdouble + "," + k_date.isarea + "," + k_date.ishotel + ')">' + (7 * i + kui_i) + '</dt>');
                        kui_i++;
                    }
                    $('.kui_top_tr').removeClass('kui_top_tr');
                } else if (i == kui_td_lines - 1) {
                    var kui_i = 8 - bb;
                    for (var j = 1; j <= 7; j++) {
                        if ((7 * (i - 1) + kui_i) > this_max_date) {
                            arr_tr.push('<dt class="kui_td_kong">&nbsp;</dt>');
                        }
                        else {
                            arr_tr.push('<dt onmouseover="kui_mouseover_(this,' + k_date.isdouble + ',' + k_date.isarea + ')" onmouseout="kui_mouseout_(this)" onclick="kui_click_(this,' + kui_y + "," + kui_m + "," + (7 * (i - 1) + kui_i) + "," + k_date.isdouble + "," + k_date.isarea + "," + k_date.ishotel + ')">' + (7 * (i - 1) + kui_i) + '</dt>');
                        }
                        kui_i++;
                    }
                } else {
                    var kui_i = 8 - bb;
                    for (var j = 1; j <= 7; j++) {
                        arr_tr.push('<dt onmouseover="kui_mouseover_(this,' + k_date.isdouble + ',' + k_date.isarea + ')" onmouseout="kui_mouseout_(this)" onclick="kui_click_(this,' + kui_y + "," + kui_m + "," + (7 * (i - 1) + kui_i) + "," + k_date.isdouble + "," + k_date.isarea + "," + k_date.ishotel + ')">' + (7 * (i - 1) + kui_i) + '</dt>');
                        kui_i++;
                    }
                }

            }
            kui_tbody.html(arr_tr.join(''));

            //是否有最大时间
            var kui_dd_max = "";
            if (k_date.maxDate == "") {
                kui_dd_max = new Date(new Date().getTime() + 86400000 * 365); //默认1年
            } else {
                kui_dd_max = new Date(k_date.maxDate);
            }
            //遍歷td加顏色

            if (k_date.isdouble) {
                if (k_date.isarea) {
                    kui_tbody.find("dt").each(function () {
                        if ($.trim($(this).text()) != "") {
                            var v = kui_y + "/" + kui_m + "/" + $(this).text();
                            if (new Date(v).getTime() < kui_dd.getTime()) {
                                $(this).addClass("kui_td_hui");//小於今天
                            } else if (new Date(v).getTime() > kui_dd_max.getTime()) {
                                $(this).addClass("kui_td_hui");//大於1年后今天
                            } else {
                                if (new Date(vals_prev).getTime() == new Date(v).getTime() || new Date(vals_next).getTime() == new Date(v).getTime()) {
                                    if (vals_prev == "") {
                                        return;
                                    }
                                    if (new Date(vals_prev).getTime() == new Date(v).getTime()) $(this).addClass("kui_not_kong td_select first");
                                    if (new Date(vals_next).getTime() == new Date(v).getTime()) $(this).addClass("kui_not_kong td_select last");
                                } else if (new Date(v).getTime() < new Date(vals_next).getTime() && new Date(v).getTime() > new Date(vals_prev).getTime()) {
                                    $(this).addClass("kui_not_kong td_hover");
                                } else {
                                    if (vals_prev != "") {
                                        if (k_date.ishotel) {
                                            if (new Date(v).getTime() < new Date(vals_prev).getTime() || new Date(v).getTime() > new Date((new Date(vals_prev) / 1000 + 86400 * 30) * 1000).getTime()) {
                                                if (datePar.attr("doubleDate") == "last") {
                                                    $(this).addClass("kui_td_hui");
                                                } else {
                                                    $(this).addClass("kui_not_kong");
                                                }
                                            } else {
                                                $(this).addClass("kui_not_kong");
                                            }
                                        } else {
                                            if (new Date(v).getTime() < new Date(vals_prev).getTime()) {
                                                if (datePar.attr("doubleDate") == "last") {
                                                    $(this).addClass("kui_td_hui");
                                                } else {
                                                    $(this).addClass("kui_not_kong");
                                                }
                                            } else {
                                                $(this).addClass("kui_not_kong");
                                            }
                                        }
                                    } else {
                                        $(this).addClass("kui_not_kong");
                                    }
                                }
                            }
                        }
                    })
                } else {
                    kui_tbody.find("dt").each(function () {
                        var v = kui_y + "/" + kui_m + "/" + $(this).text();
                        if (new Date(v).getTime() < kui_dd.getTime()) {
                            $(this).addClass("kui_td_hui");//小於今天
                        } else if (new Date(v).getTime() > kui_dd_max.getTime()) {
                            $(this).addClass("kui_td_hui");//大於1年后今天
                        } else {
                            if (vals_prev != "" && new Date(vals_prev).getTime() == new Date(v).getTime()) {
                                $(this).addClass("kui_not_kong td_select_")
                            }
                        }
                    })
                }
            } else {
                kui_tbody.find("dt").each(function () {
                    var v = kui_y + "/" + kui_m + "/" + $(this).text();
                    if (new Date(v).getTime() < kui_dd.getTime()) {
                        $(this).addClass("kui_td_hui");//小於今天
                    } else if (new Date(v).getTime() > kui_dd_max.getTime()) {
                        $(this).addClass("kui_td_hui");//大於1年后今天
                    } else {
                        if (vals_prev != "" && new Date(vals_prev).getTime() == new Date(v).getTime()) {
                            $(this).addClass("kui_not_kong td_select_")
                        }
                    }
                })
            }

        }
        // 清除日期按钮
        $('.kui_clean_btn').click(function () {
            kDate.val('');
        });
        // 关闭日期插件
        $('.kui_close_btn').click(function () {
            $('#kui_d_pane').hide();
        });
        //var t = new Date().getTime();
        //alert(t-d);
    }
}
// 点击文档的其它地方让日期插件关闭
$(function () {
    $(document).mousedown(function (e) {
        var e = e || event;
        var data_pane = $(e.target).closest('.kui_data_content_pane');
        var t_id = $(e.target).attr('t_id');
        if (t_id == 'kui_date') {

        }
        else if (typeof (data_pane[0]) == 'undefined') {
            $('#kui_d_pane').hide();
        }
    });
});
$(function () {
    /* 日期插件的HTML元素 */
    var kui_div_date = '<div class="kui_d_pane" id="kui_d_pane" style="display:none;"><div class="kui_data_content_pane"><div class="kui_d_jt"><img src="/images/jt.png" /></div><div class="kui_prev_next_month"><a href="javascript:;" class="kui_prev_m"></a><span class="kui_today"></span><a href="javascript:;" class="kui_next_m"></a><span class="kui_tomorrow"></span></div><div id="left_table"><dl class="kui_data_tab"><dt class="d_th_bg">' + "日" + '</dt><dt>' + "一" + '</dt><dt>' + "二" + '</dt><dt>' + "三" + '</dt><dt>' + "四" + '</dt><dt>' + "五" + '</dt><dt class="d_th_bg">' + "六" + '</dt></dl><dl class="kui_date_info" id="kui_left_t"></dl></div><div id="right_table"><dl class="kui_data_tab"><dt class="d_th_bg">' + "日" + '</dt><dt>' + "一" + '</dt><dt>' + "二" + '</dt><dt>' + "三" + '</dt><dt>' + "四" + '</dt><dt>' + "五" + '</dt><dt class="d_th_bg">' + "六" + '</dt></dl><dl class="kui_date_info" id="kui_right_t"></dl></div><div class="kui_date_reset"><span class="off">' + "清空" + '</span><span class="close">' + "关闭" + '</span></div></div></div>';
    $('body').append(kui_div_date);
})
//鼠标移上
function kui_mouseover_(obj, isdouble, isarea) {
    if (isdouble&&isarea) {
        if ($(obj).hasClass("kui_not_kong") && $(obj).parents("#kui_d_pane").attr("_for") == "first") {
            if (!$(obj).hasClass("td_select")) {
                if (!$(obj).hasClass("td_hover")) {
                    $(obj).css({ "background": "url(/images/date_ico.png) no-repeat -80px 0 #ececec" });
                } else {
                    $(obj).css({ "background": "url(/images/date_ico.png) no-repeat -80px 0 #b3ddf0", "color": "#543376" });
                }
            } else {
                if ($(obj).hasClass("first")) {
                    $(obj).css({ "background-position": "-160px 0" });
                }
            }
        }
        if ($(obj).hasClass("kui_not_kong") && $(obj).parents("#kui_d_pane").attr("_for") == "last") {
            if (!$(obj).hasClass("td_select")) {
                if (!$(obj).hasClass("td_hover")) {
                    $(obj).css({ "background": "url(/images/date_ico.png) no-repeat -120px 0 #ececec" });
                } else {
                    $(obj).css({ "background": "url(/images/date_ico.png) no-repeat -120px 0 #b3ddf0", "color": "#543376" });
                }
            } else {
                if ($(obj).hasClass("last")) {
                    $(obj).css({ "background-position": "-200px 0" });
                }
            }
        }
    } else {
        $(obj).css({ "background": "#b3ddf0" });
    }
}
//鼠标移走
function kui_mouseout_(obj) {
    $(obj).removeAttr("style");
}

//点击事件
function kui_click_(obj, y, m, d, isdouble, isarea, ishotel) {
    var cla = obj.className;
    if (m < 10) {
        m = "0" + m;
    }
    //如果是單日曆
    if (!isdouble) {
        if (cla.indexOf('kui_td_hui') < 0) {
            datePar.parents(".iptgroup").find("[doubleDate=first]").val(y + "/" + m + "/" + d);
            $('#kui_d_pane').hide();
            var o = datePar.attr("tabindex") * 1 + 1;
            if ($("body").find("input[tabindex=" + o + "]").hasClass("doubledate")) {
                $("body").find("input[tabindex=" + o + "]").click();
            } else {
                $("body").find("input[tabindex=" + o + "]").focus();
            }
        }
    } else {
        if (!isarea) {
            if (cla.indexOf('kui_td_hui') < 0) {
                datePar.parents(".iptgroup").find("[doubleDate=first]").val(y + "/" + m + "/" + d);
                $('#kui_d_pane').hide();
                var o = datePar.attr("tabindex") * 1 + 1;
                if ($("body").find("input[tabindex=" + o + "]").is(":visible")) {
                    if ($("body").find("input[tabindex=" + o + "]").hasClass("doubledate")) {
                        $("body").find("input[tabindex=" + o + "]").click();
                    } else {
                        $("body").find("input[tabindex=" + o + "]").focus();
                    }
                }
            }
        } else {
            //
            if (cla.indexOf('kui_td_hui') < 0) {
                if ($("#kui_d_pane").attr("_for") == "first") {
                    //選擇第一個文本框
                    datePar.parents(".iptgroup").find("[doubleDate=first]").val(y + "/" + m + "/" + d);
                    if (cla.indexOf("last") < 0) {
                        if (datePar.parents(".iptgroup").find("[doubleDate=last]").val() == "") {
                            var ND = new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val())
                            datePar.parents(".iptgroup").find("[doubleDate=last]").val(GetDateStr(ND, 2));//自动默认2天
                        } else {
                            if (new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val()).getTime() > new Date(datePar.parents(".iptgroup").find("[doubleDate=last]").val()).getTime()) {
                                var ND = new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val())
                                datePar.parents(".iptgroup").find("[doubleDate=last]").val(GetDateStr(ND, 2));//自动默认2天
                            }
                            if (ishotel && new Date(datePar.parents(".iptgroup").find("[doubleDate=last]").val()).getTime() - new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val()).getTime() > 2592000000) {
                                var ND = new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val())
                                datePar.parents(".iptgroup").find("[doubleDate=last]").val(GetDateStr(ND, 30));
                            }
                        }
                    } else {
                        if (ishotel) {
                            datePar.parents(".iptgroup").find("[doubleDate=last]").val("");
                        } else {
                            if (datePar.parents(".iptgroup").find("[doubleDate=last]").val() == "") {
                                var ND = new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val())
                                datePar.parents(".iptgroup").find("[doubleDate=last]").val(GetDateStr(ND, 2));//自动默认2天
                            } else {
                                if (new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val()).getTime() > new Date(datePar.parents(".iptgroup").find("[doubleDate=last]").val()).getTime()) {
                                    var ND = new Date(datePar.parents(".iptgroup").find("[doubleDate=first]").val())
                                    datePar.parents(".iptgroup").find("[doubleDate=last]").val(GetDateStr(ND, 2));//自动默认2天
                                }
                            }
                        }
                    }
                    datePar.parents(".iptgroup").find("[doubleDate=last]").click();
                } else {
                    if (ishotel) {
                        if (cla.indexOf("first") < 0) {
                            datePar.parents(".iptgroup").find("[doubleDate=last]").val(y + "/" + m + "/" + d);
                            $('#kui_d_pane').hide();
                            var o = datePar.attr("tabindex") * 1 + 1;
                            if ($("body").find("input[tabindex=" + o + "]").is(":visible")) {
                                if ($("body").find("input[tabindex=" + o + "]").hasClass("doubledate")) {
                                    $("body").find("input[tabindex=" + o + "]").click();
                                } else {
                                    $("body").find("input[tabindex=" + o + "]").focus();
                                }
                            }
                        }
                    } else {
                        datePar.parents(".iptgroup").find("[doubleDate=last]").val(y + "/" + m + "/" + d);
                        $('#kui_d_pane').hide();
                        var o = datePar.attr("tabindex") * 1 + 1;
                        if ($("body").find("input[tabindex=" + o + "]").is(":visible")) {
                            if ($("body").find("input[tabindex=" + o + "]").hasClass("doubledate")) {
                                $("body").find("input[tabindex=" + o + "]").click();
                            } else {
                                $("body").find("input[tabindex=" + o + "]").focus();
                            }
                        }
                    }
                }
            }
        }
    }
    //回調
    if (typeof dateCallBack == "function") {
        dateCallBack();
    }
}