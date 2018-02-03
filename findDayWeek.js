function findDayWeek(day){
	var d=new Date(day)
	var weekday=new Array(7)
	weekday[0]="星期天"
	weekday[1]="星期一"
	weekday[2]="星期二"
	weekday[3]="星期三"
	weekday[4]="星期四"
	weekday[5]="星期五"
	weekday[6]="星期六"
	
	switch(d.getDay()){
		case 0: return WeekArray(getTodayPlus(day,-6));break;
		case 1: return WeekArray(getTodayPlus(day,0));break;
		case 2: return WeekArray(getTodayPlus(day,-1));break;
		case 3: return WeekArray(getTodayPlus(day,-2));break;
		case 4: return WeekArray(getTodayPlus(day,-3));break;
		case 5: return WeekArray(getTodayPlus(day,-4));break;
		case 6: return WeekArray(getTodayPlus(day,-5));break;
	
	}
}

function WeekArray(beginDay){
	var weekArray = {
		preWeek: [],
		thisWeek: [],
		nextWeek: []
	}
	
	for(var i = 0; i < 7; i++){
		weekArray.thisWeek.push(getTodayPlus(beginDay, i));
	}
		
	for(var i = 7; i < 14; i++){
		weekArray.nextWeek.push(getTodayPlus(beginDay, i));
	}
	
	for(var i = -1; i > -8; i--){
		weekArray.preWeek.unshift(getTodayPlus(beginDay, i));
	}

	return weekArray;
}

function getTodayPlus(day, add) {
    var thisDay = new Date(day);
    var todayms = thisDay.getTime() + (add * 24 * 60 * 60 * 1000)
    thisDay.setTime(todayms);
    return thisDay;
}