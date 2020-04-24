require.config({
  baseUrl: 'js',
  paths: {
    jquery: ['https://cdn.bootcss.com/jquery/3.5.0/jquery.slim.min']
  }
})

require(['jquery', 'api/api_get_user_data'], function ($, api) {
  $('#user').click(function () {
    console.log(api.getUserData())
    /*   api.getUserData().then(function (data) {
      console.log(data)
    }) */
  })
})
