var dd = new Date(),
    weekDays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    //获取当前日期信息
    currentYear = dd.getFullYear(),
    currentMonth = dd.getMonth() + 1,  //从Date对象返回月份(0~11)
    currentDate = dd.getDate(),  //返回一个月中的某一天(0~31)
    currentDay = weekDays[dd.getDay()],  //返回的是0~6(周日到周六)之间的一个整数
    //获取90天后的日期信息
    finalYear = getDateStr(90).split("/")[0],
    finalMonth = getDateStr(90).split("/")[1],
    finalDate = getDateStr(90).split("/")[2],
    finalDay = getDateStr(90).split("/")[3];

function initCalendar(){

}


//创建时间轴(横向显示)日历
(function initialCalendar(addDayCount){
    $(".lowest-price-lists").html("");
    $(".lowest-price-lists").css("width",(addDayCount + 1) * 100 + "px");
    for(var i  = 0; i <= addDayCount; i++){
        var $li = $("<li><a><span class='calendar-date'>" + getDateStr(i).split('/')[1] + "\/" + getDateStr(i).split("/")[2] + " " + getDateStr(i).split("/")[3] + "</span><span class='base-price'><em>&yen;</em>" + "price" + "</span></a></li>");
        $(".lowest-price-lists").append($li);
    }
})(90);

//创建弹框的日历表格
function initialCalendarTable(){

}

//点击查看90天最低价，弹出日历表格
$(".demo1 .lowest-price").click(function(){
    $(".mask").css("display","block");
    $(".lowest-price-container").css("display","block");
});

//关闭90天最低价日历
$(".lowest-price-container .close-ico").click(function(){
    $(".mask").css("display","none");
    $(".lowest-price-container").css("display","none");
});


$(".prev_date").click(function(){
    // 获取时间轴ul的属性值left
    var ulLeft = parseInt($(".lowest-price-lists").css("left"));
    if(ulLeft < 0){
        $(".lowest-price-lists").css("left",(ulLeft + 100));
        $(".prev_date").removeClass("unable");
        $(".next_date").removeClass("unable");
        if(parseInt($(".lowest-price-lists").css("left")) == 0){
            $(".prev_date").addClass("unable");
        }
    }
});

$(".next_date").click(function(){
    // 获取时间轴ul的属性值left
    var ulLeft = parseInt($(".lowest-price-lists").css("left"));
    if(ulLeft > -8400){
        $(".lowest-price-lists").css("left",(ulLeft - 100));
        $(".next_date").removeClass("unable");
        $(".prev_date").removeClass("unable");
        if(parseInt($(".lowest-price-lists").css("left")) == -8400){
            $(".next_date").addClass("unable");
        }
    }
});

