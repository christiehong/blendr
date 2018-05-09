var veggie_omelette = {'Veggie Omelette':['olive oil', '1 red bell pepper', '1 onion', '1 box of mushrooms', '1 bag of baby spinach leaves', '8 eggs', 'salt', 'pepper']}
var huevos_rancheros = {'Huevos Rancheros':['2 plum tomatoes', '1 onion', '1 jalapeno pepper', '1 bottle of Red Hot hot sauce', 'cumin', 'salt', 'pepper', 'olive oil', '1 can of black beans', '4 eggs', 'feta cheese', '1 bunch of cilantro']}
var veggie_quiche = {'Loaded Veggie Quiche':['1 unbaked pie crust', '1 box of mushrooms', '1 tomato', '1 bunch of basil', 'salt', 'pepper', 'olive oil', 'milk', '4 eggs', 'Colby-Monterey Jack cheese']}
var veggie_frittata = {'Spinach Potato Frittata':['6 small red potatoes', 'olive oil', '1 bag of spinach', '1 head of garlic', '1 onion', '6 eggs', 'salt', 'pepper', 'milk', 'Cheddar cheese']}


var favorites = {'veggie_omelette.html': {'name': 'Veggie Omelette', 'time': '15 min', 'servings': 'Serves 1', 'dietary': 'Vegan', 'img': 'vegan_omelette', 'id': 'VeggieOmelette'},
  'huevos_rancheros.html': {'name': 'Huevos Rancheros', 'time': '15 min', 'servings': 'Serves 2', 'dietary': 'Vegetarian', 'img': 'huevos_rancheros', 'id': 'HuevosRancheros'},
  'veggie_quiche.html': {'name': 'Loaded Veggie Quiche', 'time': '45 min', 'servings': 'Serves 4', 'dietary': 'Vegetarian', 'img': 'veggie_quiche', 'id': 'LoadedVeggieQuiche'},
  'veggie_frittata.html': {'name': 'Spinach Potato Frittata', 'time': '30 min', 'servings': 'Serves 4', 'dietary': 'Vegan', 'img': 'veggie_frittata', 'id': 'SpinachPotatoFrittata'}
};

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
};
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
};

var recipesInCart = [];
var favoritedRecipes = [];



document.addEventListener("DOMContentLoaded", function() {
  var page = window.location.pathname.split("/").pop();
	if (page == "searched.html") {
  allergies = JSON.parse(sessionStorage.getItem("allergies"))
  preferences = JSON.parse(sessionStorage.getItem("preferences"))
  level = JSON.parse(sessionStorage.getItem("level"))
  console.log(level)
  // Fixing level
  console.log(document.getElementsByName("Difficulty")[0].value)
  if(level == "MEDIUM"){
    console.log("Medium in")
    document.getElementsByName("Difficulty")[0].value = "Medium"
  }
  else if(level == "EASY"){
    console.log("Easy in")
    document.getElementsByName("Difficulty")[0].value = "Easy"
  }
  else if(level == "HARD"){
    console.log("Hard in")
    document.getElementsByName("Difficulty")[0].value = "Hard"
  }
  else{
    document.getElementsByName("Difficulty")[0].value = "All"
  }
  console.log(document.getElementsByName("Difficulty")[0].value)

  // Fixing restrictions list:
  restriction_list = document.getElementsByClassName("restrictions")[0]
  for(i=0; i < allergies.length; i++){
    restriction_list.appendChild(createAllergyTag(allergies[i]))
  }
  // Fixing preferences
  preference_list = document.getElementsByClassName("preferences")[0]
  for(i=0; i < preferences.length; i++){
    preference_list.appendChild(createPrefTag(preferences[i]))
  }
  document.getElementById("search-bar").addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode == 13) {
      document.getElementById("search-icon").click();
    }
  });
  document.getElementById("Preference_bar").addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode == 13) {
      addPreference();
    }
  });
  document.getElementById("Allergy_bar").addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode == 13) {
      addAllergy();
    }
  });
  document.getElementById("mySlider").addEventListener("change", function(event){fixTime()});
}
});

var names = ["omelette", "quiche", "rancheros", "frittata"]
var headers = {"omelette": 1,
               "quiche": 2,
              "rancheros":3 ,
              "frittata": 4}

var difficulty_map = {"Easy": [names[0], names[2]],
                    "Medium": [names[1]],
                      "Hard": [names[3]]}
var time_map = {"15": [names[0], names[2]],
                "30": [names[3]],
                "45": [names[1]]}
