/* global define */
define('news_api', ['jQuery'], function ($) {
  'use strict'
  const baseUrl = 'http://rap2.taobao.org:38080/app/mock/251524/get/'
  const api1 = baseUrl + 'get_news_nav.do?'
  const api2 = baseUrl + 'get_news_list.do?'
  const api3 = baseUrl + 'get_news_list_more.do?'
  const api4 = baseUrl + 'get_new_article.do?'

  const request = {
    getNav(resolve) {
      return $.getJSON(api1 + 'mod=cat&catid=1&callback=?', ({ data }) => {
        resolve.call(this, data)
      })
    },

    getNewsList(catid, resolve) {
      this.catid = catid
      return $.getJSON(
        `${api2}mod=news&catid=${catid}&callback=?&jsonpcallback=listData`,
        resolve.bind(this)
      )
    },
    getNewsListMore(page, resolve) {
      return $.getJSON(
        `${api3}mod=news&catid=${this.catid}&page=${page}&callback=?&jsonpcallback=listData`,
        resolve.bind(this)
      )
    },
    getNewArticle(aid, resolve) {
      return $.getJSON(
        `${api4}mod=news&aid=${aid}&callback=?&jsonpcallback=listData`,
        resolve.bind(this)
      )
    }
  }

  return request
})
