var recipeDictionary = {'Veggie Omelette':['olive oil', '1 red bell pepper', '1 onion', '1 box of mushrooms', '1 bag of baby spinach leaves', '8 eggs', 'salt', 'pepper'],
												'Huevos Rancheros':['2 plum tomatoes', '1 onion', '1 jalapeno pepper', '1 bottle of Red Hot hot sauce', 'cumin', 'salt', 'pepper', 'olive oil', '1 can of black beans', '4 eggs', 'feta cheese', '1 bunch of cilantro'],
												'Loaded Veggie Quiche':['1 unbaked pie crust', 'olive oil', '1 box of mushrooms', '1 tomato', '1 bunch of basil', 'salt', 'pepper', 'olive oil', 'milk', '4 eggs', 'Colby-Monterey Jack cheese'],
												'Spinach Potato Frittata':['6 small red potatoes', 'olive oil', '1 bag of spinach', '1 head of garlic', '1 onion', '6 eggs', 'salt', 'pepper', 'milk', 'Cheddar cheese']
											}

jQuery(document).ready(function($){
	console.log(window.location.pathname.split("/").pop());

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
		$('.cart-items').eq(0).find('p').remove();
		var recipeAdded = $('<li class="recipe-name"><h3>Veggie Omelette</h3><i id="remove-recipe" class="fas fa-trash-alt"></i><ul class="ingredient"><li>olive oil</li><li>1 red bell pepper</li><li>1 onion</li><li>1 box of mushrooms</li><li>1 bag of spinach</li><li>8 eggs</li><li>salt</li><li>pepper</li></ul></li>');
		$('.cart-items').eq(0).prepend(recipeAdded);
	});

	// remove recipe from cart
	$('.cart-items').eq(0).on('click', '#remove-recipe', function() {
		event.preventDefault();
		$(event.target).parents('li').addClass('toDelete');
		$('.cart-items').eq(0).find('.toDelete').remove();
	});

	// open final check modal
	$("#finish").on('click', function() {
		$('.modal').show();
	});

	$(".close").on('click', function() {
		$('.modal').hide();
	})

});
