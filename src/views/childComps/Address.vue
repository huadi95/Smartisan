<template>
  <div class="account-content">
    <div class="account-address">
      <div class="gray-box clear">
        <div class="title pre-title">
          <h2 class="fn-left">收货信息</h2>
          <span class="gray-blue-btn js-add-address">
            <a class="add" @click="addReceive">添加新地址</a>
          </span>
        </div>
        <div class="box-inner clear">
          <div>
            <div
              class="address-list-item default-item"
              v-for="(receive, index) in receiveInfo"
              :key="index"
            >
              <div class="name fn-left">
                <div class="name-cell">{{receive.name}}</div>
              </div>
              <div class="detail fn-left">
                <div
                  class="detail-cell"
                >{{receive.province}} {{receive.city}} {{receive.county}} {{receive.add}}</div>
              </div>
              <div class="operation fn-right">
                <div class="operation-cell">
                  <a class="gray-edit-btn js-edit-address" @click="editReceive(receive,index)">修改</a>
                  <span class="red-del-btn js-del-address" @click="delReceive(index)">
                    <a>删除</a>
                    <em>删除</em>
                  </span>
                </div>
              </div>
              <div class="default fn-right">
                <span v-if="receive.default">（默认地址）</span>
                <a v-else @click="checkDefaultHandle(receive)">设为默认</a>
              </div>
              <div class="telephone fn-right">{{receive.phone}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <address-pop
      v-if="popShow"
      :oldReceive="oldReceive"
      :receiveIndex="receiveIndex"
      @close="closePop"
    />
  </div>
</template>

<script>
import AddressPop from "../../components/AddressPop";
export default {
  name: "Address",
  components: {
    AddressPop
  },
  data() {
    return {
      popShow: false,
      receiveInfo: [],
      oldReceive: null,
      receiveIndex: null
    };
  },
  created() {
    this.$store.state.receiveInfo.forEach((receive, index) => {
      if (receive.default) {
        receive.checked = true;
        this.$store.state.receiveInfo.unshift(
          this.$store.state.receiveInfo.splice(index, 1)[0]
        );
      } else {
        receive.checked = false;
      }
    });
    this.receiveInfo = this.$store.state.receiveInfo;
  },
  methods: {
    checkDefaultHandle(data) {
      this.$store.commit("checkDefault", data);
    },
    addReceive() {
      this.oldReceive = null;
      this.popShow = true;
    },
    closePop() {
      this.popShow = false;
    },
    editReceive(data, index) {
      this.oldReceive = data;
      this.receiveIndex = index;
      this.popShow = true;
    },
    delReceive(index) {
      this.receiveInfo.splice(index, 1);
    }
  }
};
</script>
<style scoped>
@import "../../assets/css/address.css";
</style>
