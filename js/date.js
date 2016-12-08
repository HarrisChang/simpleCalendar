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
function getDateStr(addDayCount){
    var dd = new Date();
    dd.setDate(dd.getDate() + addDayCount);  //获取addDayCount天后的日期
    var weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var y = dd.getFullYear();  //获取彼时的年份
    var m = dd.getMonth() + 1;  //获取彼时的月份
    var d = dd.getDate();  //获取彼时的日期
    var w = dd.getDay();  //获取彼时的星期
    return y + "/" + m + "/" + d + "/" + weekDays[w];
};

//获取指定日期前后N天的日期
function getDateFromCurrentDate(fromDate,dayInterval){
    var curDate = new Date(Date.parse(fromDate.replace(/-/g,"/")));
    curDate.setDate(curDate.getDate()+dayInterval);
    var year = curDate.getFullYear();
    var month = (curDate.getMonth()+1)<10?"0"+(curDate.getMonth()+1):(curDate.getMonth()+1);
    var day = curDate.getDate()<10?"0"+curDate.getDate():curDate.getDate();
    return year+"-"+month+"-"+day;
};  //例如alert(getDateFromCurrentDate("2016-12-08",32));