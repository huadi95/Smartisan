<template>
  <div id="main">
    <div class="sku-box store-content">
      <div class="sort-option">
        <ul class="line clear">
          <li>
            <a href="javascript:;" class="active">综合排序</a>
          </li>
          <li>
            <a href="javascript:;" class>销量排序</a>
          </li>
          <li>
            <a href="javascript:;" class>价格低到高</a>
          </li>
          <li>
            <a href="javascript:;" class>价格高到低</a>
          </li>
        </ul>
      </div>
      <div class="gray-box">
        <div class="item-box">
          <shop-item v-for="(item, index) in goodsData" :key="index" :item="item"></shop-item>
        </div>
      </div>
    </div>
    <prompt />
  </div>
</template>

<script>
import ShopItem from "../components/ShopItem";
import Prompt from "../components/Prompt";

import goodsData from "../lib/newGoodsData";

export default {
  name: "Shop",
  data() {
    return {
      goodsData: goodsData
    };
  },
  components: {
    ShopItem,
    Prompt
  }
};
</script>
<style scoped>
.sku-box {
  position: relative;
}
.sort-option {
  border-top: 1px solid #d8d8d8;
  color: #999;
}
.sort-option ul {
  height: 60px;
  line-height: 60px;
}
.sort-option li {
  position: relative;
  float: left;
  padding-left: 42px;
}
.sort-option li:first-child {
  padding-left: 9px;
}
.sort-option li:before {
  content: " ";
  display: block;
  position: absolute;
  left: 20px;
  top: 50%;
  width: 2px;
  height: 2px;
  margin-top: -1px;
  background: #c7c7c7;
}
.sort-option li:first-child:before {
  display: none;
}
.sort-option a {
  display: block;
  font-size: 12px;
  color: #999;
}
.sort-option a.active,
.sort-option a:hover {
  color: #5683ea;
}
.gray-box {
  overflow: hidden;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  border-color: rgba(0, 0, 0, 0.14);
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}
.sku-box .item-box {
  clear: both;
  overflow: hidden;
  margin: 0 -1px -1px -1px;
}
</style>
