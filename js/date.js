//获取当前日期前后N天的日期
function GetDateStr(AddDayCount) {
	var dd = new Date();
	dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1; //获取当前月份的日期
	var d = dd.getDate(); //获取当前几号
	return d + "/" + m;
};

//获取当前日期前后N天为星期几
function GetDayStr(AddDayCount) {
    var dd = new Date();
    var weekDays = ["日", "一", "二", "三", "四", "五", "六"];
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var w = dd.getDay();
    return weekDays[w];
};

//判断是否为闰年
function is_leap(year){
	//闰年的条件是复合下面二者之一：
	//1.年份能被4整除，但不能被100整除；
	//2.年份能被400整除
	if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)){
		return 1;
	}
	return 0;
}

