<template>
    <div class="index">
        <index-header :seller="seller"></index-header>
        <index-tab></index-tab>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
import IndexHeader from '@/components/index/Header'
import IndexTab from '@/components/index/Tab'
import axios from 'axios'
import {urlParse} from '@/common/js/util'

const ERR_OK = 0;
const debug = process.env.NODE_ENV !== 'production';

export default {
    name: "Index",
    components: {
        IndexHeader,
        IndexTab
    },
    data () {
        return {
            seller: {
                id: (() => {
                    let queryParam = urlParse();
                    return queryParam.id;
                })
            }
        }
    },
    created() {
        const url   = debug ? '/api/seller' : './seller.json';
        // console.log('')
        // axios.get('/api/seller?id=' + this.seller.id).then(res => {
        axios.get(url).then(res => {
            if (debug) {
                res = res.data.data;
            }else {
                res = res.data.seller;
            }

            this.seller = Object.assign({},this.seller, res);
            
        })
    },
}
</script>