var servings_map = {"1": [names[0]],
                    "2": [names[2]],
                    "3": [names[1], names[3]],
                    "4+": [names[1], names[3]]}

/// Find which results will be showed
/// Return a list with keys in order
function find_results(){
  var search_words = document.getElementById("search-bar").value.toLowerCase().split(" ")
  var servings = document.getElementsByName("servings")[0].value
  var difficulty = document.getElementsByName("Difficulty")[0].value
  var time_bar = parseInt(document.getElementById("mySlider").value)

  //var isPot = document.getElementById("checkbox-pot").checked
  //var isPan = document.getElementById("checkbox-pan").checked
  //var isOven = document.getElementById("checkbox-oven").checked

  results = []
  // First rule of our search: If a word is matched, show:
  for(i=0; i < 4; i++){
      word = names[i]
      if(search_words.indexOf(word) != -1){
        results.push(word)
      }
  }
  // If result is already more than 0, Return
  if (results.length != 0){
    return results;
  }

  // Second rule of our search: If a partial word is matched
  if(search_words.indexOf("veggie") > -1) {
    results.push("omelette");
    results.push("quiche");
  }
  if(search_words.indexOf("huevos") > -1){
    results.push("rancheros");
  }
  if(search_words.indexOf("spinach") > -1 || search_words.indexOf("potato") > -1){
    results.push("frittata");
  }
  // If results more than 0, Return
  if(results.length > 0 ){
    return results;
  }

  // Third Rule, add all the recipies according to filters:
  // Serving_wise:
  var serving_res = null;
  if(servings != "All"){
      serving_res = servings_map[servings]
      console.log(serving_res)
  }

  // Time_wise:
  var prep_res = null;
  if(time_bar != 100){
    if(time_bar < 25) {
      prep_res = []
    }
    else if(time_bar < 50) {
      prep_res = ["omelette",  "rancheros"]
    }
    else if(time_bar < 75) {
      prep_res = ["omelette", "rancheros", "frittata"]
    }
    else {
      prep_res = ["omelette", "quiche", "rancheros", "frittata"]
    }
  }

  // Difficulty_wise:
  var diff_res = null;
  if(difficulty != "All") {
    diff_res = difficulty_map[difficulty]
  }

  // Finally, filterwise take the intersection as results
  for(i=0; i < 4; i++){
    name = names[i]
    common = true
    // servings
    if (serving_res != null){
      common = common && (serving_res.indexOf(name) != -1)
    }
    // timewise
    if(prep_res != null){
      common =common && (prep_res.indexOf(name) != -1)
    }
    // Difficulty_wise
    if(diff_res != null){
      common = common &&(diff_res.indexOf(name) != -1)
    }
    // If common, send the result
    if(common){
      results.push(name)
    }
  }
  return results
}

