var veggie_omelette = {'Veggie Omelette':['olive oil', '1 red bell pepper', '1 onion', '1 box of mushrooms', '1 bag of baby spinach leaves', '8 eggs', 'salt', 'pepper']}
var huevos_rancheros = {'Huevos Rancheros':['2 plum tomatoes', '1 onion', '1 jalapeno pepper', '1 bottle of Red Hot hot sauce', 'cumin', 'salt', 'pepper', 'olive oil', '1 can of black beans', '4 eggs', 'feta cheese', '1 bunch of cilantro']}
var veggie_quiche = {'Loaded Veggie Quiche':['1 unbaked pie crust', '1 box of mushrooms', '1 tomato', '1 bunch of basil', 'salt', 'pepper', 'olive oil', 'milk', '4 eggs', 'Colby-Monterey Jack cheese']}
var veggie_frittata = {'Spinach Potato Frittata':['6 small red potatoes', 'olive oil', '1 bag of spinach', '1 head of garlic', '1 onion', '6 eggs', 'salt', 'pepper', 'milk', 'Cheddar cheese']}

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
};
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
};

var recipesInCart = [];
var favoritedRecipes = [];

jQuery(document).ready(function($){

  console.log(localStorage.getObj("favoritedRecipes"));

	// if cart is empty, insert "Your shopping list is currently empty."
	if (localStorage.getObj("recipesInCart").length == 0) {
		$('#cart').eq(0).append("<p> Your shopping list is currently empty.");
		localStorage.setObj("recipesInCart", recipesInCart);
	} else { // if cart isn't full, then put in the recipes that are stored
		addRecipes();
	}

  if (localStorage.getObj("favoritedRecipes").length == 0) {
    localStorage.setObj("favoritedRecipes", favoritedRecipes);
  } else {
    addToFavorites();
  }

	var page = window.location.pathname.split("/").pop();
	if (page == "landing.html" || page == "searched.html") {
		$("#cart").hide();
	}

  // open/close cart when cart is clicked
	$('#slide-cart-trigger').on('click', function(event){
		event.preventDefault();

		// add slide-cart class
		$("#cart").addClass("slide-cart");

    // close cart
    if ($('.slide-cart').hasClass('speed-in')) {
      $('.slide-cart').removeClass('speed-in').one('transitionend', function() {
        $('body').removeClass('overflow-hidden');
      });
			$('#cart').hide();
      $('#shadow-layer').removeClass('is-visible');
    }

    // open cart
    else {
			$('#cart').show();
      $('.slide-cart').addClass('speed-in').one('transitionend', function() {
				$('body').addClass('overflow-hidden');
      });
      $('#shadow-layer').addClass('is-visible');
    }
	});

  // close cart when outside of cart is clicked
  $('#shadow-layer').on('click', function() {
    $('#shadow-layer').removeClass('is-visible');
    if ($('.slide-cart').hasClass('speed-in')) {
      $('.slide-cart').removeClass('speed-in').one('transitionend', function() {
        $('body').removeClass('overflow-hidden');
      });
    }
		$('#cart').hide();
  });

	// add recipe to cart
	$('#add-to-cart').on('click', function() {
		event.preventDefault();
		var page = window.location.pathname.split("/").pop();

		$('#cart').eq(0).find('p').remove();
		if (page == "veggie_omelette.html") {
			recipesInCart.push(veggie_omelette);
		} else if (page == "huevos_rancheros.html") {
			recipesInCart.push(huevos_rancheros);
		} else if (page == "veggie_frittata.html") {
			recipesInCart.push(veggie_frittata);
		} else if (page == "veggie_quiche.html") {
			recipesInCart.push(veggie_quiche);
		}
		localStorage.setObj("recipesInCart", recipesInCart);

		addRecipes();
	});

	// remove recipe from cart
	$('.cart-items').eq(0).on('click', '#remove-recipe', function() {
		event.preventDefault();
		$(event.target).parents('li').addClass('toDelete');
		var recipeName = $(event.target).parents('li').children()[0];
		var strippedRecipeName = $("<h3>").html(recipeName).text();
		recipesInCart.pop(strippedRecipeName);
		localStorage.setObj("recipesInCart", recipesInCart);
		$('.cart-items').eq(0).find('.toDelete').remove();

		if (localStorage.getObj("recipesInCart").length == 0) {
			$('#cart').eq(0).append("<p> Your shopping list is currently empty.");
		}

	});

	// open final check modal
	$("#finish").on('click', function() {
		$('.modal').show();
		recipesInCart = localStorage.getObj("recipesInCart");
		for (var i=0; i < recipesInCart.length; i++) {
			recipeName = Object.keys(recipesInCart[i])[0];
			var recipeAdded = '<li class="recipe-name"><h3>' + recipeName + '</h3><ul class="ingredient">';
			ingredients = (recipesInCart[i][recipeName]);
			for (var j=0; j < ingredients.length; j++) {
				recipeAdded += "<li>" + ingredients[j] + "</li>";
			}
			recipeAdded += "</ul></li>";
			$('.shopping-list').eq(0).prepend(recipeAdded);
		}
	});

  // close final check modal
	$(".close").on('click', function() {
		$('.modal').hide();
	});

  // favoriting a recipe
  $("#favorite").on('click', function() {
    var page = window.location.pathname.split("/").pop();
    alreadyFavorited = false;
    favoritedRecipes = localStorage.getObj("favoritedRecipes");

    for (var i=0; i < localStorage.getObj("favoritedRecipes").length; i++) {
      if (localStorage.getObj("favoritedRecipes")[i] == page) {
        alreadyFavorited = true;
      }
    }

    console.log($('#favorite').hasClass("far fa-heart fa-2x"), $('#favorite').hasClass('fas fa-heart fa-2x'), alreadyFavorited);

    // favorite a recipe
    if (($('#favorite').hasClass("far fa-heart fa-2x") && alreadyFavorited == false) || ($('#favorite').hasClass("fas fa-heart fa-2x") && alreadyFavorited == false)) {
      $("#favorite").removeClass("far fa-heart fa-2x");
      $('#favorite').addClass("fas fa-heart fa-2x");

      event.preventDefault();
  		if (page == "veggie_omelette.html") {
  			favoritedRecipes.push("veggie_omelette.html");
  		} else if (page == "huevos_rancheros.html") {
  			favoritedRecipes.push("huevos_rancheros.html");
  		} else if (page == "veggie_frittata.html") {
  			favoritedRecipes.push("veggie_frittata.html");
  		} else if (page == "veggie_quiche.html") {
  			favoritedRecipes.push("veggie_quiche.html");
  		}
  		localStorage.setObj("favoritedRecipes", favoritedRecipes);

      addToFavorites();

    }

    // de-favorite a recipe
    else if (($('#favorite').hasClass('far fa-heart fa-2x fas') && alreadyFavorited) || ($('#favorite').hasClass("fas fa-heart fa-2x") && alreadyFavorited)) {
      var favoritedRecipes = localStorage.getObj("favoritedRecipes");
      for (var i=0; i < favoritedRecipes.length; i++) {
        if (favoritedRecipes[i] == page) {
          favoritedRecipes.pop(page);
        }
      }
      localStorage.setObj("favoritedRecipes", favoritedRecipes);

      $("#favorite").removeClass("fas fa-heart fa-2x");
      $('#favorite').addClass("far fa-heart fa-2x");
    }
  });

  $("#finish").on('click', function() {
    localStorage.setObj("favoritedRecipes", []);
    localStorage.setObj("recipesInCart", []);
  });

});

// helper function to store added recipes
function addRecipes() {
	$('.cart-items').eq(0).html("");
	recipesInCart = localStorage.getObj("recipesInCart");

	for (var i=0; i < recipesInCart.length; i++) {
		recipeName = Object.keys(recipesInCart[i])[0];
		var recipeAdded = '<li class="recipe-name"><h3>' + recipeName + '</h3><i id="remove-recipe" class="fas fa-trash-alt"></i><ul class="ingredient">';
		ingredients = (recipesInCart[i][recipeName]);
		for (var j=0; j < ingredients.length; j++) {
			recipeAdded += "<li>" + ingredients[j] + "</li>";
		}
		recipeAdded += "</ul></li>"
		$('.cart-items').eq(0).prepend(recipeAdded);
	}
}

// helper function to store favorited recipes
function addToFavorites() {
  var page = window.location.pathname.split("/").pop();
  favoritedRecipes = localStorage.getObj("favoritedRecipes");

  for (var i=0; i < favoritedRecipes.length; i++) {
    recipeName = favoritedRecipes[i];
    if (recipeName == page) {
      $('#favorite').addClass("fas fa-heart fa-2x");

    }
  }
}
