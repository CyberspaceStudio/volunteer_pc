<template>
<a-row>
    <a-col :span="22" :offset="1" class="col-wrap">
        <list-top :count='total'>{{currDepart}}部员名单</list-top>
        <a-row class="table">
            <a-col :span="24">
                 <!-- <a-table :columns="columns" :dataSource="mem_mes.list" />  -->

                <a-row class="table-top">
                    <a-col :span='1'>序号</a-col>
                    <a-col :span='1' >姓名</a-col>
                    <a-col :span='1' >性别</a-col>
                    <a-col :span='2' >电话</a-col>
                    <a-col :span="2" >QQ</a-col>
                    <a-col :span="2" >学号</a-col>
                    <a-col :span="2" >生日</a-col>
                    <a-col :span="2" >地址</a-col>
                    <a-col :span="3" >学院</a-col>
                    <a-col :span="3" >专业</a-col>
                    <a-col :span="3" >宿舍号</a-col>
                    <a-col :span="2" >部门</a-col>
                     <!-- <a-col :span="3" :offset="1">操作</a-col>  -->
                </a-row>
                <a-row class="table-item" v-for="(item,index) in dataList" :key="index">
                    <a-col :span='1'>{{item.main_id}}</a-col>
                    <a-col :span='1' >{{item.memberName}}</a-col>
                    <a-col :span='1' >{{item.sex}}</a-col>
                    <a-col :span='2' >{{item.telNum}}</a-col>
                    <a-col :span="2" >{{item.qq}}</a-col>
                    <a-col :span="2" >{{item.studentNum}}</a-col>
                    <a-col :span="2" >{{item.birthday}}</a-col>
                    <a-col :span="2" >{{item.homeAddress.substring(0, 6)}}</a-col>
                    <a-col :span="3" >{{item.college}}</a-col>
                    <a-col :span="3" >{{item.profession}}</a-col>
                    <a-col :span="3" >{{item.dormitory}}</a-col>
                    <a-col :span="2" >{{item.department}}</a-col>
                     <!-- <a-col :span="3" :offset="1">
                        <a-button type="danger" @click="persuasionMember(item)">退部</a-button>
                    </a-col>  -->
                </a-row>

            </a-col>
        </a-row>
        <a-row class="page-size">
            <a-col :span="10" :offset="14">
                <a-pagination v-model="pagination_current" :total="total" @change="changePage"/>
            </a-col>
        </a-row>
        <a-row>
            <a-col :span="3" :offset="10">
                <a-button type="default" size="large">生成录取通知</a-button>
            </a-col>
            <a-col :span="3" :offset="1">
                <a-button type="default" size="large" @click="export_mem">导出部员名单</a-button>
            </a-col>
            <a-col :span="3" :offset="1">
                <a-button type="default" size="large" @click="export_mem_messages">导出部员详细信息</a-button>
            </a-col> 
            <a-col :span="3" :offset="1">
                <a-button type="default" size="large" @click="export_attend">生成例会考察表</a-button>
            </a-col>
        </a-row>
    </a-col>
</a-row>
</template>

<script>
import listTop from './list-top.vue'
import {memeber_list, export_list, export_attendance,get_member_messages} from '../utils/API'
const depart = require('../mock/department.json')
export default {
    data() {
        return {
            currDepart: '',
            dataList:[],
            pagination_current: 1, //分页器专用数据
            total:0,
            depId:'',
            depData:depart,
        }
    },
    methods: {
        async export_attend(){  
            window.open(`https://chachapaofan.cn/pc/member/export/attendance/${this.depId}`)
        },
        async export_mem(){  //导出部员信息
            window.open(`https://chachapaofan.cn/pc/member/export/list/${this.depId}`)
        },
        async export_mem_messages(){  //导出部员详细信息
            window.open(`https://xdvolunteer.xyz/export/messages/${this.depId}`)
        },
        persuasionMember(item) { //退部操作
            console.log(item)
        },
        // async changePage(current){
        //     let info = await memeber_list(this,current).catch((err)=>{
        //         console.log(err);
        //         this.$notification.open({
        //             message: '亲，出错啦！',
        //             description: '请求失败，请稍候重试',
        //             icon: <a-icon type="frown" style="color: #108ee9" />
        //         });
        //         throw new Error('error');
        //     });
        //     this.dataList = info.data.data.data;
        //     this.count = info.data.data.total;
        // },
        async changePage(current){
            let depart = {
                departCode:this.depId,
                pageNum:current,
                pageSize:10
            }
            let info = await get_member_messages(this,depart).catch((err)=>{
                console.log(err);
                this.$notification.open({
                    message: '亲，出错啦！',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error');
            });
            this.dataList = info.data.data.list;
            this.total = info.data.data.total;
        }
    },
    components: {
        listTop
    },
    watch: {
        pagination_current(newVal) {
            console.log(newVal)
        }
    },
    async mounted(){ 
        this.currDepart = this.$store.state.info.department;
        this.depData.forEach(ele => {
            if(ele.name == this.currDepart)
                this.depId = ele.id;
        });

        // let info = await memeber_list(this,1).catch((err)=>{
        //     console.log(err);
        //     this.$notification.open({
        //         message: '亲，出错啦！',
        //         description: '请求失败，请稍候重试',
        //         icon: <a-icon type="frown" style="color: #108ee9" />
        //     });
        //     throw new Error('error');
        // })
        // this.dataList = info.data.data.data;
        // this.total = info.data.data.total;
        let depart = {
                departCode:this.depId,
                pageNum:1,
                pageSize:10
            }
        let info = await get_member_messages(this,depart).catch((err)=>{
                console.log(err);
                this.$notification.open({
                    message: '亲，出错啦!',
                    description: '请求失败，请稍候重试',
                    icon: <a-icon type="frown" style="color: #108ee9" />
                });
                throw new Error('error');
            });
        this.dataList = info.data.data.list;
        this.total = info.data.data.total;
    }
}
</script>

<style lang="scss" scoped>
.col-wrap {
    margin-top: 43px;
    font-size: 18px;

    .table {
        margin-top: 50px;
        margin-bottom: 23px;

        .table-top {
            height: 50px;
            line-height: 50px;
            font-size: $form_font_size;
            background-color: rgba(184, 220, 219, 1);
        }

        .table-item {
            background-color: white;
            border-bottom: 1px solid #CCCCCC;
            height: 40px;
            line-height: 40px;
            font-size: $form_font_size;

        }
    }

    .page-size {
        margin-bottom: 15px;
    }
}
</style>
