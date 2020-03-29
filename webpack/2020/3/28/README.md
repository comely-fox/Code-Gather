####tip:

folder:

- scss, image, font, data, ... 管理资源， 解析非 js 模块
  1. scss: [style-loader, css-loader, sass-loader, postcss-loader]
  2. image: [url-loader, file-loader, image-webpack-loader, responsive-loader] any file
  3. font: [url-loader, file-loader, font-awesome]
  4. data: [csv-loader, xml-loader]
- output - 管理输出
  1. html-webpack-plugin 生成 html 文件
  2. mini-css-extract-plugin 提取 css 到文件
  3. clean-webpack-plugin 删除 dist 目录
  4. webpack-manifest-plugin 生成 manifest 文件
