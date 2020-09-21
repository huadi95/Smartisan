<template>
  <div id="main">
    <div class="content clear">
      <div class="account-wrapper">
        <div class="account-sidebar">
          <div class="avatar gray-box clear">
            <div class="js-account-sidebar-info">
              <img src="http://static.smartisanos.cn/account/asset/img/default-user-avatar.png" />
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <router-link :to="{ name: 'account' }" exact tag="li" activeClass="current">
                  <a href="javascript:;">我的订单</a>
                </router-link>
                <li class="coupon">
                  <a href="javascript:;">我的优惠</a>
                </li>
                <router-link :to="{ name: 'address' }" exact tag="li" activeClass="current">
                  <a href="javascript:;">收货地址</a>
                </router-link>
                <li class="support">
                  <a href="javascript:;">售后服务</a>
                </li>
                <li class="information">
                  <a href="javascript:;">账户资料</a>
                </li>
                <li class="logout">
                  <a href="javascript:;">联系客服</a>
                </li>
                <li class="logout">
                  <a href="javascript:;">切换账号</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <router-view>/</router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Account"
};
</script>
<style scoped>
@import "../assets/css/account.css";
</style>
