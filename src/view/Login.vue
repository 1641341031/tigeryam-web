<script setup>
import { ref, onMounted, h } from 'vue';
import { login, fetchVerifyCode } from '../api/login.js'
import { ElNotification } from 'element-plus'
import { setToken } from '../utils/auth.js'
import router from '../router/index.js'
import { reject } from 'lodash';

let username = ref("");
let password = ref("");
let code = ref("");
let verify_img = ref("");

function notify(message) {
    ElNotification({
        title: 'Error',
        message: h('i', { style: 'color: teal' }, message),
        type: 'error',
        showClose: false
    })
}
function checkResult() {
    if (username.value === '' || password.value === '' || code.value === '') {
        notify('请正确填写完整！')
        return false;
    }
    return true;
}

function submit() {
    if (checkResult()) {
        login(username.value, password.value, code.value).then(
            (reps) => {
                const data = reps.data;
                if (data.code !== 200) {
                    notify(data.message);
                } else {
                    const tokenStr = data.tokenHead + data.token;
                    setToken(tokenStr);
                    
                    ElNotification({
                        title: 'Success',
                        message: h('i', { style: 'color: teal' }, "登录成功！"),
                        type: 'success',
                        showClose: false,
                        offset: 100
                    });
                    router.push({ path: '/' });
                }
            }
        ).catch( error =>{
            reject(error);
        })
    }
}

function getVerifyCode() {
    fetchVerifyCode().then((reps) => {
        verify_img.value = 'data:image/png;base64,' + btoa(new Uint8Array(reps.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    })
}


onMounted(() => {
    getVerifyCode();
})
</script>

<template>
    <div class="login-wrap">
        <h3>Login</h3>
        <div class="lg-form-wrap">
            <div class="form-wrap">
                <div class="un-wrap">
                    <input class="field" type="text" v-model="username" id="username" required />
                    <label for="username">用户名</label>
                </div>
                <div class="pw-wrap">
                    <input class="field" type="password" v-model="password" id="password" required />
                    <label for="password">密码</label>
                </div>
                <div class="verify-code-wrap">
                    <input class="field" type="text" v-model="code" @keyup.enter="submit" id="code" required />
                    <label for="code">验证码</label>
                    <img :src="verify_img" alt="验证码" @click="getVerifyCode">
                </div>
                <div class="bt-wrap">
                    <button class="field" type="submit" @click="submit">登录</button>
                </div>
            </div>
        </div>
        <div class="rg-fg-wrap">
            <!-- <a href="/register">新用户注册</a>
            <a href="#">忘记密码</a> -->
            <router-link to="/register">新用户注册</router-link>
            <router-link to="/forgetPassword">忘记密码</router-link>
            <router-link to="/">返回首页</router-link>
        </div>
    </div>
</template>

<style scoped lang="scss">
.login-wrap {
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

    .lg-form-wrap {

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

            .verify-code-wrap {
                position: relative;

                // overflow: hidden;
                img {
                    position: absolute;
                    right: 0;
                    height: 40px;
                    width: 36%;
                    border-radius: 0 1.5em 1.5em 0;
                }
            }

            button {
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
</style>