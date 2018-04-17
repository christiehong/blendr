jQuery(document).ready(function($){

  // open/close cart when cart is clicked
	$('#slide-cart-trigger').on('click', function(event){
		event.preventDefault();

    // close cart
    if ($('#slide-cart').hasClass('speed-in')) {
      $('#slide-cart').removeClass('speed-in').one('transitionend', function() {
        $('body').removeClass('overflow-hidden');
      });
      $('#shadow-layer').removeClass('is-visible');
    }

    // open cart
    else {
      $('#slide-cart').addClass('speed-in').one('transitionend', function() {
        $('body').addClass('overflow-hidden');
      });
      $('#shadow-layer').addClass('is-visible');
    }
	});

  // close cart when outside of cart is clicked
  $('#shadow-layer').on('click', function() {
    $('#shadow-layer').removeClass('is-visible');
    if ($('#slide-cart').hasClass('speed-in')) {
      $('#slide-cart').removeClass('speed-in').one('transitionend', function() {
        $('body').removeClass('overflow-hidden');
      });
    }
  });

	// add recipe to cart
	$('#add-to-cart').on('click', function() {
		event.preventDefault();
		var recipeAdded = $('<li class="recipe-name"><h3>Veggie Omelette</h3><button class="remove-recipe">x</button></li><ul class="ingredient"><li>Olive Oil</li><li>1 red bell pepper</li><li>1 onion</li><li>1 box of mushrooms</li><li>1 bag of spinach</li><li>8 eggs</li><li>salt</li><li>pepper</li></ul>');
		$('.cart-items').eq(0).prepend(recipeAdded);
	});

	// remove recipe from cart
	$('.cart-items').eq(0).on('click', '.remove-recipe', function() {
		console.log($(event.target).parents('.recipe-name'));
		console.log($(event.target).parents());

		// $(event.target).parents('.recipe-name').css('top', top);
		event.preventDefault();
		$('.cart-items').eq(0).find('.deleted').remove();
	})

});
