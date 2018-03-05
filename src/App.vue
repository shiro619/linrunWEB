<template>
	<div id="app" style="min-width: 1500px;">
		<router-view></router-view>
	</div>
</template>

<script>
  export default{
    name: 'APP'
  }
</script>
<!--全局样式-->
<style>
  <!--默认按钮颜色-->
  /*.el-table .el-button--warning{*/
    /*color: #fff;*/
    /*background-color: #fe8809!important;*/
    /*border-color: #fe8809;*/
  /*}*/
  .el-table .el-button--warning {
    background-color: #fe8809!important;
  }
  .el-table .el-button--warning:hover{
    background-color: #f66c13!important;
  }
  .el-table .el-button--primary{
    background-color: #357ced !important;
  }
  .el-table .el-button--primary:hover{
    background-color: #226ce3 !important;
  }

  /*input样式*/
  .postInfo-container .el-form-item{
    margin-bottom: 30px;
  }
  .createPost-main-container h3{
    font-size: 18px;
    margin-bottom: 40px;
  }

  .createPost-main-container .postInfo-container-item .el-form-item__label{
    text-align: left;
  }

  .createPost-main-container .postInfo-container-item .el-input{
    width: 80%;
  }

  /*.createPost-container>h2{*/
    /*font-size: 24px;*/
    /*position: absolute;*/
    /*top: -80px;*/
  /*}*/
</style>
