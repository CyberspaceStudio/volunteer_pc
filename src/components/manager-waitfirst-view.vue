<template>
<a-row class="s-row">
    <a-col :span="23" :offset="0.5">
        <a-row>
            <a-col :span="24">
                <list-top :count='count'>{{currDepart}}待面试人员</list-top>
            </a-col>
        </a-row>
        <a-row class="table">
            <a-col :span="22" :offset="1">
                <a-row class="table-top">
                    <a-col :span='2'>ID</a-col>
                    <a-col :span='3' :offset='1'>姓名</a-col>
                    <a-col :span='2' :offset='1'>性别</a-col>
                    <a-col :span='5' :offset="2">电话</a-col>
                    <a-col :span="6" :offset="2">QQ</a-col>
                </a-row>
                <a-row class="table-item" v-for="(item,index) in dataList" :key="index">
                    <!-- <a-col :span='2'>{{(index+1) < 10 ? `0${index+1}`:index+1}}</a-col> -->
                    <a-col :span='2'>{{item.mainId}}</a-col>
                    <a-col :span='3' :offset='1'>{{item.realName}}</a-col>
                    <a-col :span='2' :offset='1'>{{item.sex}}</a-col>
                    <a-col :span='5' :offset="2">{{item.telNo}}</a-col>    
                    <a-col :span="6" :offset="2">{{item.wechat}}</a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row class="page-size">
            <a-col :span="10" :offset="16">
                <a-pagination v-model="pagination_current" :total="count" @change="changePage"/>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="4" :offset="10">
                <a-button type='default' size='large' @click="send_msg">发面试通知</a-button>
            </a-col>
            <a-col :span="4" :offset="2">
                <a-button type='default' size='large' @click="export_wait">导出生成面试名单</a-button>
            </a-col>
        </a-row>
    </a-col>
    <a-modal
      title="Basic Modal"
      v-model="visible"
      @ok="handleOk"
    >
      <a-input v-model="time" placeholder="面试时间" class="input_list"/>
      <a-input v-model="place" placeholder="面试地点" class="input_list"/>
      <a-input v-model="note" placeholder="备注" class="input_list"/>
    </a-modal>
</a-row>
</template>

<script>
import listTop from './list-top'
import {first_interview_without, export_waitInterview, send_message} from '../utils/API'
const depart = require('../mock/department.json')

export default {
    data() {
        return {
            currDepart: '',
            count: 0,
            pagination_current: 1,
            dataList:'',
            depId:'',
            depData:depart,
            visible:false,
            note:'',
            time:'',
            place:''
        }
    },
    components: {
        listTop
    },
    async mounted(){
        this.currDepart = this.$store.state.info.department;
        this.depData.forEach(ele => {
            if(ele.name == this.currDepart)
                this.depId = ele.id;
        });
        let info = await first_interview_without(this,1).catch((err)=>{
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
            let info = await first_interview_without(this,current).catch((err)=>{
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
        async export_wait(){
            window.open(`https://chachapaofan.cn/pc/member/export/waitInterview/${this.depId}`)
        },
        async send_msg(){
            this.visible = true;
        },
        async handleOk(){
            if(this.time == "" || this.place == "" || this.note == ""){
                this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请将信息填写完整',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                return;
            }
            await send_message(this,this.time,this.place,this.note).catch((err)=>{
                console.log(err);
                this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error');
            })
            this.$message.success('通知发送成功！');
            this.visible = false;
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
.input_list{
    margin-top: 15px;
}
</style>
