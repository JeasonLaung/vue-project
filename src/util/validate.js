
// ``email``      邮箱验证</br>
// ``mobile``     手机验证</br>
// ``ip``         ip验证</br>
// ``num``        只能是数字</br>
// ``numAlpha``   一定要含有数字和字母</br>
// ``numOrAlpha`` 一定要含有数字或字母</br>
// ``require``    有值</br>
// ``max``        最大字符串</br>
// ``min``        最小字符串</br>
// ``len``        长度</br>
// ``Reg``        正则</br>
// ``before``     在时间之前</br>
// ``after``      在时间之后</br>
// ``between``    在时间段之间</br>
class validate{
	//0未运行，1成功,2失败
	#status = 0
	#res = null
	constructor(o,msg=null){
		if (o) {
			this.check(o,msg)
		}
	}

	/*
	 * 
	 * 内置验证
	 *
	 */
	msg = {
		email:(n)=>'邮箱地址有误！',
		mobile:(n)=>'手机号有误！',
		ip:(n)=> 'ip地址非法！',
		
		num:(n)=>`${n}只能为数字`,
		numAlpha:(n)=>`${n}只能存在字母及数字`,
		numOrAlpha:(n)=>`${n}只能存在字母或数字`,

		require:(n)=>`${n}不能为空`,
		max:(n,max)=>`${n}不能超过${max}个字符`,
		min:(n,min)=>`${n}最少要${min}个字符`,
		len:(n,min,max)=>`${n}字符长度必须在${min}-${max}之间`,
		Reg:(n)=>`${n}不符合格式要求`,


		notChs:(n )=>`${n}不能存在中文`,


		before:(v)=>`必须在${v}前`,
		after:(v)=>`必须在${v}后`,

		lt:(v)=>`必须小于${v}`,
		lg:(v)=>`必须大于${v}`,

		between:(v1,v2)=>`必须在${v1}至${v2}`
	}
	compare = {
		parse(str){
			if (/^\d+$/.test(str)) {
				return parseInt(str);
			}
			return str
	 	},
		before(setDate,getDate){
			return (new Date(this.parse(setDate))).getTime() > (new Date(this.parse(getDate))).getTime()
		},
		after(setDate,getDate){
			return (new Date(this.parse(setDate))).getTime() < (new Date(this.parse(getDate))).getTime()
		},
		lt(setDate,getDate){
			return setDate > getDate
		},
		lg(setDate,getDate){
			return setDate < getDate
		},
		between(beginDate,endDate,getDate){
			let getTime = (new Date(this.parse(getDate))).getTime();
			let beginTime = (new Date(this.parse(beginDate))).getTime();
			let endTime = (new Date(this.parse(endDate))).getTime();

			return getTime > beginTime && endDate > beginTime;
		}
	}
	re = {
		
		email: ()=>new RegExp('^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$'),
		mobile:()=>new RegExp('^1[34578]\\d{9}$'),
		ip: ()=>new RegExp('((25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))'),
		num:()=>new RegExp('^\\d+$'),
		numAlpha:()=>new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])(.{1,})$'),
		numOrAlpha:()=>new RegExp('^[a-zA-Z0-9]{1,}$'),

		require:()=>new RegExp('.+'),
		//中文
		chs:()=>new RegExp('[\u4e00-\u9fa5]*'),
		notChs:()=>new RegExp('[^\u4e00-\u9fa5]'),

		max:(max)=>new RegExp(`^.{0,${max}}$`),
		min:(min)=>new RegExp(`^.{${min},}$`),
		len:(min,max)=>new RegExp(`^.{'+min+'}.{0,${max-min}}$`),
		Reg:(re)=>new RegExp(re),
	}

	/*
	 *
	 * Tool 工具函数
	 *
	 */

	/*
	 *
	 * 因Promise套进去之后报错(暂未知道原因)，自制promise
	 *
	 */
	then(func){
		if (this.#status === 1) {
			func(this.#res)
			this.#status = 0
			this.#res = null
		}
		return this
	}

	catch(func){
		if (this.#status === 2) {

			func(this.#res)
			this.#status = 0
			this.#res = null
		}
		return this
	}

	/*
	 *
	 * 操作函数
	 *
	 */
	check(data,msg=null){
		// data={"用户名|require":123456,"邮箱|require":456789}
		// msg={"用户名|require":"自定义消息"}
		let key,res;
		for(key in data){
			//分割名称
			let chips = key.split("|");
			//获取名称
			let name = chips[0];
			//获取验证规则
			let rules = chips[1].split('.');

			//获取这条数据
			let this_data = data[key];
			for (var i = 0; i < rules.length; i++) {
				//获取规则名称
				let re_name = rules[i].match(/(.+?)\((.*)\)/)[1];
				//获取规则参数
				let re_params = rules[i].match(/(.+?)\((.*)\)/)[2];

				//核心验证
				if (this.compare[re_name]) {
					let params = re_params.split(",");
					res = this.compare[re_name](...params,this_data)
					re_params = params.map((v)=>`\"${v}\"`).join(",")
				}else{
					res = eval(`(this.re.${re_name}(${re_params})).test(\"${this_data}\")`);
				}

				

				if (res !== true) {
					//核心输出
					if (null!==msg && undefined!==msg[name+"|"+re_name]) {
						this.#res = msg[name+"|"+re_name];
					}else{

						this.#res = eval(`this.msg.${re_name}(\"${name}\",${re_params})`);
						// console.log(this.#res)
					}
					//失败
					this.#status = 2
					return this;
				}
			}
		}
		//成功
		this.#status = 1
		this.#res = true
		return this;
	}
}

export default{
	'$validate':new validate()
}