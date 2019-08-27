<template>
    <div>
        <div class="header">
            <div class="content-wrapper">
                <div class="avata">
                    <img :src="seller.avatar" alt="" width="64" height="64">
                </div>
                <div class="content">
                    <div class="title">
                        <span class="brand"></span>
                        <span class="name">{{seller.name}}</span>
                    </div>
                    <div class="description">
                        {{seller.description}}/{{seller.deliveryTime}}分鐘送達
                    </div>
                    <div v-if="seller.supports" class="support">
                        <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="text">{{seller.supports[0].description}}</span>
                    </div>
                </div>
                <div v-if="seller.supports" class="support-count" @click="showDetail">
                    <span class="count">{{seller.supports.length}}個</span>
                    <i class="fas fa-arrow-right icon"></i>
                </div>
            </div>
            <div class="bulletin-wrapper" @click="showDetail">
                <span class="bulletin-title"></span>
                <span class="bulletin-text">{{seller.bulletin}}</span>
                <i class="fas fa-arrow-right"></i>
            </div>
            <div class="background">
                <img :src="seller.avatar" width="100%" height="100%">
            </div>
            <div  v-show="detailShow" class="detail">
                <div class="detail-wrapper clearfix">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star-wrapper">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">優惠資訊</div>
                            <div class="line"></div>
                        </div>
                        <ul class="supports" v-if="seller.supports">
                            <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="detail-close"><i class="fas fa-times" @click="hideDetail"></i></div>
            </div>
        </div>
    </div>
</template>

<script>
import star from 'components/star/star'

export default {
    name: 'Header',
    components: {
        star
    },
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            detailShow: false
        }
    },
    methods: {
        showDetail () {
            this.detailShow = true;
        },
        hideDetail () {
            this.detailShow = false;
        }
    },
    created () {
        this.classMap = ['decrease','discount','special','invoice','guarantee'];
    }
}
</script>

<style lang="scss" scoped>
    .header {
        position: relative;
        overflow: hidden;
        background: rgba(7,17,27,.5);
        color: #fff;

        .content-wrapper {
            padding: 24px 12px 18px 24px;
            position: relative;
            font-size: 0;

            .avata {
                display: inline-block;
                vertical-align: top;

                img {
                    border-radius: 2px;
                }
            }

            .content {
                margin-left: 16px;
                display: inline-block;
            }

            .title {
                margin: 2px 0 8px 0;
            }

            .brand {
                display: inline-block;
                width: 30px;
                height: 18px;
                @include bg-image('brand');
                background-size: 30px 18px;
                background-repeat: no-repeat;
                vertical-align: top;
            }

            .name {
                margin-left: 6px;
                font-size: 16px;
                line-height: 18px;
                font-weight: bold;
            }

            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }

            .support {
                .icon {
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    vertical-align: top;
                    background-size: 12px 12px;
                    background-repeat: no-repeat;
                    &.decrease {
                        @include bg-image('decrease_1');
                    }
                    &.discount {
                        @include bg-image('discount_1');
                    }
                    &.guarantee {
                        @include bg-image('guarantee_1');
                    }
                    &.invoice {
                        @include bg-image('invoice_1');
                    }
                    &.special {
                        @include bg-image('special_1');
                    }
                }
                .text {
                    line-height: 12px;
                    font-size: 12px;
                }
            }

            .support-count {
                border-radius: 14px;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                position: absolute;
                right: 12px;
                bottom: 18px;
                background: rgba(0,0,0,.2);
                text-align: center;
                cursor: pointer;

                .count {
                    font-size: 14px;
                }

                .icon {
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                }
            }
        }

        .bulletin-wrapper {
            padding: 0 22px 0 12px;
            height: 28px;
            line-height: 28px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            position: relative;
            background: rgba(7,17,27,.2);
            cursor: pointer;

            .bulletin-title {
                margin-top: 9px;
                display: inline-block;
                vertical-align: top;
                width: 22px;
                height: 12px;
                @include bg-image ('bulletin');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }

            .bulletin-text {
                margin: 0 4px;
                font-size: 10px;
            }

            .fa-arrow-right {
                position: absolute;
                right: 12px;
                top: 9px;
                font-size: 10px;
            }
        }

        .background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            filter: blur(10px);
        }

        .detail {
            overflow: auto;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
            background: rgba(7,17,27,.8);

            &-wrapper {
                width: 100%;
                min-height: 100%;
            }

            &-main {
                margin-top: 64px;
                padding-bottom: 64px;

                .name {
                    text-align: center;
                    line-height: 16px;
                    font-size: 16px;
                    font-weight: 700;
                }

                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }

                .title {
                    display: flex;
                    margin: 30px auto 24px auto;
                    width: 80%;
                }

                .line {
                    flex: 1;
                    position: relative;
                    top: -6px;
                    border-bottom: 1px solid rgba(255,255,255,.2);
                }

                .text {
                    padding: 0 12px;
                    font-size: 14px;
                }

                .supports {
                    width: 80%;
                    margin: 0 auto;

                    &-item {
                        margin-bottom: 12px;
                        padding: 0 12px;
                        font-size: 0;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        .icon {
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            margin-right: 6px;
                            vertical-align: top;
                            background-size: 16px 16px;
                            background-repeat: no-repeat;

                            &.decrease {
                                @include bg-image('decrease_2');
                            }
                            &.discount {
                                @include bg-image('discount_2');
                            }
                            &.guarantee {
                                @include bg-image('guarantee_2');
                            }
                            &.invoice {
                                @include bg-image('invoice_2');
                            }
                            &.special {
                                @include bg-image('special_2');
                            }
                        }

                        .text {
                            line-height: 16px;
                            font-size: 12px;
                        }
                    }
                }

                .bulletin {
                    width: 80%;
                    margin: 0 auto;
                    .content {
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }

            &-close {
                margin: -164px auto 0 auto;
                position: relative;
                width: 32px;
                height: 32px;
                clear: both;
                font-size: 32px;
            }
        }
    }
</style>