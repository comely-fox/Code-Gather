/* global require  */
require.config({
  paths: {
    jQuery: 'lib/jquery-1.11.3.min',
    script: 'script',
    util: 'util/util',
    news_api: 'api/news_api',
    render_news_nav: 'common/render_news_nav'
  }
})

require(['jQuery', 'news_api', 'render_news_nav'], function (
  $,
  request,
  renderNavNews
) {
  'use strict'
  require(['script'])

  $(function () {
    renderNavNews(function (catid, catname) {
      $('.box h1').text(catname)
      getNewsList(catid, catname)

      $('#news a').click(function () {
        var curCatid = $(this).attr('data-catid')
        var catname = $(this).attr('title')

        if (curCatid === catid) return
        $('.box h1').text(catname)
        $(this).addClass('active').siblings().removeClass('active')
        getNewsList(curCatid, catname)
        catid = curCatid
      })
    })
  })
  function getNewsList(catid, catname) {
    var p = 2
    if (catid) {
      request.getNewsList(catid, function (res) {
        var products = res.data
        var getTimestamp = Date.now()
        var subHtml = `${products
          .map(
            (value) => `
               <li><a href="new.html?aid=${value.aid}&_dc=${getTimestamp}&catid=${catid}&catname=${catname}"><div class="text"><i class="iconfont iconwenzhang"></i><p>${value.title}</p></div><span>${value.dateline}</span></a></li>
            `
          )
          .join('')}`
        $('.list').html(subHtml)

        if (res.count <= 10) {
          $('.moreNews').hide()
        } else {
          $('.moreNews').show()
        }
      })
      $('.moreNews').delegate('.load-more', 'click', () => {
        request.getNewsListMore(p, function (res) {
          var products = res.data
          var subHtml = ` ${products
            .map(
              (value) =>
                `<li><a href="${value.url}"><div class="text"><i class="iconfont iconwenzhang"></i><p>${value.title}</p></div><span>${value.dateline}</span></a></li>`
            )
            .join('')}`
          $('.list').append(subHtml)
          p++
        })
      })
    } else {
      $('.box').hide()
    }
  }
})
