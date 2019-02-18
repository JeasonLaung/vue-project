const isFull = (o)=>{
	let values = Object.values(o);
	for (var i = 0; i < values.length; i++) {
		if(values[i] === null || values[i] === false || values[i] === '' || JSON.stringify(values[i]) === '{}' || JSON.stringify(values[i]) === '[]'){
			//不包含0
			return false;
		}
	}
	return true;
}
const email = (em)=>{
	return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(em) ? true : '邮箱地址不正确'
}
const has = (o)=>{
	// {"邮箱":605251963@qq.com}
	let keys = Object.keys(o),
		values = Object.values(o);
	let i,res;
	for(i in o){
		res = /.+/.test(o[i]);
		if (res === false) {
			return i+"不能为空"
		}
	}
	return true;

	// if (typeof value == 'string') {
	// 	return /.+/.test(value) ? true : name+'不能为空'
	// }
	// let res;
	// for (var i = 0; i < value.length; i++) {
	// 	res = /.+/.test(value[i])
	// 	if (res !== true) {
	// 		return name[i] + '不能空'
	// 	}
	// }
	// return true;
}

export default {
	isFull,
	email,
	has,
}