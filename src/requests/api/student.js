import axios from '@/requests/axios'
const studentSetInfo = (data) =>{
	return axios({
		method:'put',
		url:'/api/student/info',
		data:data
	})
}
const studentSetDescription = (data) =>{
	return axios({
		method:'put',
		url:'/api/student/description',
		data:data
	})
}
export {
	studentSetInfo,
	studentSetDescription
}