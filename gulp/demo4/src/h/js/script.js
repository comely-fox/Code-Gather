/* SCREEN SHOT */
/* global $ */
var SsChange = function () {
  $('section#screenshot div.list a.selected').removeClass('selected')
  $(this).addClass('selected')

  $('section#screenshot div.zoom span.img')
    .stop()
    .css({ 'z-index': '1' })
    .fadeOut(function () {
      $(this).remove()
    })
  var source = $(this).data('source')
  // var newImg = $('<img>').attr({ 'src':'images/screenshot/' + source + '.png', 'alt':'SCREEN SHOT'}).attr({ 'z-index':'2' });
  var newImg = $('<span>')
    .addClass('img')
    .css({ 'background-image': "url('images/screenshot/" + source + ".png')" })
    .html('<span>SCREEN SHOT</span>')
  $('section#screenshot div.zoom').append(newImg)
}

var SsNext = function () {
  if ($('section#screenshot div.list a.selected').nextAll('a').length) {
    $('section#screenshot div.list a.selected').nextAll('a:first').click()
  } else {
    $('section#screenshot div.list a:first').click()
  }
}

var SsPrev = function () {
  if ($('section#screenshot div.list a.selected').prevAll('a').length) {
    $('section#screenshot div.list a.selected').prevAll('a:first').click()
  } else {
    $('section#screenshot div.list a:last').click()
  }
}

$(function () {
  // TODO:
  // eslint-disable-next-line no-use-before-define
  var _hmt = _hmt || []
  var hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?b105d8d211daf39769dc4f94fd73770b'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)

  $('section#screenshot div.list a').click(SsChange)
  $('section#screenshot button.next').click(SsNext)
  $('section#screenshot button.prev').click(SsPrev)
  $('section#screenshot div.list a:first').click()

  if (HasMobile() === true) {
    try {
      $('section#screenshot div.zoom').bind('swipeleft', SsNext)
      $('section#screenshot div.zoom').bind('swiperight', SsPrev)
    } catch (e) {}
  }
})

var browser = (function () {
  var s = navigator.userAgent.toLowerCase()
  console.log(s)
  var match =
    /(webkit)[ /](\w.]+)/.exec(s) ||
    /(opera)(?:.*version)?[ /](\w.]+)/.exec(s) ||
    /(.net)(?:.*? rv:([\w.]+))?/.exec(s) ||
    /(msie) ([\w.]+)/.exec(s) ||
    /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
    []
  return { name: match[1] || '', version: match[2] || '0' }
})()

var ChangeStyle = function () {
  if (browser.name === 'msie' || browser.name === '.net') {
    $('link#inu_stylesheet').prop('href', 'resource/style/styleIE.css')
  }
}

/* CHARACTER */
var deviceWidth = 0
var crtObj = null
var crtList = [
  {
    NAME: '氷の女祭司   ',
    TITLE: 'バイソン・アーレン  ',
    FILE: '01',
    DESC:
      'ヴァニルの親友。「神託護衛軍」を指揮し、<br/>忠誠と愛情の葛藤から親友と袂を分かつ。<br/>教会を守るために、さらに心の平穏を守るために。<br/>彼は一生をかけてあまたの戦場で勝利を収めてきた。'
  },
  {
    NAME: 'デスレンジャー',
    TITLE: 'エレナ・スチュアート',
    FILE: '02',
    DESC:
      '極めて敬虔な教会大祭司・ヴァニルの娘。<br/>血の冬夜に生まれ、信仰の光芒により知恵を授かり、<br/>一家が没落した後に運命の導きで神聖な大義を継承した。<br/>それからの人生は教会と共にあり、<br/>大祭司の名において誠心誠意、神々に仕える。'
  },
  {
    NAME: '守衛騎士',
    TITLE: 'ヴィルサーク・サジットオータン',
    FILE: '03',
    DESC:
      '過去を失ったドラゴンハンター。<br/>かつては一族の最も勇猛な戦士だった。<br/>しかし、記憶には欠片のような場面しか残っていない。<br/>瞬く間に消える烈火、血の霧、殺戮、そしてまだ解けぬ困惑……。<br/>千年の眠りの後、咆哮と悲惨な慟哭で彼は目覚めた。<br/>自身の本能が赴くまま、弓矢を握り締め、弱き者のために戦い続ける。'
  },
  {
    NAME: '闘獣王',
    TITLE: 'ラソール・ロック',
    FILE: '04',
    DESC:
      'コロッセオの王、眠れる獣をその血に宿す者。<br/>薄汚い檻の中で混濁した意識の中、<br/>鎖を引きちぎり囚われの身か解放された。<br/>しかし、自由を得た喜びよりも、<br/>自身の進む道が分からないことに困惑する。<br/>幸い祭司の援助を受けた彼は自分の進むべき道を見つける。<br/>不滅の星火を抱え、無限の闇に包まれた帰り道へ踏み出すのであった。'
  },
  {
    NAME: '傀儡操縦師  ',
    TITLE: 'イサドラ・サンド  ',
    FILE: '05',
    DESC:
      ' 教会信者にして、グスウェイト学園を卒業した上級メイジ。<br/>幼いころから敬虔の衣の下に隠れた醜悪な出来事を経験した。<br/>屈辱の中で生きる術を求め、我が身を憎しみに委ね、<br/>猛毒の壺に浸かり、人知れず心を鍛えた。<br/>禁忌の頂点を求め、彼女は放蕩と聖潔を自由に切り替えることができる。'
  }
]
var crtRuntime = 1000

