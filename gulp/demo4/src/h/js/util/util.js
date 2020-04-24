/* global define */

/* ;(function (_, $) {
  _.getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    return r && decodeURIComponent(r[2])
  }
})(window._Root_ || (window._Root_ = {})) */

define('util', {
  getQueryString(attr) {
    const reg = new RegExp('(^|&)' + attr + '=([^&]*)(&|$)', 'i')
    const r = window.location.search.substr(1).match(reg)
    return r && decodeURIComponent(r[2])
  }
})
