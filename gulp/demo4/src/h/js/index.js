/* global require */
function createScript(url, callback) {
  const script = document.createElement('script')
  script.src = url
  script.async = true
  document.head.append(script)
  script.onload = callback
}

require.config({
  paths: {
    jQuery: 'lib/jquery-1.11.3.min'
  }
})
require(['jQuery'], function ($) {
  require(['script'])
  $(function () {
    var base = $('span#msg').find('span')
    $('span#msg').append(base.clone().addClass('clone clone1'))
    $('span#msg').append(base.clone().addClass('clone clone2'))
    $('span#msg').append(base.clone().addClass('clone clone3'))
    $('span#msg').append(base.clone().addClass('clone clone4'))
  })
})
