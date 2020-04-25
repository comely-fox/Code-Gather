define(function (require, exports, module) {
  'use strict'

  module.exports = {
    getUserData: function () {
      const userData = require('data/user_data')
      return userData
    }
  }
})
