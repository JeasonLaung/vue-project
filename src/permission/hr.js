
exports.router = [
  {
  	path:'/my',
    component:()=>import('@/views/UserMain/index.vue'),
    
    children:[
        {
        	path:'',
        	name:'my_company',
        	component:()=>import('@/views/UserMain/Hr/Company.vue'),
        	meta:{navIndex:0}
        },
        // {
        // 	path:'resume',
        // 	name:'my_resume',

        // },
        {
        	path:'info',
        	name:'my_info',
        	component:()=>import('@/views/UserMain/Student/index.vue'),

        	meta:{navIndex:1}


        },
        {
        	path:'jobs',
        	name:'my_company_jobs',
        	component:()=>import('@/views/UserMain/Student/VisitJob.vue'),
        	meta:{navIndex:2}

        },
        {
            path:'invite',
            name:'my_invite',
            component:()=>import('@/views/UserMain/Student/VisitJob.vue'),
            meta:{navIndex:3}

        },
        {
        	path:'delivery',
        	name:'my_delivery',
        	component:()=>import('@/views/UserMain/Student/VisitJob.vue'),
        	meta:{navIndex:4}

        },
        {
            path:'visit',
            name:'my_visit',
            component:()=>import('@/views/UserMain/Student/VisitJob.vue'),
            meta:{navIndex:5}

        },
        {
            path:'trail',
            name:'my_trail',
            component:()=>import('@/views/UserMain/Student/VisitJob.vue'),
            meta:{navIndex:6}

        },
        {
        	path:'account',
        	name:'my_account',
        	meta:{navIndex:7}

        },
    ],
    meta:{
    	title:"我的首页",
    }
  },
  {
    path:'/chat',
    component:()=>import('@/views/UserMain/Chat/index.vue'),
    name:'chat'
  }
]
exports.nav = [
    {
		title:'公司首页',
		url:'/my',
		icon:'company'
	},
    {
        title:'我的简介',
        url:'/my/info',
        icon:'resume'
    },
	// {
	// 	title:'完善简历',
	// 	url:'/my/resume',
	// 	icon:'resume'
	// },
	{
		title:'公司岗位',
		url:'/my/jobs',
		icon:'job'
	},
	{
		title:'我的邀请',
		url:'/my/invite',
		icon:'delivery'
	},
	{
		title:'简历投递',
		url:'/my/delivery',
		icon:'pass'
	},
	{
		title:'我看过的',
		url:'/my/visit',
		icon:'student'

	},
	{
		title:'看过我的',
		url:'/my/trail',
		icon:'trail'
	},
	{
		title:'设置账号信息',
		url:'/my/account',
		icon:'set'

	},
]

exports.navbar = [
	{
		title:'公司',
		url:'/my',
	},
	{
		title:'聊天',
		url:'/chat',
	},
    {
        title:'求职页',
        url:'/',
    },
]