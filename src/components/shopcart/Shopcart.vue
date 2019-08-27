<template>
    <div class="shopcart">
        <div class="content" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight': totalCount > 0}">
                        <span><i :class="{'highlight': totalCount > 0}" class="fas fa-shopping-cart"></i></span>
                    </div>
                    <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight': totalPrice > 0}">NT${{totalPrice}}</div>
                <div class="desc">另需配送費{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="pay">
                <div class="pay" :class="payClass">
                    {{payDesc}}
                </div>
            </div>
        </div>

        <div class="shopcart-list" v-show="listShow" :class="{'showItem': listShow}">
            <div class="list-header">
                <h1 class="title">購物車</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="food" v-for="(food,index) in selectFoods" :key="index">
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>NT${{food.price * food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <cart-control :food="food"></cart-control>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="hideList"></div>
        </transition>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import CartControl from 'components/cartcontrol/Cartcontrol'

export default {
    name: 'ShopCart',
    props: {
        selectFoods: {
            type: Array,
            default () {
                return []
            }
        },
        deliveryPrice: {
            type: Number
        },
        minPrice: {
            type: Number
        }
    },
    components: {
        CartControl
    },
    data () {
        return {
            fold: true
        }
    },
    methods: {
        toggleList () {
            if (!this.totalCount) {
                return;
            }
            this.fold = !this.fold;
        },
        pay () {
            if (this.totalPrice < this.minPrice) {
                return;
            }
            window.alert(`支付${this.totalPrice}元`)
        },
        empty () {
            this.selectFoods.forEach((food) => {
                food.count = 0;
            })
        },
        hideList () {
            this.fold = true;
        }
    },
    computed: {
        totalCount () {
            var count = 0;
            this.selectFoods.forEach((food) => {
                count += food.count
            })
            return count;
        },
        totalPrice () {
            var total = 0;
            this.selectFoods.forEach((food) => {
                total += food.price * food.count;
            })
            return total;
        },
        payClass () {
            if (this.totalPrice < this.minPrice) {
                return 'not-enough'
            }else {
                return 'enough'
            }
        },
        payDesc () {
            if (this.totalPrice === 0) {
                return `NT${this.minPrice}元起送`
            }else if (this.totalPrice < this.minPrice) {
                const diff = this.minPrice - this.totalPrice;
                return `還差${diff}元起送`
            }else {
                return '去結算'
            }
        },
        listShow () {
            if (!this.totalCount) {
                this.fold = true;
                return false;
            }
            const show = !this.fold;
            if (show) {
                if (!this.scroll) {
                    this.$nextTick(() => {
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        })
                    })
                }else {
                    this.scroll.refresh()
                }
            }
            return show;
        }
    }
}
</script>

<style lang="scss" scoped>
    .shopcart {
        position: fixed;
        bottom: 0;
        z-index: 99;
        width: 100%;
        height: 48px;
        max-width: 375px;

        .content {
            display: flex;
            background: #141d27;

            &-left {
                flex: 1;
                color: rgba(255,255,255,.4);
                .logo-wrapper {
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background: #141d27;
                    .logo {
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        background: #2b343c;
                        text-align: center;
                        &.highlight {
                            background: rgb(0,160,220);
                        }
                        .fa-shopping-cart {
                            font-size: 24px;
                            line-height: 44px;
                            color: #80858a;
                            &.highlight {
                                color: #fff;
                            }
                        }
                    }
                    .num {
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: #fff;
                        background: rgb(240,20,20);
                        box-shadow: 0 4px 8px 0 rgba(0,0,0,.4);
                    }
                }
                .price {
                    margin-top: 12px;
                    display: inline-block; 
                    vertical-align: top;
                    line-height: 24px;
                    box-sizing: border-box;
                    padding-right: 12px;
                    border-right: 1px solid rgba(255,255,255,.1);
                    font-size: 16px;
                    font-weight: 700;
                    &.highlight {
                        color: #fff;
                    }
                }
                .desc {
                    margin: 12px 0 0 12px;
                    display: inline-block;
                    vertical-align: top;
                    line-height: 24px;
                    font-size: 10px;
                }
            }

            &-right {
                flex: 0 0 105px;
                width: 105px;
                .pay {
                    height: 48px;
                    line-height: 48px;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 700;
                    color: #fff;
                    &.not-enough {
                        background: #2b333b;
                    }
                    &.enough {
                        background: #00b43c;
                        color: #fff;
                    }
                }
            }
        }

        .shopcart-list {
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;

            .list-header {
                border-bottom: 1px solid rgba(7,17,27,.1);
                padding: 0 18px;
                height: 40px;
                line-height: 40px;
                background: #f3f5f7;
                .title {
                    float: left;
                    font-size: 14px;
                    color: rgb(7,17,27);
                }
                .empty {
                    float: right;
                    font-size: 12px;
                    color: rgb(0,160,220)
                }
            }
            .list-content {
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background: #fff;
                .food {
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    @include border-1px (rgba(7,17,27,.1));
                    .name {
                        line-height: 24px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                    }
                    .price {
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 14px;
                        font-weight: 700;
                        color: rgb(240,20,20);
                    }
                    .cartcontrol-wrapper {
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }
            }
        }
    }

    .list-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
    }

    .showItem {
        transform: translate3d(0,-100%,0);
    }

    .fade-enter-active {
            transition: all 3s;
            opacity: 1;
            background: rgba(7,17,27,.6);
        }

    .fade-enter,.fade-leave {
        opacity: 0;
        background: rgba(7,17,27,.7);
    }
</style>