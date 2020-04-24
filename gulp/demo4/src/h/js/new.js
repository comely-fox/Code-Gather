/* global require */
require.config({
  paths: {
    jQuery: [
      'https://cdn.bootcss.com/zepto/1.2.0/zepto',
      'lib/jquery-1.11.3.min'
    ],
    script: 'script',
    util: 'util/util',
    news_api: 'api/news_api',
    render_news_nav: 'common/render_news_nav'
  }
})

require(['jQuery', 'util', 'news_api', 'render_news_nav'], function (
  $,
  util,
  request,
  renderNavNews
) {
  'use strict'
  $(function () {
    renderNavNews(function (a, b, originUrl) {
      $('.img-wrap a').attr('href', originUrl)
    })

    request.getNewArticle(util.getQueryString('aid'), function (res) {
      $('.box h1').text(res.title)
      $('.box .text-wrap').html(
        res.content.replace(/(href|src)="([^"#]+)"/g, function (_, attr, path) {
          return attr + '="http://bbs.com:4080/' + path + '"'
        })
      )
    })
  })
})