/// It shows the Results
/// Add elements one by one
function show_results(results){
  document.getElementsByClassName("results-show")[0].innerHTML = ""
  innerHTML = ""
  // Now, add as we get from the results
  if(results.indexOf("omelette") != -1){
    innerHTML = innerHTML +
    "<div class='recipe-overview'> \
      <a href='recipes/veggie_omelette.html' class='click'> \
        <h1 class='clickable_header'>Veggie Omelette</h1> \
        <div id='image'> \
          <img src='images/vegan_omelette.jpg'> \
        </div> \
      </a> \
      <div id='content'> \
        <h2>Difficulty:</h2> Easy <br> \
        <h2>Prep Time:</h2> 15 mins <br> \
        <h2>Calories:</h2> 400 calories <br> \
        <h2>Servings:</h2> 1 serving <br> \
      </div> \
    </div>"
  }

  if(results.indexOf("quiche") != -1){
    if(innerHTML == ""){
      innerHTML = innerHTML +
      '<div class="recipe-overview"> \
        <a href="recipes/veggie_quiche.html" class="click"> \
          <h1>Loaded Veggie Quiche</h1> \
          <div id="image"> \
            <img src="images/veggie_quiche.jpg"> \
          </div> \
        </a> \
        <div id="content"> \
          <h2>Difficulty:</h2> Medium <br> \
          <h2>Prep Time:</h2> 45 mins <br> \
          <h2>Calories:</h2> 300 calories <br> \
          <h2>Servings:</h2> 4 servings <br> \
        </div> \
      </div>'
    }
    else{
    innerHTML = innerHTML +
    '<div class="recipe-overview" style="background-color:var(--light-gray)"> \
      <a href="recipes/veggie_quiche.html" class="click"> \
        <h1>Loaded Veggie Quiche</h1> \
        <div id="image"> \
          <img src="images/veggie_quiche.jpg"> \
        </div> \
      </a> \
      <div id="content"> \
        <h2>Difficulty:</h2> Medium <br> \
        <h2>Prep Time:</h2> 45 mins <br> \
        <h2>Calories:</h2> 300 calories <br> \
        <h2>Servings:</h2> 4 servings <br> \
      </div> \
    </div>'
    }
  }

  if(results.indexOf("rancheros") != -1) {
    if(innerHTML == "" || innerHTML.length > 600) {
      innerHTML = innerHTML +
      '<div class="recipe-overview"> \
        <a href="recipes/huevos_rancheros.html" class="click"> \
          <h1>Huevos Rancheros</h1> \
          <div id="image"> \
            <img src="images/huevos_rancheros.jpg"> \
          </div> \
        </a> \
        <div id="content"> \
          <h2>Difficulty:</h2> Easy <br> \
          <h2>Prep Time:</h2> 15 mins <br> \
          <h2>Calories:</h2> 450 calories <br> \
          <h2>Servings:</h2> 2 servings <br> \
        </div> \
      </div>'
    }
    else{
      innerHTML = innerHTML +
      '<div class="recipe-overview" style="background-color:var(--light-gray)"> \
        <a href="recipes/huevos_rancheros.html" class="click"> \
          <h1>Huevos Rancheros</h1> \
          <div id="image"> \
            <img src="images/huevos_rancheros.jpg"> \
          </div> \
        </a> \
        <div id="content"> \
          <h2>Difficulty:</h2> Easy <br> \
          <h2>Prep Time:</h2> 15 mins <br> \
          <h2>Calories:</h2> 450 calories <br> \
          <h2>Servings:</h2> 2 servings <br> \
        </div> \
      </div>'

    }
  }

  if(results.indexOf("frittata") != -1) {
    if(results.length == 2 || results.length == 4) {
      innerHTML = innerHTML +
      '<div class="recipe-overview" style="background-color:var(--light-gray)"> \
        <a href="recipes/veggie_frittata.html" class="click"> \
          <h1>Spinach Potato Frittata</h1> \
          <div id="image"> \
            <img src="images/veggie_frittata.jpg"> \
          </div> \
        </a> \
        <div id="content"> \
          <h2>Difficulty:</h2> Medium <br> \
          <h2>Prep Time:</h2> 30 mins <br> \
          <h2>Calories:</h2> 250 calories <br> \
          <h2>Servings:</h2> 4 servings <br> \
        </div> \
      </div>'
    }
    else{
      innerHTML = innerHTML +
      '<div class="recipe-overview"> \
        <a href="recipes/veggie_frittata.html" class="click"> \
          <h1>Spinach Potato Frittata</h1> \
          <div id="image"> \
            <img src="images/veggie_frittata.jpg"> \
          </div> \
        </a> \
        <div id="content"> \
          <h2>Difficulty:</h2> Medium <br> \
          <h2>Prep Time:</h2> 30 mins <br> \
          <h2>Calories:</h2> 250 calories <br> \
          <h2>Servings:</h2> 4 servings <br> \
        </div> \
      </div>'
    }
  }
  document.getElementsByClassName("results-show")[0].innerHTML = innerHTML;

  if(results.length == 0){
    document.getElementById("header-text").innerHTML="Sorry, we couldn't find a match. Maybe try a different one..."
  }
  else{
    document.getElementById("header-text").innerHTML="Best recipes for your search..."
  }
}

function perform_search(){
    show_results(find_results());
}

function createPrefTag(text){
    innerHTML = "<div class = 'tag-container'><div class = 'tag'>"+text+"</div><div class ='tag' id='remove' onclick='removePref(this)'><i class='fas fa-times-circle'></i></div></div>"
    a = document.createElement("li")
    a.innerHTML = innerHTML
    return a;
}

function removePref(elm){
  elm.parentNode.parentNode.remove()
}

function createAllergyTag(text){
    innerHTML = "<div class = 'tag-container'><div class = 'tag'>"+text+"</div><div class ='tag' id='remove' onclick='removeAllergy(this)'><i class='fas fa-times-circle'></i></div></div>"
    a = document.createElement("li")
    a.innerHTML = innerHTML
    return a;
}
function removeAllergy(elm){
  console.log(elm.parentNode)
  elm.parentNode.parentNode.remove()
}

