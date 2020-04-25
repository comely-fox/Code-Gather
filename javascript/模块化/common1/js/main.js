define(function (require) {
  'use strict'
  require('jquery')
  $('#user').click(function () {
    const { getUserData } = require('api/api_get_user_data')
    console.log(getUserData())
  })
})
