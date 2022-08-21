<template>
<a-layout>
    <a-layout-header>
      <a-menu :selectedKeys="[menuKey]" mode="horizontal">
      <a-menu-item @click="changeMenuKey('addSeal')" key="addSeal">
        <template #icon>
          <plus-outlined />
        </template>
      申请印章
      </a-menu-item>
      <a-menu-item @click="changeMenuKey('app')" key="app">
        <template #icon>
          <appstore-outlined />
        </template>
      一键审核
      </a-menu-item>
  </a-menu>
    </a-layout-header>
    <a-layout-content>
      <div v-if="menuKey==='addSeal'">
        <div v-if="[menuKey==addSeal]">
          <a-Row style="margin-top:4px;">
            <a-col offset="1" :span="22" id="textData">
              <a-Textarea
                      v-model:value="dataValue"
                      placeholder="   例:  印章名称-组织机构名称（多个请换行继续输入）"
                      :autoSize="htmlConfig.textarea.autosize"
              />
            </a-col>
          </a-Row>
          <a-Row>
            <br/>
          </a-Row>
          <a-row>
            <space  size="middle">
              <a-button @click="InitSealData()" type="primary">生成预处理列表</a-button>
              <a-button @click="subSeals()" type="primary">一键添加</a-button>
            </space>
          </a-row>
          <a-table
                  :dataSource="dataSource"
                  :columns="columns"
                  :pagination="htmlConfig.table.pagination"
                  :scroll="htmlConfig.table.scroll"
          />
        </div>
      </div>
      <div v-else>
        <a-row style="margin-top: 5px;margin-bottom: 5px">
          <a-col span="4" offset="2">
            <a-button @click="checkAllSealReq()" type="primary">一键审核</a-button>
          </a-col>
        </a-row>

        <a-table
                :dataSource="sealReq"
                :columns="reqColumns"
                :pagination="htmlConfig.table.pagination"
                :scroll="htmlConfig.table.scroll"
        />
      </div>
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
  
</template>
<script>
import { AppstoreOutlined,PlusOutlined} from '@ant-design/icons-vue';
import {Space} from 'ant-design-vue'
import { ref,reactive } from 'vue';
import {addSeals,checkSealReq,subSealReq} from '../utils/essAxios'
import { initDataValue } from "../utils/SealData";
let headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Content-Type": "application/json;charset=UTF-8"
}
const htmlConfig={
  table:{
    pagination:{
      pageSize: 10
    },
    scroll:{
      y: 240
    }
  },textarea:{
    autosize:{
      minRows: 3,
      maxRows: 5,
    }
  }
  
}
const columns = [
  {
    title: '印章名称',
    dataIndex: 'name',
    width: 15,
  },
  {
    title: '组织机构',
    dataIndex: 'in',
    width: 15,
  },
  {
    title: '经办人姓名',
    dataIndex: 'clientName',
    width: 6,
  },
  {
    title: '经办人信息',
    dataIndex: 'clientDes',
    width: 6,
  }
];
const reqColumns = [
  {
    title: '印章名称',
    dataIndex: 'sealReqId',
    width: 10,
  },
  {
    title: 'KEY',
    dataIndex: 'in',
    width: 10,
  },
  {
    title: '申请时间',
    dataIndex: 'addTime',
    width: 6,
  },
  {
    title: '申请者',
    dataIndex: 'username',
    width: 4,
  }
];
export default({
  name: 'ESS',
  components: {
    PlusOutlined,
    AppstoreOutlined,
    Space
  },
  setup() {

    let dataSource = reactive([]);
    //菜单
    let menuKey=ref('addSeal')
    //审核数据
    let sealReq=reactive([]);
    //查询审核列表
    const changeMenuKey=(key)=> {
      menuKey.value=key;
      if(key=='app'){
        checkSealReq();
        let res=localStorage.getItem('sealReq')
        if(res!=0){
          sealReq.length=0
          res=JSON.parse(res)
          for(let i=0;i<res.length;i++){
            sealReq.push(res[i])
          }
        }
      }
    }
    //一键审核
    function checkAllSealReq() {
      if(subSealReq(sealReq)==1){
        alert("审核成功")
        localStorage.setItem('sealReq',0)
      }
    }
    //一键申请
    function subSeals() {
      addSeals(dataSource)
      dataSource.length=0
    }
    //定义要添加的印章列表
    const dataValue=ref('')
    // 所有印章
    const dataSeal = ref('');


    function InitSealData() {
      if(dataValue.value==null || dataValue.value==''){
        console.log(localStorage.getItem('119.45.7.196'))
        return
      }
      let sealList=initDataValue(dataValue)
      console.log(sealList);
      if(sealList!='error'){
        for(let i in sealList){
          dataSource.push(sealList[i])
        }
      }else{
        alert('格式不对啊！');
      }
    }
    return {
      dataSource,
      sealReq,
      columns,
      reqColumns,
      htmlConfig,
      dataValue,
      dataSeal,
      menuKey,
      changeMenuKey,
      InitSealData,
      subSeals,
      checkAllSealReq
    };
  },

});
</script>

<style scoped>
.ant-layout{
  width: 600px;
  height:600px;
}
.ant-layout-header{
  background-color: white;
}
.editable-row-operations a {
  margin-right: 8px;
}

textarea{
  width: 100%;
  height: 100%;
  resize: none;
}
</style>
