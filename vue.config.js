module.exports = {
  configureWebpack: {
    resolve: {    //解决路径相关的问题
      alias: {   //配置别名   @默认就是scr，在脚手架已经配置好了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        //为什么router ，store 暂时不用，因为其一般只要在一个地方引用
      }
    }
  }
}