var CrtInit = function () {
  $(crtList).each(function () {
    var newCharacter = $('<a>')
      .attr({ href: 'javascript:;', title: this.NAME })
      .addClass('character' + this.FILE)
      .data({ src: this.FILE, desc: this.DESC })
      .html('<span>' + this.NAME + '</span>')
      .click(CrtChange)
    $('section#character div.choice').append(newCharacter)
  })

  $('section#character div.list a:first').click()
}

var CrtChange = function () {
  if (!$(this).is('.selected')) {
    $('section#character div.list a.selected').removeClass('selected')
    $(this).addClass('selected')
    /*
        $('section#character div.selected div.visual img').stop().animate({ 'opacity':'0', 'right':'-50px' }, (crtRuntime / 2), function() { $(this).remove(); });
        $('section#character div.selected div.intro span.name').stop().animate({ 'opacity':'0', 'top':'90px' }, (crtRuntime / 2), function() { $(this).remove(); });
        $('section#character div.selected div.intro span.desc').stop().animate({ 'opacity':'0', 'left':'150px' }, (crtRuntime / 2), function() { $(this).remove(); });
*/
    $('section#character div.selected div.visual img:not(.removed)')
      .addClass('removed')
      .stop()
      .animate({ opacity: '0', right: '23px' }, crtRuntime / 2, function () {
        $(this).remove()
      })

    if (deviceWidth > 1024) {
      $('section#character div.selected div.intro span.name:not(.removed)')
        .addClass('removed')
        .stop()
        .animate(
          {
            opacity: '0',
            top: '190px'
          },
          crtRuntime / 2,
          function () {
            $(this).remove()
          }
        )
      $('section#character div.selected div.intro span.desc:not(.removed)')
        .addClass('removed')
        .stop()
        .animate(
          {
            opacity: '0',
            left: '-50px'
          },
          crtRuntime / 2,
          function () {
            $(this).remove()
          }
        )
    } else {
      $(
        'section#character div.selected div.intro span.name:not(.removed)'
      ).remove()
      $(
        'section#character div.selected div.intro span.desc:not(.removed)'
      ).remove()
      $('section#character div.selected div.intro')
        .stop()
        .animate({ opacity: '0' }, 300)
    }

    var crtImg = $('<img>')
      .attr({
        src: 'images/character/' + $(this).data('src') + '.png',
        alt: $(this).attr('title')
      })
      .css({ opacity: '0', right: '-50px' })
      .addClass('char' + $(this).data('src'))
    $('section#character div.selected div.visual').append(crtImg)
    var crtName = $('<span>').addClass('name').text($(this).attr('title'))
    var crtDesc = $('<span>').addClass('desc').html($(this).data('desc'))
    $('section#character div.selected div.intro').append(crtName, crtDesc)

    if (deviceWidth > 1024) {
      crtName.css({ opacity: '0', top: '90px' })
      crtDesc.css({ opacity: '0', left: '150px' })

      crtImg.animate({ opacity: '1', right: '0px' }, crtRuntime)
      crtName.animate({ opacity: '1', top: '140px' }, crtRuntime, function () {
        $(this).css('top', '')
      })
      crtDesc.animate({ opacity: '1', left: '100px' }, crtRuntime, function () {
        $(this).css('top', '')
      })
    } else {
      crtImg.animate({ opacity: '1', right: '-20px' }, crtRuntime)

      clearTimeout(crtObj)
      $('section#character div.selected div.intro').stop().css({ opacity: '0' })
      crtObj = setTimeout(function () {
        $('section#character div.selected div.intro')
          .stop()
          .css({ opacity: '0' })
          .animate({ opacity: '1' }, 500)
      }, crtRuntime + 500)
    }
  }
}

var CrtNext = function () {
  if ($('section#character div.list a.selected').nextAll('a').length) {
    $('section#character div.list a.selected').nextAll('a:first').click()
  } else {
    $('section#character div.list a:first').click()
  }
}

var CrtPrev = function () {
  if ($('section#character div.list a.selected').prevAll('a').length) {
    $('section#character div.list a.selected').prevAll('a:first').click()
  } else {
    $('section#character div.list a:last').click()
  }
}

