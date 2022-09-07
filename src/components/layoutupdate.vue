<template>
    <div class="update">
        <VueDragResize class="drag" v-for="(item,index) in  info" :key="item.id"  v-on:dragging="resize" @resizing="resize"
            @clicked="onActivated(item,index)" :w="item.width / sf" :h="item.height/sf" :x="item.axis/sf" :y="item.ayis/sf"
            :parentLimitation="true" :minw="10" :minh="10" :isActive="item.isActive">
                <div class="bt" draggable="true" :style="{'background-image': `url(${item.back_image})`}">
                    
                </div>
        </VueDragResize>
    </div>

    <div class="info">
        <el-form ref="formRef" :model="formdata" label-position="right" label-width="120px" class="demo-dynamic">
            <h3>基础信息</h3>
            <el-row>
                <el-col :span="8">
                    <el-upload class="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                        :limit="1" :on-exceed="handleExceed">
                        <el-button type="primary">科室底图</el-button>
                    </el-upload>
                </el-col>
                <el-col :span="8">
                    <el-button type="primary" @click="addPoint">添加一个</el-button>
                </el-col>
                <el-col :span="8">
                    <el-button type="danger" @click="deletePoint(formdata)">删除当前</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="4" :push="1">
                    <div class="block">
                        <el-avatar :size="40" :src="formdata.show_image" fit="cover" />
                    </div>
                </el-col>
                <el-col :span="16">
                    <el-upload class="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        multiple :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove"
                        :limit="1" :on-exceed="handleExceed">
                        <el-button type="primary">更改图标</el-button>
                    </el-upload>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="10">
                    <el-form-item prop="height" label="高度" label-width="80px">
                        <el-input v-model="formdata.height" />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item prop="width" label="宽度" label-width="80px">
                        <el-input v-model="formdata.width" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item prop="axis" label="纵坐标" label-width="80px" required>
                        <el-input v-model="formdata.axis" />
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item prop="ayis" label="横坐标" label-width="80px" required>
                        <el-input v-model="formdata.ayis" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-upload class="upload" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                    :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1"
                    :on-exceed="handleExceed">
                    <el-button type="primary">上传背景</el-button>
                </el-upload>
            </el-row>
            <el-space>
                <h3>
                    自定义信息
                </h3>
                <el-row>
                    <el-button @click="addDomain">添加信息</el-button>
                </el-row>
            </el-space>
            <el-scrollbar height="330px">
                <el-row v-for="(it,index) in formdata.domain" :key="index">
                    <el-col :span="10">
                        <el-form-item :prop="'domain.'+index+'.key'" label="键" label-width="40px" :rules="{
                          required: true,
                          message: '不能为空',
                          trigger: 'blur',
                        }">
                            <el-input autosize v-model="it.key" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="10">
                        <el-form-item :prop="'domain.'+index+'.value'" label="值" label-width="40px" :rules="{
                          required: true,
                          message: '不能为空',
                          trigger: 'blur',
                        }">
                            <el-input autosize v-model="it.value" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" :push="1">
                        <el-button type="danger" :icon="Delete" circle @click.prevent="removeDomain(index)"></el-button>
                    </el-col>
                </el-row>
            </el-scrollbar>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)">保存</el-button>
            
            </el-form-item>
        </el-form>
    </div>

</template>
<script setup>
import { ElMessage } from 'element-plus';
import { ref, reactive, isRef, toRef, computed} from 'vue'
import {Delete} from '@element-plus/icons-vue'
import axios from "axios";
import VueDragResize from "vue-drag-resize/src/components/vue-drag-resize.vue";
const formRef=ref(null)
const sf = 1920 / 1280;
const re = [
    {
        id: 1,
        axis: 100,
        ayis: 100,
        width: 100,
        height: 100,
        back_image: "/image/1661928324865.png",
        show_image: "/image/1661928324865.png",
        domain: [{
            key: "名字",
            value: '信息',
        }
            , {
            key: "名字",
            value: '信息',
        }, {
            key: "名字",
            value: '信息',
        }]
    },
    {
        id: 2,
        axis: 390,
        ayis: 380,
        width: 200,
        height: 200,
        back_image: "/image/1662336678047.png",
        show_image: "/image/1662336678047.png",
        domain: [{
            key: "名字",
            value: '信息',
        }, {
            key: "名字",
            value: '信息',
        }]
    }
]
const info=reactive(re)
var formdata = ref(info[0])

function resize(rec) {
    formdata.value.axis = rec.left * 1.5;
    formdata.value.ayis = rec.top * 1.5;
    formdata.value.width = rec.width * 1.5;
    formdata.value.height = rec.height * 1.5;
}
function onActivated(item,index) {
   
    // let _= info.find((a,index) => {
    //     return a.id === item.id
    // })
    info.forEach(a=>{
        a.isActive=false
    })
    info[index].isActive=true
    let _=info[index]
    formdata.value=_
}
function deletePoint(fd){
    let index=info.indexOf(fd)
    console.log()
    info.splice(index,1)
    formdata.value={}
}
//添加一个信息
function addDomain(){
    if(formdata.value.domain.length>15){
        ElMessage.error("最多添加15条信息")
        return
    }
    formdata.value.domain.push({
        key:"",
        value:""
    })
}
//删除一条信息
function removeDomain(index){
    formdata.value.domain.splice(index,1)
}
//提交验证
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate().then(()=>{
    console.log(formdata)
  },
  ()=>{
    
  })
}

//添加一个元素
function addPoint(){
    axios.get("/api/uuid").then((resp)=>{
        info.push({
        id:resp.data,
        axis: 900,
        ayis: 500,
        width: 100,
        height: 100,
        back_image: "/image/1661928324865.png",
        show_image: "/image/1661928324865.png",
        domain: []
    })
    })
}
</script>
<style scoped>
.bt {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
}

.update {
   
    background-color: aqua;
    float: left;
    width: 1280px;
    height: 720px;
    margin: 0;
    padding: 0;
}

.info {
   
    border: 1px solid wheat;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 720px;
    background-color: rgb(121, 229, 244);
}
</style>