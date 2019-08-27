<template>
    <div class="cartcontrol">
        <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
            <i class="fas fa-minus-circle"></i>
        </div>
        <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
        <div class="cart-add"><i class="fas fa-plus-circle" @click.stop.prevent="addCart"></i></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    name: 'CartControl',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        addCart () {
            console.log('add cart')
            if (!this.food.count) {
                Vue.set(this.food, 'count', 1)
            }else {
                this.food.count++
            }
        },
        decreaseCart () {
            if (this.food.count) {
                this.food.count--
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .cartcontrol {
        font-size: 0;
        .cart-decrease, .cart-add {
            display: inline-block;
            padding: 6px;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0,160,220);
        }
        .cart-count {
            display: inline-block;
            vertical-align: top;
            width: 12px;
            padding-top: 6px;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            color: rgb(147,153,159)
        }
        .cart-add {
            display: inline-block;
        }
    }
</style>