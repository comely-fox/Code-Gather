/* global layer BigPicture Swiper jQuery */
;(function ($) {
  $(document).ready(function () {
    function setClickHandler(id, fn) {
      document.getElementById(id).onclick = fn
    }

    setClickHandler('video_container', function (e) {
      var className = e.target.className
      ~className.indexOf('htmlvid') &&
        BigPicture({
          el: e.target,
          vidSrc: e.target.getAttribute('vidSrc')
        })
      ~className.indexOf('vimeo') &&
        BigPicture({
          el: e.target,
          vimeoSrc: e.target.getAttribute('vimeoSrc')
        })
      ~className.indexOf('youtube') &&
        BigPicture({
          el: e.target,
          ytSrc: e.target.getAttribute('ytSrc')
        })
    })

    // 请求token

    $.getJSON($('.page').attr('data-url'), function (result) {
      if (result.success) {
        $('.page').attr('data-token', result.data.code)
      }
    })
    $.getJSON($('.page').attr('data-count'), function (result) {
      // $('.page').attr('data-total', result.data.total);
      if (result.success) {
        var total = result.data.total
        var cls = 'bg1'
        if (total > 50000) {
          cls = 'bg6'
        } else if (total > 30000) {
          cls = 'bg5'
        } else if (total > 10000) {
          cls = 'bg4'
        } else if (total > 5000) {
          cls = 'bg3'
        } else if (total > 2000) {
          cls = 'bg2'
        }
        $('#reg-pro').attr('class', cls)

        var aList = (total + '').split('')
        var iLen = aList.length
        var i = 0
        if (aList.length < 6) {
          iLen = 6 - aList.length
          for (i = 0; i < iLen; i++) {
            aList.unshift(0)
          }
        }
        var html = ''
        for (i = 0; i < aList.length; i++) {
          html += '<li class="bg' + aList[i] + '"></li>'
        }
        $('.count').html(html)
      }
    })

    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swp .swiper-container', {
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      loop: true,
      loopedSlides: 5,
      autoplay: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })

    $('.reg').delegate('.reg-btn ', 'click', function (e) {
      layer.open({
        type: 1,
        title: false,
        closeBtn: true,
        shadeClose: true,
        shade: 0.6,
        area: ['945px', '553px'],
        skin: 'dark',
        content: $('.reg-con').html()
      })

      $('.dark')
        .undelegate('.sumbit-btn ', 'click')
        .delegate('.sumbit-btn ', 'click', function (e) {
          e.stopPropagation()
          e.preventDefault()
          var val = $('.dark :input[name=mail]').val()
          $.ajax({
            url: $('.page').attr('data-send'),
            type: 'post',
            crossDomain: true,
            // dateType: 'json',
            //   contentType: "application/x-www-form-urlencoded;charset=utf-8",
            beforeSend: function (request) {
              request.setRequestHeader(
                'Access-Token',
                $('.page').attr('data-token')
              )
            },

            data: {
              sType: 'mail',
              sValue: val
            }
          }).done(function (data) {
            if (data.success) {
              // //成功
              layer.open({
                type: 1,
                title: false,
                closeBtn: true,
                shadeClose: true,
                shade: 0.6,
                area: ['945px', '553px'],
                skin: 'dark-su',
                cancel: function () {
                  layer.closeAll()
                  window.location.reload()
                },
                end: function () {
                  layer.closeAll()
                  window.location.reload()
                }
              })
            } else {
              var aMsg = {
                1: 'メールのフォーマットが正しくありません', // 邮箱格式错误
                2: 'メールアドレスは登録済みになります', // 邮箱已预约
                3: 'インターネットに接続されなくて、ページを更新してください' // 网络异常，请刷新页面
              }

              // 失败
              layer.open({
                type: 1,
                title: false,
                closeBtn: true,
                shadeClose: true,
                shade: 0.6,
                area: ['945px', '553px'],
                skin: 'dark-fail',
                content: aMsg[data.data.msg] || 'error'
              })
            }
          })
        })
    })

    // var _hmt = _hmt || []
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?b105d8d211daf39769dc4f94fd73770b'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })
})(jQuery)