function addAllergy(){
  /*
  restriction_list = document.getElementsByClassName("restrictions")[0]
  allergy = document.getElementById("Allergy_bar").value
  if(allergy != ""){
    new_item = document.createElement("li")
    new_item.appendChild(document.createTextNode(allergy))
    restriction_list.appendChild(new_item)
    document.getElementById("Allergy_bar").value = ""
  } */
  restriction_list = document.getElementsByClassName("restrictions")[0]
  allergy = document.getElementById("Allergy_bar").value
  restriction_list.appendChild(createAllergyTag(allergy))
  document.getElementById("Allergy_bar").value = ""
}


function addPreference(){
  /*
  preference_list = document.getElementsByClassName("preferences")[0]
  preference = document.getElementById("Preference_bar").value
  if(preference != ""){
    new_item = document.createElement("li")
    new_item.appendChild(document.createTextNode(preference))
    preference_list.appendChild(new_item)
    preference = document.getElementById("Preference_bar").value = ""
  }
  */
  preference_list = document.getElementsByClassName("preferences")[0]
  preference = document.getElementById("Preference_bar").value
  preference_list.appendChild(createPrefTag(preference))
  preference = document.getElementById("Preference_bar").value = ""
}

function clearAll(){
  // Clear PREFERENCES
  document.getElementsByClassName("preferences")[0].innerHTML = ""
  // Clear Restrictions
  document.getElementsByClassName("restrictions")[0].innerHTML = ""
  // Set time_bar
  document.getElementById("mySlider").value = "100"
  document.getElementById("time-label").innerHTML = "60 minutes"
  // Number of servings
  document.getElementsByName("servings")[0].value= "-----"
  // Difficulty
  document.getElementsByName("Difficulty")[0].value = "All"
}

function fixTime(){
  time = Math.round(parseInt(document.getElementById("mySlider").value) * 60 / 100)
  time_string = time + " minutes"

  document.getElementById("time-label").innerHTML = time_string

}
////
jQuery(document).ready(function($){

  console.log(localStorage.getObj("favoritedRecipes"));

	// if cart is empty, insert "Your shopping list is currently empty."
	if (localStorage.getObj("recipesInCart") == null || localStorage.getObj("recipesInCart").length == 0) {
		$('#cart').eq(0).append("<p> Your shopping list is currently empty.");
		localStorage.setObj("recipesInCart", recipesInCart);
	} else { // if cart isn't full, then put in the recipes that are stored
		addRecipes();
	}

  if (localStorage.getObj("favoritedRecipes") == null || localStorage.getObj("favoritedRecipes").length == 0) {
    localStorage.setObj("favoritedRecipes", favoritedRecipes);
  } else {
    addToFavorites();
  }

	var page = window.location.pathname.split("/").pop();
	if (page == "landing.html" || page == "searched.html" || page == "one_list.html") {
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

    for (var i=0; i < recipesInCart.length; i++) {
      recipe = Object.keys(recipesInCart[i])[0];
      if (recipe == strippedRecipeName) {
        recipesInCart.pop
      }
    }

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
    $('.shopping-list').eq(0).html("");
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


  $(".export").on('click', function() {
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
  $('.favorites_list_').eq(0).html("");
  var page = window.location.pathname.split("/").pop();
  console.log(page);
  favoritedRecipes = localStorage.getObj("favoritedRecipes");
  for (var i=0; i < favoritedRecipes.length; i++) {
    recipeName = favoritedRecipes[i];
    console.log(recipeName);
    if (recipeName == page) {
      $('#favorite').addClass("fas fa-heart fa-2x");
      // console.log()
    }
    console.log(page)
    console.log(favorites[page]);
    var favoritesAdded = '<li id = "' + favorites[recipeName]['id'] + '"><div class = "one_list_row"><div class = "one_list_recipe"><a href = "recipes/' + recipeName + '" class = "veggie_recipe"><img id = "favorites_pic" src="images/' + favorites[recipeName]['img'] + '.jpg">' + favorites[recipeName]['name'] + '</a></div><button class = "minutes_button" disabled>' + favorites[recipeName]['time'] + '</button><button class = "serves_button" disabled>' + favorites[recipeName]['servings'] + '</button><button class = "vegan_button" disabled>' + favorites[recipeName]['dietary'] + '</button></div></li>';    console.log(favoritesAdded)
    $('.favorites_list_').eq(0).append(favoritesAdded);
  }


}

// function addToFavoritesPage()

function favoritesSearchFunc() {
// Declare variables
  var input = document.getElementById('myInput');
  var filter = input.value.toUpperCase();
  var ul = document.getElementById("favorites_list");
  var li = ul.getElementsByTagName('li');

// Loop through all list items, and hide those who don't match the search query
  for(var i = 0; i < li.length; i++) {
      // a = li[i].getElementsByTagName("a")[0];
      if (li[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}
