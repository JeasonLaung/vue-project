import axios from '@/requests/axios'
const jobList = (params) =>{
	// page,
	// num,
	// position[],
	// keywords,
	// salary,
	// city,
	// degree,
	// experience
	if (params instanceof String) {
		return axios({
			method:'get',
			url:'/api/job'+params,
			
		})
	}else{
		return axios({
			method:'get',
			url:'/api/job',
			params:params
			
		})
	}
	
}
const jobFix = () =>{
	return axios({
		method:'get',
		url:'/api/job/fix',
	})
}
const jobHotSearch = () =>{
	return axios({
		method:'get',
		url:'/api/job/hot_search',
	})
}
const jobHot = () =>{
	return axios({
		method:'get',
		url:'/api/job/hot',
	})
}
const jobNew = () =>{
	return axios({
		method:'get',
		url:'/api/job/new',
	})
}
const jobGet = (id) =>{
	return axios({
		method:'get',
		url:'/api/job/'+id,
	})
}
// const jobSearch = ()=>{
// 	return axios({
// 		method:'get',
// 		url:'api/job/fix',
// 	})
// }

export { 
	jobList,
	jobFix,
	jobSearch,
	jobNew,
	jobHot,
	jobHotSearch,
	jobGet,
}