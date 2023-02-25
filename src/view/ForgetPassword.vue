<script setup>
import { ref,h } from 'vue'
import { getForgetCode, updatePassword } from '../api/login.js'
import { ElNotification } from 'element-plus'
import router from '../router';

const emailAddress = ref('');
const newPassword = ref('');
const verifyCode = ref('');
const username = ref('');
const sendCodestatus = ref(false);

function sendCode() {
    getForgetCode(emailAddress.value).then( (resp) => {
        if (resp.data.code === 200) {
            sendCodestatus.value = true;
            ElNotification({
                title: 'Success',
                message: h('i', { style: 'color: teal' }, "验证码发送成功，请到邮箱查收！"),
                type: 'success',
                showClose: false
            });
        }
    })

}

function notifyUser(){
    ElNotification({
                title: 'Error',
                message: h('i', { style: 'color: teal' }, "请填写完整信息！"),
                type: 'errr',
                showClose: false
            });
}

function checkEmailAddress(){
    if(emailAddress.value === undefined || emailAddress.value.trim() === '') notifyUser();
}
function checkUsername(){
    if(username.value === undefined || username.value.trim() === '') notifyUser();
}
function checkVerifycode(){
    if(verifyCode.value === undefined || verifyCode.value.trim() === '') notifyUser();
}
function updatePwd() {
    updatePassword(newPassword.value, emailAddress.value, username.value, verifyCode.value).then( (reps) => {
        if(reps.data.code === 200){
            ElNotification({
                title: 'Success',
                message: h('i', { style: 'color: teal' }, "密码更新成功，请立即登录！"),
                type: 'success',
                showClose: false
            });
            router.push("/login");
        }
    })
}

function checkPwd(){
    if( newPassword.value === undefined || newPassword.value.trim() === '' || newPassword.value.length < 8 ){
        ElNotification({
                title: 'Error',
                message: h('i', { style: 'color: teal' }, "请正确填写密码,长度至少8位字符。"),
                type: 'error',
                showClose: false
            });
    }
}
</script>

<template>
    <div class="fgPwdWrap">
        <h3>更改密码</h3>
        <div class="emailWrap">
            <input type="text" name="email" id="email" v-model="emailAddress" @change="checkEmailAddress" placeholder="请输入预留的邮箱" />
            <input type="text" name="username" id="username" v-model="username" 
            @change="checkUsername" style="margin-top: 20px;" placeholder="请输入用户名" />
        </div>
        <div class="verifyCodeWrap">
            <input type="text" name="verifyCode" id="verifyCode" v-model="verifyCode"
            @change="checkVerifycode" placeholder="请输入验证码" />
            
        </div>
        <div><button @click="sendCode">获取验证码</button></div>

        <div class="newPwdWrap" v-if="sendCodestatus">
            <input type="password" name="newPwdWrap" id="newPwdWrap" v-model="newPassword"
            @change="checkPwd" placeholder="输入新密码" />
            
        </div>
        <div v-if="sendCodestatus"><button @click="updatePwd">修改密码</button></div>
    </div>
</template>

<style lang="scss" scoped>
input{
    border: none;
    padding: .5em;
    height: 34px;
    width: 68%;
    border-radius: 1.5em;
    transition: .25s;
}
input:focus{
    border: 1px solid #409EFF;
    outline-style: none;
    width: 86%;
}
button{
    border: 1px solid #409EFF;
    height: 34px;
    width: 68%;
    border-radius: 1.5em;
    background-color: #40a0ff49;
}
button:hover{
    background-color: #409EFF;
}
.fgPwdWrap{
    border: 1px solid #409EFF;
    box-shadow: .1em .1em .5em #124;
    width: 60vw;
    background-color: #eee;
    margin: 15vh auto;
    border-radius: .5em;
    padding: 8px;
    h3{
        position: relative;
        margin-top: 10px;
        // text-align: center;
        color: #409EFF;
        &::after{
            position: absolute;
            bottom: -3px;
            content: " ";
            display: block;
            background-color: #409EFF;
            width: 75px;
            height: 3px;
        }
    }
    div{
        margin-top: 20px;
        text-align: center;
    }
}

@media all and (max-width: 420px) {
    .fgPwdWrap{
        width: 96vw;
    }
}
</style>