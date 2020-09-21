<template>
  <div id="login">
    <div class="module-dialog-layer" style="display: block;"></div>
    <div class="module-dialog clear module-dialog-login module-dialog-show">
      <div class="dialog-panel">
        <div class="print-tit">
          <img src="../assets/img/login-logo.jpg" alt />
        </div>
        <div class="legend-tit">使用 Smartisan ID 登录官网</div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-login-add">
              <div class="save-login-box">
                <div class="login-form">
                  <div class="module-form-row">
                    <div
                      class="form-item-v3"
                      :class="{ 'form-invalid-item': phoneError }"
                    >
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="手机号"
                        v-model="phone"
                        @blur="inspectPhone"
                        @focus="setPhoneError"
                      />
                      <div class="verify-error" v-show="phoneError">
                        请填写11位号码
                      </div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div
                      class="form-item-v3"
                      :class="{ 'form-invalid-password': passwordError }"
                    >
                      <input
                        type="password"
                        class="js-verify"
                        placeholder="密码"
                        v-model="password"
                        @blur="inspectPassword"
                        @focus="setPasswordError"
                      />
                      <div class="verify-error" v-show="passwordError">
                        密码长度要大于或等于8
                      </div>
                    </div>
                  </div>
                  <div class="module-form-row fn-clear">
                    <input type="checkbox" class="hide" />
                    <span
                      class="blue-checkbox"
                      :class="{ 'blue-checkbox-on': isActive }"
                      @click="checkedDefault"
                    ></span
                    >自动登录
                  </div>
                  <div
                    class="dialog-blue-btn big-main-btn js-verify-login"
                    :class="{ 'disabled-btn': !isRight }"
                  >
                    <router-link
                      tag="a"
                      to="/shop"
                      @click.native="saveDateHandle"
                      >登录</router-link
                    >
                  </div>
                  <div class="module-form-row">
                    <div class="js-login">
                      <ul>
                        <li class="text">其他账号登录：</li>
                        <li class="weChat">
                          <a
                            @mousemove="imgMove(1)"
                            @mouseout="imgOut(1)"
                          >
                            <img
                              v-show="weChatDefault"
                              src="../assets/img/wechat1.gif"
                              alt
                            />
                            <img
                              v-show="!weChatDefault"
                              src="../assets/img/wechat2.gif"
                              alt
                            />
                          </a>
                        </li>
                        <li class="microblog">
                          <a
                           @mousemove="imgMove(2)"
                            @mouseout="imgOut(2)"
                          >
                            <img
                              v-show="weiBoDefault"
                              src="../assets/img/weibo1.gif"
                              alt
                            />
                            <img
                              v-show="!weiBoDefault"
                              src="../assets/img/weibo2.gif"
                              alt
                            />
                          </a>
                        </li>
                        <li class="qq">
                          <a
                            @mousemove="imgMove(3)"
                            @mouseout="imgOut(3)"
                          >
                            <img
                              v-show="qqDefault"
                              src="../assets/img/qq1.gif"
                              alt
                            />
                            <img
                              v-show="!qqDefault"
                              src="../assets/img/qq2.gif"
                              alt
                            />
                          </a>
                        </li>
                        <li class="alipay">
                          <a
                            @mousemove="imgMove(4)"
                            @mouseout="imgOut(4)"
                          >
                            <img
                              v-show="alipayDefault"
                              src="../assets/img/alipay1.gif"
                              alt
                            />
                            <img
                              v-show="!alipayDefault"
                              src="../assets/img/alipay2.gif"
                              alt
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="agreement">
                      <p>
                        <span>
                          登录代表你已同意
                          <a
                            >用户协议</a
                          >
                          和
                          <a
                           >隐私政策</a
                          >
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isActive: true,
      phone: "",
      phoneError: false,
      password: "",
      passwordError: false,
      isRight: false,
      weChatDefault: true,
      weiBoDefault: true,
      qqDefault: true,
      alipayDefault: true
    };
  },
  watch: {
    ["phone"]() {
      this.inspectLogin();
    },
    ["password"]() {
      this.inspectLogin();
    }
  },
  methods: {
    checkedDefault() {
      this.isActive = !this.isActive;
    },
    inspectPhone() {
      if (this.phone.length === 11 && !isNaN(this.phone)) {
        this.phoneError = false;
      } else {
        this.phoneError = true;
      }
    },
    setPhoneError() {
      this.phoneError = false;
    },
    inspectPassword() {
      if (this.password.length >= 8) {
        this.passwordError = false;
      } else {
        this.passwordError = true;
      }
    },
    setPasswordError() {
      this.passwordError = false;
    },
    inspectLogin() {
      if (
        this.phone.length === 11 &&
        !isNaN(this.phone) &&
        this.password.length >= 8
      ) {
        this.isRight = true;
      } else {
        this.isRight = false;
      }
    },
    imgMove(i) {
      if (i == 1) {
        this.weChatDefault = false;
      } else if (i == 2) {
        this.weiBoDefault = false;
      } else if (i == 3) {
        this.qqDefault = false;
      } else {
        this.alipayDefault = false;
      }
    },
    imgOut(i) {
      if (i == 1) {
        this.weChatDefault = true;
      } else if (i == 2) {
        this.weiBoDefault = true;
      } else if (i == 3) {
        this.qqDefault = true;
      } else {
        this.alipayDefault = true;
      }
    },
    saveDateHandle() {
      this.$store.state.account = this.phone;
    }
  }
};
</script>
<style scoped>
@import "../assets/css/login.css";
</style>
