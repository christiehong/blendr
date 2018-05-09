var slideIndex = 1
var customerName
var level
var allergies = new Set()
var preferences = new Set()

// Added Change by Das
// Change start [Fixing Enter Button]
document.addEventListener("DOMContentLoaded", function(){
	// The following code snippets is similar to:
	// link: https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
	document.getElementById("allergy-input").addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) {
	        addAllergy();
	    }
	});
	document.getElementById("preferences-input").addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) {
					addPreference();
	    }
	});
});
// Change end [Enter Button Fixed]
function slide(n) {
	showSlide(slideIndex += n)

}

function submitInfo() {
	slide(1);
	customerName = $('#name_input').val()
	$('.name').html(customerName)

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
	var text = $('#allergy-input').val()
	if (text != "") {
		$("#allergy-tags").append("<div class = 'tag-container'><div class = 'tag'>"+text+"</div><div class ='tag' id='remove' onclick='removeAllergy(this)'><i class='fas fa-times-circle'></i></div></div>")
		allergies.add(text)
		$('#allergy-input').val('')
	}
}

function addPreference() {
	var text = $('#preferences-input').val()
	if (text != "") {
		$("#pref-tags").append("<div class = 'tag-container'><div class = 'tag'>"+text+"</div><div class ='tag' id='remove' onclick='removePref(this)'><i class='fas fa-times-circle'></i></div></div>")
		preferences.add(text)
		$('#preferences-input').val('')
	}
}

function removeAllergy(ele) {
	var text = ele.closest('.tag-container').children[0].innerHTML
	allergies.delete(text)
	ele.closest('.tag-container').remove()

}

function removePref(ele) {
	var text = ele.closest('.tag-container').children[0].innerHTML
	preferences.delete(text)
	ele.closest('.tag-container').remove()
}

function levelSelect(ele) {
	level = ele.innerHTML
	var children = document.getElementsByClassName("level")
	for (i = 0; i < 3; i++) {
		if (($(".level")[i].innerHTML) != level) {
			$(".level")[i].style.backgroundColor = "white";
			$(".level")[i].style.color = "lightgray";
		}
		else {
			$(".level")[i].style.backgroundColor = "var(--light-purple)";
			$(".level")[i].style.color = "white";
		}
	}
}
