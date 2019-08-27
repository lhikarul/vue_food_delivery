<template>
    <div class="ratings" ref="ratings">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h1 class="score">{{seller.score}}</h1>
                    <div class="title">綜合評分</div>
                    <div class="rank">高於周邊商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服務態度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品評分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送達時間</span>
                        <span class="delivery">{{seller.deliveryTime}}分鐘</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect  @changeType="changeSelectType" @changeContent="changeContentType" :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings"></ratingselect>
            <div class="rating-wrapper">
                <ul>
                    <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in ratings" :key="index" class="rating-item">
                        <div class="avatar">
                            <img width="28" :src="rating.avatar" alt="">
                        </div>
                        <div class="content">
                            <h1 class="name">{{rating.username}}</h1>
                            <div class="star-wrapper">
                                <star :size="24" :score="rating.score"></star>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span class="fas fa-thumbs-up"></span>
                                <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
                            </div>
                            <div class="time">{{rating.rateTime}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import star from 'components/star/star'
import split from 'components/split/Split'
import ratingselect from 'components/ratingselect/RatingSelect'

const all = 2;
const ERR_OK = 0;
const debug = process.env.NODE_ENV !== 'production';

export default {
    name: 'Ratings',
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            ratings: [],
            showFlag: false,
            selectType: all,
            onlyContent: true
        }
    },
    methods: {
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
    },
    created () {
        const url   = debug ? '/api/ratings' : './ratings.json';
        axios.get(url).then((res) => {

            if (debug) {
                res = res.data.data;
            }else {
                res = res.data.ratings;
            }

            this.ratings = res;

            this.$nextTick(() => {
                this.scroll = new BScroll(this.$refs.ratings, {
                    click: true
                })
            })
            // if (res.errno === ERR_OK) {
            //     this.ratings = res.data;
            //     this.$nextTick(() => {
            //         this.scroll = new BScroll(this.$refs.ratings, {
            //             click: true
            //         })
            //     })
            // }
        })
    },
    components: {
        star,
        split,
        ratingselect
    }

}
</script>

<style lang="scss">
    .ratings {
        position: absolute;
        top: 174px;
        left: 0;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: 18px;
            &-left {
                padding-bottom: 6px 0;
                flex: 0 0 137px;
                width: 137px;
                border-right: 1px solid rgba(7,17,27,.1);
                text-align: center;
                @media only screen and (max-width: 320px) {
                    flex: 0 0 120px;
                    width: 120px;
                }
                .score {
                    margin-bottom: 6px;
                    line-height: 28px;
                    font-size: 24px;
                    color: rgb(255,153,0);
                }
                .title {
                    margin-bottom: 8px;
                    line-height: 12px;
                    font-size: 12px;
                    color: rgb(7,17,27);
                }
                .rank {
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
            }
            &-right {
                flex: 1;
                padding: 6px 0 6px 24px;
                @media only screen and (max-width: 320px) {
                    padding-left: 6px;
                }
                .score-wrapper {
                    margin-bottom: 8px;
                    line-height: 18px;
                    font-size: 0;
                    .title {
                        display: inline-block;
                        font-size: 12px;
                        font-size: 12px;
                        color: rgb(7,17,27);
                        line-height: 18px;
                    }
                    .star {
                        margin: 0 12px 0 0 ;
                        display: inline-block;
                        vertical-align: top;
                    }
                    .score {
                        display: inline-block;
                        vertical-align: top;
                        font-size: 12px;
                        color: rgb(255,153,0);
                        line-height: 18px;
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    .title {
                        line-height: 18px;
                        font-size: 12px;
                        color: rgb(7,17,27);
                    }
                    .delivery {
                        margin-left: 12px;
                        font-size: 12px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 18px;
            .rating-item {
                padding: 18px 0;
                display: flex;
                @include border-1px(rgba(7,17,27,.1));
                .avatar {
                    margin-right: 12px;
                    flex: 0 0 28px;
                    width: 28px;
                    img {
                        border-radius: 50%;
                    }
                }
                .content {
                    position: relative;
                    flex: 1;
                    .name {
                        margin-bottom: 4px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(7,17,27);
                    }
                    .star-wrapper {
                        margin-bottom: 6px;
                        font-size: 0;
                        .star {
                            margin-right: 6px;
                            display: inline-block;
                            vertical-align: top;
                        }
                        .delivery {
                            display: inline-block;
                            vertical-align: top;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                    }
                    .text {
                        margin-bottom: 8px;
                        line-height: 18px;
                        color: rgb(7,17,27);
                        font-size: 12px;
                    }
                    .recommend {
                        line-height: 16px;
                        font-size: 0;
                        .fa-thumbs-up, .item {
                            display: inline-block;
                            margin: 0 8px 4px 0;
                            font-size: 9px;
                        }
                        .fa-thumbs-up {
                            color: rgb(0,160,220);
                        }
                        .item {
                            border: 1px solid  rgba(7,17,27,.1);
                            padding: 0 6px;
                            border-radius: 1px;
                            color: rgb(147,153,159);
                            background: #fff;
                        }
                    }
                    .time {
                        position: absolute;
                        top: 0;
                        right: 0;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                }
            }
        }
    }
</style>