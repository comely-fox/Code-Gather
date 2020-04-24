/* global define */
define('render_news_nav', ['jQuery', 'util', 'news_api'], function (
  $,
  { getQueryString },
  { getNav }
) {
  return function renderNewsNav(callback) {
    getNav(function (data) {
      const catid = getQueryString('catid') || data[0].catid
      const catname = getQueryString('catname') || data[0].catname

      const subHtml = `
            ${data
              .map(
                (value) => `
            <a href="javascript:;" title="${value.catname}" class="${
                  catid === value.catid ? 'active' : ''
                }"  data-catid="${value.catid}">
              <span>${value.catname}</span>
            </a>
           `
              )
              .join('')}`

      $('#news').html(subHtml)

      const originUrl = `news.html?catid=${catid}&catname=${catname}`
      typeof callback === 'function' && callback(catid, catname, originUrl)
    })
  }
})
