
exports.router = [
  {
  	path:'/my',
    component:()=>import('@/views/UserMain/index.vue'),
    
    children:[
        {
        	path:'',
        	name:'my_resume',
        	component:()=>import('@/views/UserMain/Student/index.vue'),
        	meta:{navIndex:0}
        },
        // {
        // 	path:'resume',
        // 	name:'my_resume',

        // },
        {
        	path:'visit_job',
        	name:'my_visit_job',
        	component:()=>import('@/views/UserMain/Student/VisitJob.vue'),

        	meta:{navIndex:4}


        },
        {
        	path:'visit_company',
        	name:'my_visit_company',
        	component:()=>import('@/views/UserMain/Student/VisitCompany.vue'),
        	meta:{navIndex:3}

        },
        {
        	path:'trail',
        	name:'my_trail',
        	component:()=>import('@/views/UserMain/Student/Trail.vue'),
        	meta:{navIndex:5}

        },
        {
        	path:'account',
        	name:'my_account',
        	meta:{navIndex:6}

        },
        {
        	path:'delivery',
        	name:'my_delivery',
        	component:()=>import('@/views/UserMain/Student/Delivery.vue'),
        	meta:{navIndex:1}


        },
        {
        	path:'invite',
        	name:'my_invited',
        	component:()=>import('@/views/UserMain/Student/Invite.vue'),
        	meta:{navIndex:2}

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
		title:'个人简历',
		url:'/my',
		icon:'resume'
	},
	// {
	// 	title:'完善简历',
	// 	url:'/my/resume',
	// 	icon:'resume'
	// },
	{
		title:'我的投递',
		url:'/my/delivery',
		icon:'delivery'
	},
	{
		title:'公司邀请',
		url:'/my/invite',
		icon:'pass'
	},
	{
		title:'我看过的公司',
		url:'/my/visit_company',
		icon:'company'

	},
	{
		title:'我看过的岗位',
		url:'/my/visit_job',
		icon:'job'

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
		title:'个人',
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