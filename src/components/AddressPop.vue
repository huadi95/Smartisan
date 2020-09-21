<template>
  <div id="pop">
    <div class="module-dialog-layer" style="display: block;"></div>
    <div class="module-dialog clear module-dialog-address module-dialog-show">
      <div class="dialog-panel">
        <div class="topbar">
          <div class="dialog-tit clear">
            <h4 class="js-dialog-title">管理收货地址</h4>
          </div>
          <span class="dialog-close" @click="closePop">x</span>
        </div>
        <div class="dialog-con js-dialog-container">
          <div class="animate-layer">
            <div class="dialog-inner js-address-add">
              <div class="save-address-box">
                <div class="address-form">
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="收货人姓名"
                        v-model="receive.name"
                      />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3" :class="{'form-invalid-item':phoneError}">
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="手机号"
                        v-model="receive.phone"
                        @blur="inspectPhone"
                        @focus="setPhoneError"
                      />
                      <div v-show="phoneError" class="verify-error">请填写正确的手机号</div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 area-code-w fn-left form-valid-item">
                      <input
                        type="text"
                        class="js-verify js-address-area-code"
                        placeholder="区号（可选）"
                        v-model="receive.areaCode"
                      />
                      <div class="verify-error"></div>
                    </div>
                    <div class="form-item-v3 telephone-w fn-right form-valid-item">
                      <input
                        type="text"
                        class="js-verify js-address-telephone"
                        placeholder="固定电话（可选）"
                        v-model="receive.landLine"
                      />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item province-wrapper">
                      <select
                        name="province_code"
                        class="province select-province js-form-province js-verify"
                        v-model="receive.provinceId"
                      >
                        <option value="0">请选择省份</option>
                        <option
                          :value="province.area_id"
                          v-for="(province, index) in AddList"
                          :key="index"
                        >{{province.area_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row clear">
                    <div class="form-item-v3 select-item city-wrapper fn-left form-focus-item">
                      <select
                        class="city select-city js-form-city js-verify"
                        v-model="receive.cityId"
                      >
                        <option value="0">请选择城市</option>
                        <option
                          :value="city.area_id"
                          v-for="(city, index) in cityList"
                          :key="index"
                        >{{city.area_name}}</option>
                      </select>
                    </div>
                    <div class="form-item-v3 select-item district-wrapper fn-right form-focus-item">
                      <select
                        class="city select-city js-form-city js-verify"
                        v-model="receive.countyId"
                      >
                        <option value="0">请选择区县</option>
                        <option
                          :value="county.area_id"
                          v-for="(county,index) in countyList"
                          :key="index"
                        >{{county.area_name}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="module-form-row">
                    <div class="form-item-v3">
                      <input
                        type="text"
                        class="js-verify"
                        placeholder="详细地址，如街道名称，楼层，门牌号码等"
                        v-model="receive.add"
                      />
                      <div class="verify-error"></div>
                    </div>
                  </div>
                  <div class="module-form-row fn-clear">
                    <input type="checkbox" class="hide" />
                    <span
                      class="blue-checkbox"
                      :class="{'blue-checkbox-on': receive.default}"
                      @click="checkedDefault"
                    ></span>设为默认
                  </div>
                  <div
                    class="dialog-blue-btn big-main-btn js-verify-address"
                    :class="{'disabled-btn':!isRight}"
                    @click="submitReceiveHandle"
                  >
                    <a>保存</a>
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
import AddList from "../lib/addList.js";
export default {
  name: "AddressPop",
  data() {
    return {
      AddList,
      receive: {
        name: "",
        phone: "",
        areaCode: "",
        landLine: "",
        provinceId: 0,
        province: "",
        cityId: 0,
        city: "",
        countyId: 0,
        county: "",
        add: "",
        default: false,
        checked: false
      },
      cityList: [],
      countyList: [],
      phoneError: false,
      isRight: false
    };
  },
  created() {
    if (this.oldReceive) {
      let province = this.AddList.filter(province => {
        return province.area_id == this.oldReceive.provinceId;
      })[0];
      this.receive.province = province.area_name;
      this.cityList = province.city_list;
      let city = this.cityList.filter(city => {
        return city.area_id == this.oldReceive.cityId;
      })[0];
      this.receive.city = city.area_name;
      this.countyList = city.county_list;
      this.receive = JSON.parse(JSON.stringify(this.oldReceive));
    }
  },
  watch: {
    "receive.provinceId"() {
      if (this.receive.provinceId != 0) {
        let province = this.AddList.filter(province => {
          return province.area_id == this.receive.provinceId;
        })[0];
        this.receive.province = province.area_name;
        this.cityList = province.city_list;
      } else {
        this.cityList = [];
        this.receive.province = "";
        this.receive.cityId = 0;
      }
      this.inspectReceive();
    },
    "receive.cityId"() {
      if (this.receive.cityId != 0) {
        let city = this.cityList.filter(city => {
          return city.area_id == this.receive.cityId;
        })[0];
        this.receive.city = city.area_name;
        this.countyList = city.county_list;
      } else {
        this.countyList = [];
        this.receive.city = "";
        this.receive.countyId = 0;
      }
      this.inspectReceive();
    },
    "receive.countyId"() {
      if (this.receive.countyId != 0) {
        let county = this.countyList.filter(county => {
          return county.area_id == this.receive.countyId;
        })[0];
        this.receive.county = county.area_name;
      } else {
        this.receive.county = "";
      }
      this.inspectReceive();
    },
    ["receive.name"]() {
      this.inspectReceive();
    },
    ["receive.phone"]() {
      this.inspectReceive();
    },
    ["receive.add"]() {
      this.inspectReceive();
    }
  },
  props: {
    oldReceive: {
      type: Object
    },
    receiveIndex: {
      type: Number
    }
  },
  computed: {
    receiveInfo() {
      return this.$store.state.receiveInfo;
    }
  },
  methods: {
    closePop() {
      this.$emit("close");
    },
    inspectPhone() {
      if (this.receive.phone.length === 11 && !isNaN(this.receive.phone)) {
        this.phoneError = false;
      } else {
        this.phoneError = true;
      }
    },
    setPhoneError() {
      this.phoneError = false;
    },
    checkedDefault() {
      this.receive.default = !this.receive.default;
      this.receive.checked = !this.receive.checked;
    },
    inspectReceive() {
      if (
        this.receive.name &&
        this.receive.phone.length == 11 &&
        !isNaN(this.receive.phone) &&
        this.receive.province &&
        this.receive.city &&
        this.receive.county &&
        this.receive.add
      ) {
        this.isRight = true;
      } else {
        this.isRight = false;
      }
    },
    submitReceiveHandle() {
      this.$store.commit("submitReceive", [this.receive, this.receiveIndex]);
      this.$emit("close");
    }
  }
};
</script>
<style scoped>
@import "../assets/css/address-pop.css";
</style>
