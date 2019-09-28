<template>
   <a-row class="s-row">
     <a-col :span="23" :offset="0.5">
         <a-row>
           <a-col :span="24">
               <list-top :count="count">{{currDepart}}二面待面试人员</list-top>
           </a-col>
         </a-row>
         <a-row class="table">
            <a-col :span="22" :offset="1">
                <a-row class="table-top">
                    <a-col :span='2'>序号</a-col>
                    <a-col :span='3' :offset='1'>姓名</a-col>
                    <a-col :span='2' :offset='1'>性别</a-col>
                    <a-col :span='4' :offset='2'>电话</a-col>
                    <a-col :span='4'>QQ</a-col>
                    <a-col :span='2'>一面分数</a-col>
                </a-row>
                <a-row class="table-item" v-for="(item,index) in dataList" :key="index">
                    <!-- <a-col :span='2'>{{(index+1) < 10 ? `0${index+1}`:index+1}}</a-col> -->
                    <a-col :span='2'>{{item.mainId}}</a-col>
                    <a-col :span='3' :offset='1'>{{item.realName}}</a-col>
                    <a-col :span='2' :offset='1'>{{item.sex}}</a-col>
                    <a-col :span='4' :offset="2">{{item.telNo}}</a-col>    
                    <a-col :span='4' >{{item.wechat}}</a-col>
                    <a-col :span='2' >{{item.score}}</a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row class="page-size">
            <a-col :span="10" :offset="16">
                <a-pagination v-model="pagination_current" :total="count" @change="changePage"/>
            </a-col>
        </a-row>
        <a-row>
          <a-col :span="4" :offset="18">
              <a-button type="default" size="large">导出二面名单</a-button>
          </a-col>
        </a-row>
     </a-col>
   </a-row>
</template>

<script>
import listTop from './list-top.vue'
import {second_interview_without} from '../utils/API'

// const data=require('../mock/member.json')
export default {
  data () {
    return {
        dataList:[],
        currDepart:'',
        count:0,
        pagination_current: 1,
    }
  },
  components:{
      listTop
  },
  async mounted(){
    this.currDepart = this.$store.state.info.department
    let info = await second_interview_without(this,1).catch((err)=>{
      console.log(err);
      this.$notification.open({
          message: '亲，出错啦！',
          description: '请求失败，请稍候重试',
          icon: <a-icon type="frown" style="color: #108ee9" />
      });
      throw new Error('error');
    });
    this.dataList = info.data.data.data;
    this.count = info.data.data.total;
  },
  methods:{
    async changePage(current){
        let info = await second_interview_without(this,current).catch((err)=>{
            console.log(err);
            this.$notification.open({
                message: '亲，出错啦！',
                description: '请求失败，请稍候重试',
                icon: <a-icon type="frown" style="color: #108ee9" />
            });
            throw new Error('error');
        });
        this.dataList = info.data.data.data;
        this.count = info.data.data.total;
    }
  }
}

</script>
<style lang='scss' scoped>
  
.s-row {

    .page-size {
        margin-bottom: 15px;
    }
}
</style>