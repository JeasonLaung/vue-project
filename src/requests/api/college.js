import axios from '@/requests/axios'
const collegeList = (params)=>{
	if (!params) {
		params=false
	}
	return axios({
		method:"get",
		url:'/api/college',
		params:{
			...params
		}
	});
}
const collegeGet = (id)=>{
	return axios({
		method:"get",
		url:'/api/college/'+id,
	});
}

const collegeYears = (id)=>{
	return axios({
		method:"get",
		url:'/api/college/'+id+'/years',
	});
}

const collegeMajors = (school_id,year)=>{
	return axios({
		method:"get",
		url:'/api/college/'+school_id+'/year/'+year+'/majors',
	});
}

const collegeStudents = (school_id,year,major_id)=>{
	return axios({
		method:"get",
		url:'/api/college/'+school_id+'/year/'+year+'/major/'+major_id+'/students',
	});
}


export {
	collegeList,
	collegeGet,
	collegeYears,
	collegeMajors,
	collegeStudents
}