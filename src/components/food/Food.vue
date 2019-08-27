<template>
    <div v-show="showFlag" class="food" ref="food">
        <div class="food-content">
            <div class="image-header">
                <img :src="food.image" alt="">
                <div class="back" @click="hide">
                    <i class="fas fa-arrow-left"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">{{food.name}}</h1>
                <div class="detail">
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好評率{{food.rating}}</span>
                </div>
                <div class="price">
                    <span class="now">${{food.price}}</span>
                    <span class="old" v-show="food.oldPrice">${{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                </div>
                <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入購物車</div>
            </div>
            <split></split>
            <div class="info" v-show="food.info">
                <h1 class="title">商品訊息</h1>
                <p class="text">{{food.info}}</p>
            </div>
            <split></split>
            <div class="rating">
                <h1 class="title">商品評價</h1>
                <rating-select @changeType="changeSelectType" @changeContent="changeContentType" :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings"></rating-select>
                <div class="rating-wrapper">
                    <ul v-show="food.ratings && food.ratings.length">
                        <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" :key="index" class="rating-item">
                            <div class="user">
                                <span class="name">{{rating.username}}</span>
                                <img width="12" height="12" :src="rating.avatar" alt="" class="avatar">
                            </div>
                            <div class="time">{{rating.rateTime}}</div>
                            <p class="text">
                                <span class="fas" :class="{'fa-thumbs-up': rating.rateType === 0, 'fa-thumbs-down': rating.rateType === 1}"></span>
                                {{rating.text}}
                            </p>
                        </li>
                    </ul>
                    <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暫無評價</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const positive = 0;
const negative = 1;
const all      = 2;

import Vue from 'vue'
import BScroll from 'better-scroll'
import CartControl from 'components/cartcontrol/Cartcontrol'
import Split from 'components/split/Split'
import RatingSelect from 'components/ratingselect/RatingSelect'
// import {formatDate} from '@/common/js/date'

export default {
    name: 'Food',
    components: {
        CartControl,
        Split,
        RatingSelect
    },
    props: {
        food: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false,
            selectType: all,
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推薦',
                negative: '吐槽'
            }
        }
    },
    methods: {
        show () {
            this.showFlag = true;
            this.selectType = all;
            this.onlyContent = true;
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true
                    })
                }else {
                    this.scroll.refresh()
                }
            })
        },
        hide () {
            this.showFlag = false;
        },
        addFirst () {
            Vue.set(this.food, 'count', 1);
        },
        needShow (type,text) {

            if (this.onlyContent && !text) {
                return false;
            }
            if (this.selectType === all) {
                return true;
            }else {
                return type === this.selectType
            }
        },
        changeSelectType (type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        changeContentType (content) {
            this.onlyContent = content;
            this.$nextTick(() => {
                this.scroll.refresh();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .food {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
        .image-header {
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 100%;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .back {
                position: absolute;
                top: 10px;
                left: 0;
                .fa-arrow-left {
                    padding: 10px;
                    display: block;
                    font-size: 20px;
                    color: #fff;
                }
            }
        }
        .content {
            position: relative;
            padding: 18px;
            .title {
                margin-bottom: 8px;
                line-height: 14px;
                font-size: 14px;
                font-weight: 700;
                color: rgb(7,17,27);
            }
            .detail {
                margin-bottom: 18px;
                line-height: 10px;
                font-size: 0;
                .sell-count, .rating {
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .sell-count {
                    margin-right: 12px;
                }
            }
            .price {
                height: 10px;
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
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 12px;
            bottom: 12px;
        }
        .buy {
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            border-radius: 12px;
            padding: 0 12px;
            box-sizing: border-box;
            font-size: 10px;
            color: #fff;
            background: rgb(0,160,220);
        }
        .info {
            padding: 18px;
            .title {
                margin-bottom: 6px;
                line-height: 14px;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            .text {
                padding: 0 8px;
                font-size: 12px;
                line-height: 24px;
                color: rgb(77,85,93);
            }
        }
        .rating {
            padding-top: 18px;
            .title {
                margin-left: 18px;
                line-height: 14px;
                font-size: 14px;
                color: rgb(7,17,27);
            }
            &-wrapper {
                padding: 0 18px;
            }
            &-item {
                @include border-1px (rgba(7,17,27,.1));
                padding: 16px 0;
                position: relative;
                .user {
                    position: absolute;
                    right: 0;
                    top: 16px;
                    line-height: 12px;
                    font-size: 0;
                    .name {
                        margin-right: 6px;
                        display: inline-block;
                        vertical-align: top;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                    .avatar {
                        border-radius: 50%;
                    }
                }
                .time {
                    margin-bottom: 6px;
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .text {
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7,17,27);
                    .fa-thumbs-up, .fa-thumbs-down {
                        margin-right: 4px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                    .fa-thumbs-up {
                        color: rgb(0,160,220);
                    }
                    .fa-thumbs-down {

                    }
                }
            }
            .no-rating {
                padding: 16px 0;
                font-size: 12px;
                color: rgb(147,153,159);
            }
        }
    }
</style>