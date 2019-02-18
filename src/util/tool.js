// 判处异常
if (!Date.prototype.format) {
	Date.prototype.format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}
}

const urlToJson = url => {
	let temp = {}
		url.replace(/([^?&]+)=([^?&]+)/g, function(s, v, k) {
		temp[v] = decodeURIComponent(k);
		return k + '=' +  v;
	});
	return temp
}
const jsonToUrl = json => {
	if (!json) {
		return;
	}
	let temp = '';
	let k,i;
	for(k in json){
		if (json[k] instanceof Array /*参数为数组*/) {
			for (i = 0; i < json[k].length; i++) {
				temp += k + '=' + json[k][i] + '&';
			}
			continue;
		}
		temp += k + '=' + json[k] + '&'
	}
	return "?"+temp.replace(/.$/,"")
}

//坑爹情况二，深拷贝
const deepCopy = obj =>{
  return JSON.parse(JSON.stringify(obj))
}

//去标签
const HTML2TEXT = (str)=>{
	if (str==="" || str===null || str===undefined ||  str ===false || /^ *$/.test(str)) {
		return "";
	}
	// str = str.replace(/&\w{0,4};/g,"")
	return str.replace(/(&\w{0,4};)|\s|(<[^<>]+>)/g,"");
}

//JS判断闰年代码
function isLeapYear (Year) {
	if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
		return (true);
	} else { return (false); }
}


//时间转换,8:30am，昨天，星期一，仿微信聊天
const timeConvert = (str)=>{
	//今天凌晨
	let now = new Date(),
	this_year = now.getFullYear(),
	this_month = now.getMonth()+1,
	this_Date = now.getDate(),
	today_begin = new Date(this_year+'-'+this_month+'-'+this_Date).getTime();
	//一天多长ms
	let how_today = 24*60*60*1000,
	    how_week = how_today*7,
	    how_year = how_today*7;

	if (/^\d+$/.test(str)) {
		str = parseInt(str);
	}
	//先转为时间戳
	if (typeof str !== 'number') {
		str = new Date(str).getTime()
	}

	let distant = today_begin - str;
	//今天
	if(distant < 0){
		return new Date(str).format('hh:mm:ss');
	}
	if (distant < how_today) {
		return '昨天 ' + new Date(str).format('hh:mm:ss');
	}
	if (distant < how_week) {
		let that_day = new Date(str);
		let week_arr = ['日','一','二','三','四','五','六'];
		return '星期'+week_arr[that_day.getDay()] + ' ' + that_day.format('hh:mm:ss');
	}
	
	//年
	return new Date(str).format('yyyy-MM-dd hh:mm:ss');

}

const scrollY = (y,fn,speed)=>{
	// if () {

	// }
	
	speed = speed || 10;
	let target;
	let scrollTop = document.body.scrollTop||document.documentElement.scrollTop
	let timer;
	let tmp_target = scrollTop;
	/*原位置位于下方*/
	if (scrollTop > y) {
		target = y + speed;
		timer = setInterval(()=>{
			if (tmp_target < y) {
				clearInterval(timer)
				fn()
			}
			tmp_target = tmp_target - speed; 
			// console.log(tmp_target)
			window.scrollTo(0,tmp_target)
		},3);
	}
	if (scrollTop < y) {
		target = y + speed;
		timer = setInterval(()=>{
			if (tmp_target > y) {
				clearInterval(timer)
				fn()

			}
			tmp_target = tmp_target + speed; 
			
			// console.log(tmp_target)
			window.scrollTo(0,tmp_target)
		},3);
	}
	
	
}

export {
	timeConvert,
	HTML2TEXT,
	jsonToUrl,
	urlToJson,
	isLeapYear,
	deepCopy,
	scrollY
}