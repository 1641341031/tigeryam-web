<script setup>
import { reactive, ref, h } from 'vue'
import { ElNotification } from 'element-plus'
import { getRegisterCode, register } from '../api/login.js'
import { ElMessageBox } from 'element-plus'
import router from '../router/index.js'

const registerInfo = reactive({})
const dialogVisible = ref(false);
const verifyCode = ref('');

function verifyUsername() {
    let reg = /^[a-zA-Z0-9_-]{4,16}$/;
    if (!reg.test(registerInfo.username)) {
        ElNotification({
            title: 'Success',
            message: h('i', { style: 'color: teal' }, "验证码发送成功，请到邮箱查收！"),
            type: 'success',
            showClose: false
        });
    }
}


function verifyEmail() {
    let reg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
    if (!reg.test(registerInfo.email)) {
        notify("请正确填写邮箱地址！")
    }
}

function verifyPwd() {
    if (registerInfo.password.length < 8) {
        notify("密码长度至少8位！");
    }
    if (registerInfo.password1.length < 8) {
        notify("密码长度至少8位！");
    }
    if (registerInfo.password.length !== 0 && registerInfo.password.trim() != '' && registerInfo.password1.length !== 0 && registerInfo.password1.trim() != '') {
        if (registerInfo.password !== registerInfo.password1) {
            notify("密码不一致");
        }
    }
}

function notify(message) {
    ElNotification({
        title: 'Error',
        message: h('i', { style: 'color: teal' }, message),
        type: 'error',
        showClose: false,
        duration: 5000
    })
}

function submitForm() {
    let name = !(registerInfo.username === undefined || registerInfo.username.trim() === '' || registerInfo.username.length === 0);
    let email = !(registerInfo.email === undefined || registerInfo.email.trim() === '' || registerInfo.email.length === 0);
    let pwd = !(registerInfo.password === undefined || registerInfo.password.trim() === '' || registerInfo.password.length === 0);
    let pwd1 = !(registerInfo.password1 === undefined || registerInfo.password1.trim() === '' || registerInfo.password1.length === 0);
    let isPwdEqual = registerInfo.password === registerInfo.password1;
    if (name && email && pwd && pwd1 && isPwdEqual) {
        dialogVisible.value = true;
    } else {
        notify("请正确完整填写资料");
    }
}

function send() {
    dialogVisible.value = false;
    register(registerInfo.username, registerInfo.email, registerInfo.password, verifyCode.value)
        .then((reps) => {
            const data = reps.data;
            if (data.code === 200) {
                ElNotification({
                    title: 'Success',
                    message: h('i', { style: 'color: teal' }, "注册成功！"),
                    type: 'success',
                    showClose: false,
                    duration: 5000
                })
                router.push({ path: '/login' })
            }
        })
}

const handleClose = (done) => {
    ElMessageBox.confirm('您确定关闭这个小窗口吗？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

function sendMail(){
    getRegisterCode(registerInfo.email);
}

</script>

<template>
    <div class="register-wrap">
        <h3>Register</h3>
        <div class="rg-from-wrap">
            <div class="form-wrap">
                <div class="un-wrap">
                    <input class="field" type="text" id="username" v-model="registerInfo.username"
                        @change="verifyUsername" required />
                    <label for="username">用户名</label>
                </div>
                <div class="mail-wrap">
                    <input class="field" type="text" id="email" v-model="registerInfo.email" @change="verifyEmail"
                        required />
                    <label for="email">邮箱</label>
                </div>
                <div class="pw-wrap">
                    <input class="field" type="password" id="password" v-model="registerInfo.password"
                        @change="verifyPwd" required />
                    <label for="password">密码</label>
                </div>
                <div class="pw-wrap">
                    <input class="field" type="password" id="password1" v-model="registerInfo.password1"
                        @change="verifyPwd" required />
                    <label for="password1">确认密码</label>
                </div>
                <div class="bt-wrap">
                    <button class="field" type="submit" @click="submitForm">下一步</button>
                </div>
            </div>
        </div>
        <div class="rg-fg-wrap">
            <a href="/login">立即登录</a>
            <a href="/">返回首页</a>
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="验证邮箱" width="50%" :before-close="handleClose"
        :show-close="false">
        <el-input v-model="(verifyCode)" @keyup.enter="send" class="w-50 m-2" style="width: 60%; height: 40px;" placeholder="输入验证码"
            autofocus="true" />
            <el-button type="primary" @click="sendMail" style="width: 30%; margin-left: 10px; height: 40px;">给邮箱发验证码</el-button>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="send">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped lang="scss">
.register-wrap {
    overflow: hidden;
    border-radius: 8px;
    background-color: #eee;
    width: 38vw;
    // height: 360px;
    min-width: 300px;
    max-width: 1200px;
    margin: 4em auto;
    box-shadow: 3px 3px 3px rgb(165, 164, 164);

    h3 {
        font-family: Arial, Helvetica, sans-serif;
        border-radius: 5px, 5px;
        height: 3em;
        background: linear-gradient(90deg, #85d5f0, #6a77dde8);
        color: #fff;
        line-height: 3em;
        text-align: center;
        font-size: 2em;
    }

    .rg-from-wrap {

        // height: 240px;
        .form-wrap {
            margin-top: 20px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .field {
                min-width: 280px;
                width: 35vw;
                height: 40px;
                border-radius: 1.5em;
                border: none;
                outline: none;
            }

            label {
                color: rgb(104, 102, 102);
                position: absolute;
                left: 10px;
                top: 10px;
                transition: .8s;
            }

            div {
                position: relative;
            }

            & div+div {
                margin-top: 24px;
            }

            input {
                padding-left: 8px;

                &:focus {
                    border: 1px solid #6a77dde8;
                }

                &:focus+label,
                &:valid+label {
                    color: #6a77dde8;
                    transform: translateY(-20px);
                }
            }

            .bt-wrap button {
                background: linear-gradient(90deg, #85d5f0, #6a77dde8);
                font-size: 1em;
                color: #fff;

                // transition: 0.6s;
                &:hover {
                    opacity: .8;
                    color: #000;
                    cursor: pointer;
                }

                &:active {
                    border: 1px solid #192dc3e8;
                    box-shadow: .1em .1em .5em #124;
                }
            }
        }
    }

    .rg-fg-wrap {
        margin: 16px 0 8px 0;
        text-align: end;

        a {
            margin: 0 8px;
            text-decoration: none;
            color: #000;
            display: inline-block;
            transition: .8s;

            &:hover {
                color: #6a77dde8;
                text-shadow: 3px 3px 3px rgb(114, 113, 113);
            }
        }
    }
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>