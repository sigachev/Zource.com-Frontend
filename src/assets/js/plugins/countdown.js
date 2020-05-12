$(() => {

  App.atcDemo() // Add to Cart Demo
  App.atwDemo() // Add to Wishlist Demo
  App.homeSlider('#homeSlider')
  App.dealSlider('#dealSlider')
  App.colorOption()

  // example countdown, 6 hours from now for flash deals
  var countdown = new Date()
  countdown.setHours(countdown.getHours() + 6)
  $('#flash-deals-countdown').countdown(countdown, function (e) {
    $(this).text(e.strftime('%H:%M:%S'))
  })

})
