define(['jquery'], function ($) {
  return {
    getUserData: function () {
      const def = $.Deferred()
      require(['data/user_data'], function (data) {
        def.resolve(data)
      })
      return def
    }
  }
})
