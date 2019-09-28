<template>
<a-row class='s-row'>
    <a-col :span="23" :offset="0.5">
        <a-row>
            <a-col :span="24">
                <list-top :count="count">{{currDepart}}跨部人员</list-top>
            </a-col>
        </a-row>
        <a-row class="table">
            <a-col :span="22" :offset="1">
                <a-row class="table-top">
                    <a-col :span='2'>序号</a-col>
                    <a-col :span='3'>姓名</a-col>
                    <a-col :span='2'>性别</a-col>
                    <a-col :span='4'>电话</a-col>
                    <a-col :span="3">QQ</a-col>
                    <a-col :span="5" :offset="1">所跨部门</a-col>
                    <a-col :span="3" :offset="1">操作</a-col>
                </a-row>
                <a-row class="table-item" v-for="(item,index) in dataList" :key="index">
                    <a-col :span='2'>{{item.mainId}}</a-col>
                    <a-col :span='3'>{{item.realName}}</a-col>
                    <a-col :span='2'>{{item.sex}}</a-col>
                    <a-col :span='4'>{{item.telNo}}</a-col>
                    <a-col :span="3">{{item.wechat}}</a-col>
                    <a-col :span="5" :offset="1">
                        <span> {{item.cross}} </span>
                    </a-col>
                    <a-col :span="3" :offset="1">
                        <a-button type="danger" @click="comeHere(item.mainId)">调到本部</a-button>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>
        <a-row class="page-size">
            <a-col :span="10" :offset="16">
                <a-pagination v-model="pagination_current" :total="count" @change="changePage"/>
            </a-col>
        </a-row>
    </a-col>
</a-row>
</template>

<script>
import listTop from './list-top.vue'
import {first_interview_cross,first_interview_transfer} from '../utils/API'
export default {
    data() {
        return {
            currDepart: '',
            count: 1,
            pagination_current: 1,
            dataList:''
        }
    },
    components: {
        listTop
    },
    async mounted(){
        this.currDepart = this.$store.state.info.department
        let info = await first_interview_cross(this,1).catch((err)=>{
            console.log(err);
            throw new Error('error');
        });
        this.dataList = info.data.data.data;
        this.count = info.data.data.total;
    },
    methods:{
        async changePage(current){
            let info = await first_interview_cross(this,current).catch((err)=>{
                console.log(err);
                throw new Error('error');
            });
            this.dataList = info.data.data.data;
            this.count = info.data.data.total;
        },
        async comeHere(id){
            console.log(id)
            let param = {
                mainId:id
            }
            await first_interview_transfer(this,id).catch((err)=>{
                console.log(err);
                this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error')
            })
            let info = await first_interview_cross(this,this.pagination_current).catch((err)=>{
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
            this.$message.success('调部成功');
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
