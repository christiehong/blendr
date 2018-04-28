var veggie_omelette = {'Veggie Omelette':['olive oil', '1 red bell pepper', '1 onion', '1 box of mushrooms', '1 bag of baby spinach leaves', '8 eggs', 'salt', 'pepper']}
var huevos_rancheros = {'Huevos Rancheros':['2 plum tomatoes', '1 onion', '1 jalapeno pepper', '1 bottle of Red Hot hot sauce', 'cumin', 'salt', 'pepper', 'olive oil', '1 can of black beans', '4 eggs', 'feta cheese', '1 bunch of cilantro']}
var veggie_quiche = {'Loaded Veggie Quiche':['1 unbaked pie crust', 'olive oil', '1 box of mushrooms', '1 tomato', '1 bunch of basil', 'salt', 'pepper', 'olive oil', 'milk', '4 eggs', 'Colby-Monterey Jack cheese']}
var veggie_frittata = {'Spinach Potato Frittata':['6 small red potatoes', 'olive oil', '1 bag of spinach', '1 head of garlic', '1 onion', '6 eggs', 'salt', 'pepper', 'milk', 'Cheddar cheese']}

var recipesInCart = [];

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

	console.log($('.cart-items li').length);

	// if cart is empty, insert "Your shopping list is currently empty."
	if ($('.cart-items li').length == 0 && recipesInCart.length == 0) {
		$('#cart').eq(0).append("<p> Your shopping list is currently empty.");
	}

	// add recipe to cart
	$('#add-to-cart').on('click', function() {
		event.preventDefault();
		var page = window.location.pathname.split("/").pop();

		$('#cart').eq(0).find('p').remove();
		console.log(page);
		if (page == "veggie_omelette.html") {
			recipesInCart.push(veggie_omelette);
		} else if (page == "huevos_rancheros.html") {
			recipesInCart.push(huevos_rancheros);
		} else if (page == "veggie_frittata.html") {
			recipesInCart.push(veggie_frittata);
		} else if (page == "veggie_quiche.html") {
			recipesInCart.push(veggie_quiche);
		}
		addRecipes();
	});

	// remove recipe from cart
	$('.cart-items').eq(0).on('click', '#remove-recipe', function() {
		event.preventDefault();
		$(event.target).parents('li').addClass('toDelete');
		var recipeName = $(event.target).parents('li').children()[0];
		var strippedRecipeName = $("<h3>").html(recipeName).text();
		recipesInCart.pop(strippedRecipeName);
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

function addRecipes() {
	for (var i=0; i < recipesInCart.length; i++) {
		recipeName = Object.keys(recipesInCart[i])[0];
		var recipeAdded = '<li class="recipe-name"><h3>' + recipeName + '</h3><i id="remove-recipe" class="fas fa-trash-alt"></i><ul class="ingredient">';
		ingredients = (recipesInCart[i][recipeName]);
		for (var j=0; j < ingredients.length; j++) {
			recipeAdded += "<li>" + ingredients[j] + "</li>";
		}
		recipeAdded += "</ul></li>"
	}
	$('.cart-items').eq(0).prepend(recipeAdded);

}
