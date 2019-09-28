<template>
  <a-row class="s-row">
      <a-col :span="23" :offset="0.5">
          <a-row>
            <a-col :span="24">
                <list-top :count='count'>{{currDepart}}二面已面试人员</list-top>
                <span>已选择{{total}}人,共有{{manCount}}个男生，{{womanCount}}个女生</span>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="23" :offset="1">
                <a-table :bordered="true" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="dataList" />
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="4" :offset="6">
                <a-button type='default' size='large' @click="passThis">录取为部员</a-button>
            </a-col>
            <a-col :span="4" :offset="2">
                <a-button type='default' size='large' @click="outThis">淘汰</a-button>
            </a-col>
          </a-row>
      </a-col>
  </a-row>
</template>
<script>
import listTop from './list-top'
import {second_interview_interviewed, second_interview_ADMIT, second_interview_OUT} from '../utils/API'

const columns = [{
  title: 'ID',
  dataIndex: 'mainId',
}, {
  title: '姓名',
  dataIndex: 'realName',
}, {
  title: '性别',
  dataIndex: 'sex',
}, {
  title: '分数',
  dataIndex: 'score',
}, {
  title: '印象关键字',
  dataIndex: 'impression',
}];

export default {
    data() {
        return {
            currDepart: '',
            count: 0,
            selectedRowKeys: [],
            dataList:[],
            columns,
            total:0,
            manCount:0,
            womanCount:0
        }
    },
    components: {
        listTop
    },
    async mounted(){
        this.currDepart = this.$store.state.info.department
        let info = await second_interview_interviewed(this).catch((err)=>{
            console.log(err);
            this.$notification.open({
                message: '亲，出错啦！',
                description: '请求失败，请稍候重试',
                icon: <a-icon type="frown" style="color: #108ee9" />
            });
            throw new Error('error');
        });
        info.data.data.data.forEach((ele)=>{
            ele.key = ele.mainId;
        })
        this.dataList = info.data.data.data;
        this.count = info.data.data.total;
    },
    methods:{
        async passThis(){
            let info = {
                mainIds:this.selectedRowKeys
            }
            await second_interview_ADMIT(this,info).catch((err)=>{
                console.log(err);
                 this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error')
            })
            info = await second_interview_interviewed(this).catch((err)=>{
                console.log(err);
                 this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error');
            });
            info.data.data.data.forEach((ele)=>{
                ele.key = ele.mainId;
            })
            this.dataList = info.data.data.data;
            this.count = info.data.data.total;
            this.selectedRowKeys = [];
            this.manCount = 0;
            this.womanCount = 0;
            this.total = this.selectedRowKeys.length;
            this.$message.success('成功通过');
        },
        onSelectChange (selectedRowKeys,col) {
            this.total = selectedRowKeys.length;
            let man = 0;
            let woman = 0;
            col.forEach((ele)=>{
                if(ele.sex == '女'){
                    woman++;
                }else{
                    man++;
                }
            });
            this.manCount = man;
            this.womanCount = woman;
            this.selectedRowKeys = selectedRowKeys
        },
        async outThis(){
            let info = {
                mainIds:this.selectedRowKeys
            }
            await second_interview_OUT(this,info).catch((err)=>{
                console.log(err);
                 this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error')
            })
            info = await second_interview_interviewed(this).catch((err)=>{
                console.log(err);
                 this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error');
            });
            info.data.data.data.forEach((ele)=>{
                ele.key = ele.mainId;
            })
            this.dataList = info.data.data.data;
            this.count = info.data.data.total;
            this.selectedRowKeys = [];
            this.manCount = 0;
            this.womanCount = 0;
            this.total = this.selectedRowKeys.length;
            this.$message.success('成功淘汰');
        }
    }
}
</script>

<style lang="scss" scoped>
.s-row {

    .page-size {
        margin-bottom: 15px;
    }
}
</style>