$(function () {
  deviceWidth = $('body').outerWidth(true)
  CrtInit()
  $('section#character button.next').click(CrtNext)
  $('section#character button.prev').click(CrtPrev)
  $('section#character button.close').click(function () {
    clearTimeout(crtObj)
    $('section#character div.selected div.intro')
      .stop()
      .animate({ opacity: '0' }, 500)
  })
  ChangeStyle()

  if (HasMobile() === true) {
    try {
      $('section#character div.selected').bind('swipeleft', CrtNext)
      $('section#character div.selected').bind('swiperight', CrtPrev)
    } catch (e) {}
  }
})

$(window).resize(function () {
  deviceWidth = $('body').outerWidth(true)
})

/* POPUP */
var PlayerOpen = function () {
  if (!$('div.popPlayer').length) {
    var newPlayer = $('<div>').addClass('popPlayer').hide()
    var newControl = $('<div>').addClass('control')
    var newClose = $('<button>')
      .attr({
        type: 'button',
        title: 'CLOSE'
      })
      .addClass('close')
      .html('<span>CLOSE</span>')
      .click(function () {
        $('div.popPlayer')
          .stop()
          .fadeOut(function () {
            $(this).remove()
          })
      })
    newControl.append(newClose)

    var newPopup = $('<div>').addClass('popup')
    var newFrame = $('<iframe>').attr({
      width: '900',
      height: '510',
      frameborder: '0',
      allow:
        'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: 'allowfullscreen',
      src: 'https://www.youtube.com/embed/YgVEiZOBPYQ'
    })
    newPopup.append(newFrame)

    newPlayer.append(newControl, newPopup)
    $('body').append(newPlayer)
    newPlayer.fadeIn()
  }
}

$(function () {
  $('div.popWrap button.close').click(function () {
    $('div.popWrap').hide()
  })

  $('button.playMedia').click(PlayerOpen)
})

/* 더블클릭 방지 코드 */

var click = true
var email = ''

// TODO:
// eslint-disable-next-line no-unused-vars
function resvPop() {
  $('#modal_regist').hide()
  $('#modal_popup').show()
}
// TODO:
// eslint-disable-next-line no-unused-vars
function reserve() {
  if (click) {
    click = false
    // eslint-disable-next-line no-undef
    if (!isMailAddress(f_reserv.emailaddr.value)) {
      // eslint-disable-next-line no-undef
      msg_fail_pop('メールアドレスを正しく入力してください。')
      return false
    } else {
      // eslint-disable-next-line no-undef
      email = f_reserv.emailaddr.value.toLowerCase()
      // eslint-disable-next-line no-undef
      f_confirm.emailaddr.value = email
      $('#modal_confirm').show()
      click = true
      return false
    }
  }
}

// TODO:
// eslint-disable-next-line no-unused-vars
function confirm() {
  if (click) {
    click = false
    // eslint-disable-next-line no-undef
    if (f_confirm.emailaddr.value.toLowerCase() !== email) {
      // eslint-disable-next-line no-undef
      msg_fail_pop('メールアドレスを正しく入力してください。')
      return false
    } else {
      $('#hpage').attr('src', './reserv_end.php?mailto=' + email)
      return false
    }
  }
}

function clearform() {
  click = true
  email = ''
}

// TODO:
// eslint-disable-next-line no-unused-vars
function msgPop(msg) {
  $('#resv_title').text('事前登録完了')
  $('#resv_msg').html(msg).css({ height: 'auto', 'padding-bottom': '1em' })
  $('#modal_complete').show()
  clearform()
}

// TODO:
// eslint-disable-next-line no-unused-vars
function msgFailPop(msg) {
  $('#resv_title').text('事前登録失敗')
  $('#resv_msg').html(msg).css({ height: 'auto', 'padding-bottom': '1em' })
  $('#modal_complete').show()
  clearform()
}

function isMailAddress(str) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
  return re.test(str)
}

function HasMobile() {
  var returnValue = false
  if (
    /iPhone|iPad|iPod|BlackBerry|Android|Windows CE|LG|MOT|SAMSUNG|SonyEricsson|webOS|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    returnValue = true
  }

  return returnValue
}

function HasIOS() {
  var returnValue = false
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    returnValue = true
  }

  return returnValue
}

/* NAVIGATION */
$(function () {
  $('#tnb button.navOpen').click(function () {
    $('#tnb').addClass('active')
  })
  $('#tnb button.navClose').click(function () {
    $('#tnb').removeClass('active')
  })

  $('div.opening button.regist, a.popRegist').click(function () {
    $('div#modal_regist').show()
  })

  $('div.opening button.demo').click(function () {
    $('div#modal_demo').show()
  })

  $('nav a').click(function () {
    $('div#tnb').removeClass('active')
    if ($(this).attr('href') !== 'javascript:;') {
      var id = $(this).attr('href').replace('#', '')
      $('html, body').animate({ scrollTop: $('#' + id).offset().top }, 300)
    }
  })

  $('nav a.demo').click(function () {
    $('div#modal_demo').show()
  })

  if (HasIOS() === true) {
    $('a.top10').prop('href', 'https://yoyaku-top10.jp/u/a/Mjk3NDI')
  }
})
