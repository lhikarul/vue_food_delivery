<template>
    <div class="tab">
        <div class="tab-item">
            <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/ratings">評論</router-link>
        </div>
        <div class="tab-item">
            <router-link to="/seller">商家</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Tab'
}
</script>

<style lang="scss">
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        @include border-1px (rgba(7,17,27,.1));

        &-item {
            flex: 1;
            text-align: center;
            a {
                display: block;
                font-size: 14px;
                color: rgb(77,85,93);
            }
            .active {
                color: #f01414;
            }
        }
    }
</style>