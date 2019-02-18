import axios from '@/requests/axios'
const companyFix = () =>{
	return axios({
		method:'get',
		url:'/api/company/fix',
	})
}
const companyList = (params) =>{
	return axios({
		method:'get',
		url:'/api/company',
		params:{
			num:12,
			...params
		}
	})
}
const companyGet = (id) =>{
	return axios({
		method:'get',
		url:'/api/company/'+id,
	})
}

export {
	companyFix,
	companyList,
	companyGet
}