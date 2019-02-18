<template>
	<span>
		<el-popover
	      v-if="is_vip"
	      placement="top"
	      width="200"
	      trigger="hover">
	      <slot name="content">
	        <i class="iconfont icon-vip"></i>
	        该企业为网站VIP
	      </slot>
	        <i slot="reference" class="iconfont icon-vip" :style="{'font-size':size}"></i>
	    </el-popover>
	    <el-popover
	      v-if="is_auth"
	      placement="top"
	      width="300"
	      trigger="hover">
	      <slot name="content">
	        <i class="iconfont icon-auth"></i>
	        已上传营业执照并完成资质认证
	      </slot>
	        <i slot="reference" class="iconfont icon-auth" :style="{'font-size':size}"></i>
	    </el-popover>
	</span>
</template>
<script>
export default{
	name:"CompanyTag",
	data(){
		return {

		}
	},
	props:{
		is_auth:{
			default:false,
			type:[Boolean,Number]
		},
		is_vip:{
			default:false,
			type:[Boolean,Number]
		},
		size:{
			default:'16px',
			type:String
		}
	}
}
</script>

<style lang="scss" scoped="scoped">
	.iconfont{
		margin-right: 10px;
	}
</style>