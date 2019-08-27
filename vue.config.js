
const path    = require('path');
const appData = require('./data.json');
const seller  = appData.seller;
const goods   = appData.goods;
const ratings = appData.ratings;


function resolve (dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/vue_travel/' : '/',
    publicPath: './',
    lintOnSave: false,
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('styles', resolve('src/common/styles'))
            .set('components', resolve('src/components'))
            .set('api', resolve('src/api'))
    },
    css: {
        loaderOptions: {
            sass: {
            // data: `@import "styles/share/_variables.scss";`
            data: `@import "styles/mixins.scss";`
            }
        }
    },
    devServer: {
        before(app) {
            app.get('/api/seller', function(req,res) {
                res.json({
                    errno: 0,
                    data: seller
                })
            }),
            app.get('/api/goods', function(req,res){
                res.json({
                    errno: 0,
                    data: goods
                })
            })
            app.get('/api/ratings', function(req,res){
                res.json({
                    errno: 0,
                    data: ratings
                })
            })
        }
    }
}