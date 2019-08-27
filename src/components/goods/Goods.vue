<template>
        <div class="goods">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul>
                    <li @click="selectMenu(index)" v-for="(item,index) in goods" :key="index"  :class="{'current': currentIndex === index}" class="menu-item">
                        <span class="text">
                            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <ul>
                    <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li @click="selectFood(food)" v-for="(food,index) in item.foods" :key="index" class="food-item">
                                <div class="icon">
                                    <img width="57" height="57" :src="food.icon" alt="">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span class="count">月銷售{{food.sellCount}}份</span>
                                        <span>好評率{{food.rating}}%</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">${{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cart-control :food="food"></cart-control>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            <shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
            <food :food="selectedFood" ref="food"></food>
        </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import CartControl from 'components/cartcontrol/Cartcontrol'
import shopcart from 'components/shopcart/Shopcart'
import food from 'components/food/Food'

const debug = process.env.NODE_ENV !== 'production';
const ERR_OK = 0;

export default {
    name: 'Goods',
    props: {
        seller: {
            type: Object
        }
    },
    components: {
        CartControl,
        shopcart,
        food
    },
    data () {
        return {
            goods: [],
            listHeight: [],
            scrollY: 0,
            selectedFood: {}
        }
    },
    methods: {
        _initScroll () {
            this.menuScroll = new BScroll(this.$refs.menuWrapper,{
                click: true
            })
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                click: true,
                probeType: 3
            })
            this.foodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calaulateHeight () {
            const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            var height = 0;
            this.listHeight.push(height);
            for (let i=0; i<foodList.length; i++) {
                let item = foodList[i];
                height += item.clientHeight;
                this.listHeight.push(height);
            }
        },
        selectMenu (index) {
            const foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
            const el       = foodList[index]
            this.foodsScroll.scrollToElement(el,300)
        },
        selectFood (food) {
            this.selectedFood = food;
            this.$refs.food.show()
        }
    },
    computed: {
        currentIndex () {
            for (let i=0; i<this.listHeight.length; i++) {
                const height  = this.listHeight[i];
                const height2 = this.listHeight[i+1];
                if (!height2 || this.scrollY >= height && this.scrollY < height2) {
                    return i;
                }
            }
            return 0;
        },
        selectFoods () {
            if (this.goods.length === 0) return;
            const foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count) {
                        foods.push(food)
                    }
                })
            })
            return foods;
        }
    },
    created () {
        this.classMap = ['decrease','discount','special','invoice'];
        const url   = debug ? '/api/goods' : './goods.json';
        console.log(process.env.NODE_ENV);
        console.log(url)
        axios.get(url).then((res) => {
            console.log('goods ',res);
            if (debug) {
                res = res.data.data;
            }else {
                res = res.data.goods;
            }

            this.goods = res;
            this.$nextTick(() => {
                this._initScroll();
                this._calaulateHeight()
            })

        })
    }
}
</script>

<style lang="scss">
    .goods {
        display: flex;
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }

    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #f3f5f7;

        .menu-item {
            display: table;
            height: 54px;
            width: 56px;
            padding: 0 12px;
            line-height: 14px;

            &.current {
                position: relative;
                margin-top: -1px;
                z-index: 3;
                background: #fff;
                font-weight: 700;
                .text {
                    @include border-none();
                }
            }

            .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 2px;
                vertical-align: top;
                background-size: 16px 16px;
                background-repeat: no-repeat;

                &.decrease {
                    @include bg-image('decrease_3');
                }
                &.discount {
                    @include bg-image('discount_3');
                }
                &.guarantee {
                    @include bg-image('guarantee_3');
                }
                &.invoice {
                    @include bg-image('invoice_3');
                }
                &.special {
                    @include bg-image('special_3');
                }
            }

            .text {
                display: table-cell;
                width: 56px;
                @include border-1px (rgba(7,17,27,.1));
                vertical-align: middle;
                font-size: 12px;
            }
        }
    }

    .foods-wrapper {
        flex: 1;
        .title {
            border-left: 2px solid #d9dde1;
            padding-left: 14px;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: rgb(147,153,159);
            background: #f3f5f7;
        }
        .food-item {
            display: flex;
            margin: 18px;
            padding-bottom: 18px;
            @include border-1px (rgba(7,17,27,.1));
            &:last-child {
                @include border-none();
                margin-bottom: 0;
            }
            .icon {
                flex: 0 0 57px;
                margin-right: 10px;
            }
            .content {
                flex: 1;
            }
            .name {
                margin: 2px 0 8px 0;
                height: 14px;
                line-height: 14px;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            .desc,.extra {
                line-height: 10px;
                font-size: 10px;
                color: rgb(147,153,159);
            }
            .desc {
                margin-bottom: 8px;
                line-height: 12px;
            }
            .extra {
                .count {
                    margin-right: 12px;
                }
            }
            .price {
                font-weight: 700;
                line-height: 24px;
                .now {
                    margin-right: 8px;
                    font-size: 14px;
                    color: rgb(240,20,20);
                }
                .old {
                    text-decoration: line-through;
                    font-size: 10px;
                    color: rgb(147,53,159);
                }
            }
            .cartcontrol-wrapper {
                position: absolute;
                right: 0;
                bottom: 12px;
            }
        }
    }
</style>