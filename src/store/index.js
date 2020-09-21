import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        account: "",
        carPanelData: [],
        receiveInfo: [{
                name: "王某某",
                phone: "13811111111",
                areaCode: "010",
                landLine: "64627856",
                provinceId: 110000,
                province: "广东省",
                cityId: 110100,
                city: "广州区",
                countyId: 110106,
                county: "天河区",
                add: "广州大道北1098号",
                default: true,
                checked: true
            },
            {
                name: "陈某某",
                phone: "13822222222",
                areaCode: "020",
                landLine: "64627856",
                provinceId: 110000,
                province: "广东省",
                cityId: 110100,
                city: "广州区",
                countyId: 110106,
                county: "白云区",
                add: "钟落潭镇广从9路980号",
                default: false,
                checked: false
            }
        ],
        maxOff: false,
        carShow: false,
        carTimer: null,
        ball: {
            show: false,
            el: null,
            img: ""
        },
        orderData: [],
        provisionalOrder: []
    },
    mutations: {
        addCarPanelData(state, data) {
            let bOff = true;
            if (!state.ball.show) {
                state.carPanelData.forEach(goods => {
                    if (goods.sku_id === data.info.sku_id) {
                        goods.count += data.count;
                        bOff = false;
                        if (goods.count > goods.limit_num) {
                            goods.count -= data.count;
                            state.maxOff = true;
                            return;
                        }
                        state.carShow = true;
                        state.ball.show = true;
                        state.ball.img = data.info.ali_image;
                        state.ball.el = event.path[0];
                    }
                });
                if (bOff) {
                    let goodsData = data.info;
                    Vue.set(goodsData, "count", data.count);
                    Vue.set(goodsData, "checked", true);
                    state.carPanelData.push(goodsData);
                    state.carShow = true;
                    state.ball.show = true;
                    state.ball.img = data.info.ali_image;
                    state.ball.el = event.path[0];
                }
            }
        },

        delCarPanelData(state, id) {
            state.carPanelData.forEach((goods, index) => {
                if (goods.sku_id === id) {
                    state.carPanelData.splice(index, 1);
                }
            });
        },

        pushCarPanelDate(state, id) {
            state.carPanelData.forEach((goods, index) => {
                if (goods.sku_id === id) {
                    if (goods.count >= goods.limit_num) return;
                    goods.count++;
                    return;
                }
            });
        },
        subCarPanelDate(state, id) {
            state.carPanelData.forEach((goods, index) => {
                if (goods.sku_id === id) {
                    if (goods.count <= 1) return;
                    goods.count--;
                    return;
                }
            });
        },
        checkGoods(state, id) {
            state.carPanelData.forEach((goods, index) => {
                if (goods.sku_id === id) {
                    goods.checked = !goods.checked;
                    return;
                }
            });
        },

        allCheckGoods(state, allChecked) {
            state.carPanelData.forEach((goods, index) => {
                goods.checked = !allChecked;
            });
        },
        delCheckGoods(state) {
            let i = state.carPanelData.length;
            while (i--) {
                if (state.carPanelData[i].checked) {
                    state.carPanelData.splice(i, 1);
                }
            }
        },
        closePrompt(state) {
            state.maxOff = false;
        },
        showCar(state) {
            clearTimeout(state.carTimer);
            state.carShow = true;
        },
        hideCar(state) {
            state.carTimer = setTimeout(() => {
                state.carShow = false;
            }, 500);
        },
        checkDefault(state, data) {
            state.receiveInfo.forEach((receive, index) => {
                if (receive == data) {
                    receive.default = true
                } else {
                    receive.default = false
                }
            })
        },
        checkOut(state, provisionalOrder) {
            state.provisionalOrder = provisionalOrder;
        },
        submitReceive(state, data) {
            if (data[0].default) {
                state.receiveInfo.forEach((receive, index) => {
                    receive.default = false
                    receive.checked = false
                })
            }
            if (data[1] == null) {
                state.receiveInfo.push(data[0])
            } else {
                state.receiveInfo[data[1]] = data[0]
            }
        },
        submitOrder(state, data) {
            state.orderData.unshift(data);
            let i = state.carPanelData.length;
            while (i--) {
                if (state.carPanelData[i].checked) {
                    state.carPanelData.splice(i, 1);
                }
            }
        },
        payNow(state, id) {
            state.orderData.forEach(order => {
                if (order.orderId === id) {
                    order.isPay = true;
                    return;
                }
            });
        }
    },
    getters: {
        totleCount(state) {
            let count = 0;
            state.carPanelData.forEach(goods => {
                count += goods.count;
            });
            return count;
        },
        totlePrice(state) {
            let price = 0;
            state.carPanelData.forEach(goods => {
                price += goods.price * goods.count;
            });
            return price;
        },
        allChecked(state) {
            let allChecked = true;
            state.carPanelData.forEach(goods => {
                if (!goods.checked) {
                    allChecked = false;
                    return;
                }
            });
            return allChecked;
        },

        checkedCount(state) {
            let count = 0;
            state.carPanelData.forEach(goods => {
                if (goods.checked) {
                    count += goods.count;
                    return;
                }
            });
            return count;
        },
        checkedPrice(state) {
            let price = 0;
            state.carPanelData.forEach(goods => {
                if (goods.checked) {
                    price += goods.count * goods.price;
                    return;
                }
            });
            return price;
        },
        checkedGoods(state) {

            state.carPanelData.forEach(goods => {
                if (goods.checked) {
                    checkedGoods.push(goods);
                }
            });
            return checkedGoods;
        }
    },
    actions: {}
});

export default store;