jQuery(document).ready(function($){

  // open/close cart when cart is clicked
	$('#cart-trigger').on('click', function(event){
		event.preventDefault();

    // close cart
    if ($('#cart').hasClass('speed-in')) {
			console.log("meow");
      $('#cart').removeClass('speed-in').one('transitionend', function() {
        $('body').removeClass('overflow-hidden');
      });
      $('#shadow-layer').removeClass('is-visible');
    }

    // open cart
    else {
      $('#cart').addClass('speed-in').one('transitionend', function() {
        $('body').addClass('overflow-hidden');
      });
      $('shadow-layer').addClass('is-visible');
    }
	});

  // close cart when outside of cart is clicked
  $('#shadow-layer').on('click', function() {
    $('#shadow-layer').removeClass('is-visible');
    console.log("meow");
    if ($('#cart').hasClass('speed-in')) {
      console.log("woof");
      $('#cart').removeClass('speed-in').one('transitionend', function() {
        $('body').removeClass('overflow-hidden');
      });
    }
  });

});
