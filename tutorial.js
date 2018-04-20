var slideIndex = 1 
var customerName
//showSlide(1)
//window.onload = showSlide(1)

function slide(n) {
	showSlide(slideIndex += n)
}

function showSlide(n) {
	var i 
	var slides = document.getElementsByClassName("tutorial")
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[slideIndex-1].style.display = "inline"
}

function addAllergy() {
	$("#allergy-tags").append("<div class = 'tag'>Tree Nuts</div><div class ='tag' id='remove'><i class='fas fa-times'></i></div>")
}

function addPreference() {
	$("#pref-tags").append("<div class = 'tag'>Vegeterian</div><div class ='tag' id='remove'><i class='fas fa-times'></i></div>")
}