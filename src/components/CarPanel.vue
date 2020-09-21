<template>
  <router-link
    to="/cart"
    tag="li"
    class="nav-cart"
    @mouseenter.native="showCarHandle"
    @mouseleave.native="hideCarHandle"
  >
    <a href="javascript:;" class="ball-rect">购物车</a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{'cart-num': count > 0}">
      <i>{{count}}</i>
    </span>
    <div class="nav-cart-wrapper" v-if="carShow">
      <div class="nav-cart-list">
        <div class="empty" v-if="count <= 0">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="(item, index) in carPanelData" :key="index">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img
                        :src="item.ali_image + '?x-oss-process=image/resize,w_206/quality,Q_80/format,webp'"
                      />
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{item.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span>{{item.spec_json.show_name}}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span>
                          <span class="price-num">{{item.price}}</span>
                          <span class="item-num">x {{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="delCarPanelHandle(item.sku_id)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>
              共
              <strong class="ng-binding">{{count}}</strong> 件商品
            </p>
            <h5>
              合计：
              <span class="price-icon">¥</span>
              <span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{price}}</span>
            </h5>
            <h6>
              <router-link class="nav-cart-btn" to="/cart">去购物车</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <transition
      name="ball"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      :css="true"
    >
      <div class="addcart-mask" v-show="ball.show">
        <img class="mask-item" :src="ball.img" />
      </div>
    </transition>
  </router-link>
</template>
<script>
export default {
  name: "CarPanel",
  computed: {
    carPanelData() {
      return this.$store.state.carPanelData;
    },
    count() {
      return this.$store.getters.totleCount;
    },
    price() {
      return this.$store.getters.totlePrice;
    },
    carShow() {
      return this.$store.state.carShow;
    },
    ball() {
      return this.$store.state.ball;
    }
  },
  methods: {
    delCarPanelHandle(id) {
      this.$store.commit("delCarPanelData", id);
    },
    showCarHandle() {
      this.$store.commit("showCar");
    },
    hideCarHandle() {
      this.$store.commit("hideCar");
    },
    beforeEnter(el) {
      let rect = this.ball.el.getBoundingClientRect();
      let rectEl = document
        .getElementsByClassName("ball-rect")[0]
        .getBoundingClientRect();
      let ball = document.getElementsByClassName("mask-item")[0];
      let x = rectEl.left + 16 - (rect.left + rect.width / 2);
      let y = rect.top + rect.height / 2 - rectEl.top + 5 - 16;
      el.style.transform = "translate3d(0," + y + "px,0)";
      ball.style.transform = "translate3d(-" + x + "px,0,0)";
    },
    enter(el) {
      let a = el.offsetHeight;
      el.a = a;
      el.style.transform = "translate3d(0,0,0)";
      document.getElementsByClassName("mask-item")[0].style.transform =
        "translate3d(0,0,0)";
    },
    afterEnter() {
      this.ball.show = false;
    }
  }
};
</script>

<style scoped>
.addcart-mask {
  position: relative;
  z-index: 1;
}
.addcart-mask img {
  width: 30px;
  height: 30px;
}
.ball-enter-active {
  transition: 0.5s cubic-bezier(0.15, 0.69, 0.6, 1.29);
}
.ball-enter-active .mask-item {
  transition: 0.5s cubic-bezier(0, 0, 1, 1);
}
</style>
