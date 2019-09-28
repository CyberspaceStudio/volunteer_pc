module.exports = {
  baseUrl: './', // 默认'/'，部署应用包时的基本 URL
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/assets/css/varuables.scss` 这个文件
        data: `@import "@/style/common.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      '/pc': {
        target: 'https://xdvolunteer.xyz',
        secure: false
      }
    } 
  } 

};
