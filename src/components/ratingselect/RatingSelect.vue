<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2,$event)" class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0,$event)" class="block positive" :class="{'active': selectType === 0}"><span class="count">{{desc.positive}}</span>{{positives.length}}</span>
            <span @click="select(1,$event)" class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
        </div>
        <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
            <span><i class="fas fa-check-circle"></i></span>
            <span class="text">只看有內容的評價</span>
        </div>
    </div>
</template>

<script>

const positive = 0;
const negative = 1;
const all      = 2;

export default {
    name: "RatingSelect",
    props: {
        ratings: {
            type: Array,
            default () {
                return [];
            }
        },
        selectType: {
            type: Number,
            default: all
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '全部',
                    positive: '滿意',
                    negative: '不滿意'
                }
            }
        }
    },
    methods: {
        select (type,event) {
            // this.selectType = type;
            // console.log('select', this.selectType)
            this.$emit('changeType',type)
        },
        toggleContent () {
            // this.onlyContent = !this.onlyContent;
            this.$emit('changeContent',!this.onlyContent)
        }
    },
    computed: {
        positives () {
            return this.ratings.filter((rating) => rating.rateType === positive)
        },
        negatives () {
            return this.ratings.filter((rating) => rating.rateType === negative)
        }
    }
}
</script>

<style lang="scss" scoped>
    .ratingselect {
        .rating-type {
            margin: 0 18px;
            padding: 18px 0;
            @include border-1px(rgba(7,17,27,.1));
            font-size: 0;
        }
        .block {
            display: inline-block;
            padding: 8px 12px;
            margin-right: 8px;
            border-radius: 1px;
            font-size: 12px;
            color: rgb(77,85,93);
            &.active {
                color: #fff;
            }
            .count {
                margin-left: 2px;
                line-height: 16px;
                font-size: 8px;
            }
            &.positive {
                background: rgba(0,160,220,.2);
                &.active {
                    background: rgb(0,160,220);
                }
            }
            &.negative {
                background: rgba(77,87,93,.2);
                &.active {
                    background: rgb(77,85,93);
                }
            }
        }
        .switch {
            border-bottom: 1px solid rgba(7,17,27,.1);
            padding: 12px 18px;
            line-height: 24px;
            color: rgb(147,153,159);
            font-size: 0;
            &.on {
                .fa-check-circle {
                    color: #00c850;
                }
            }
            .fa-check-circle {
                display: inline-block;
                vertical-align: top;
                margin-right: 4px;
                font-size: 24px;
            }
            .text {
                font-size: 12px;
            }
        }
    }
</style>