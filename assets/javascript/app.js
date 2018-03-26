$(document).ready(function() {
	// keyword array
	var gifArr = ["Futurama", "The Simpsons", "Family Guy", "Doug", "Rugrats", "Rocko's Modern Life",
	"Underdog", "Hey Arnold", "Batman Beyond", "Animaniacs", "Archer", "Jonny Quest",
	"Johnny Bravo", "Samurai Jack"];
	
	// loops through array to create buttons; clears div first to prevent repeats
	function createBtns() {
		$("#gif-buttons").empty();

		for (var i = 0; i < gifArr.length; i++) {
			var $btn = $("<button>").attr("data-attr", gifArr[i])
				.attr("class", "btn btn-default gif-button")
				.text(gifArr[i]);

			$("#gif-buttons").append($btn);
		}
	}

	// grabs gifs from giphy based on passed keyword parameter
	function getGiphy(keyword) {
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&limit=10&api_key=dc6zaTOxFJmzC";

		$("#gifs").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.data;
			
			for (var i = 0; i < results.length; i++) {
				var still = results[i].images.fixed_height_still.url;
				var animated = results[i].images.fixed_height.url;
				var rating = results[i].rating;

				// created divs for each gif to utilize bootstrap
				var $newDiv = $("<div>").attr("class", "gif-div col-md-4 col-xs-12")
					.attr("id", "gif-" + i);
				var $img = $("<img>").attr("src", still)
					.attr("alt", "gif")
					.attr("class", "gif")
					.attr("animated", animated)
					.attr("still", still)
					.attr("state", "still");
				var $cap = $("<h4>");

				$("#gifs").append($newDiv);
				$newDiv.append($img)
					.prepend($cap);

				$cap.html("Rating: " + rating);
			}
		});
	}

	// adds new keyword to array
	// prevents addition of blank buttons
	$("#addGif").on("click", function(event) {
		event.preventDefault();

		var newGif = $("#gif-input").val().trim();

		if (newGif !== "") {
			$("#gif-input").val("");

			gifArr.push(newGif);
			createBtns();
		}
	});

	// listens for buttons with .gif-button class
	// pulls keyword from "data-attr"
	$(document).on("click", ".gif-button", function() {
		var keyword = $(this).attr("data-attr");

		getGiphy(keyword);
	});

	// animates / stills gifs on click based on current state
	$(document).on("click", ".gif", function() {
		if ($(this).attr("state") === "still") {
			$(this).attr("state", "animated");
			$(this).attr("src", $(this).attr("animated"));
		} else {
			$(this).attr("state", "still");
			$(this).attr("src", $(this).attr("still"));
		}
	});

	// fun
	$("#click-me").on("click", function() {
		var queryURL = "http://api.giphy.com/v1/gifs/3NtY188QaxDdC?api_key=dc6zaTOxFJmzC";

		$("#gifs").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			console.log(response);
				var results = response.data;
				var still = results.images.original_still.url;
				var animated = results.images.original.url;

				var $newDiv = $("<div>").attr("class", "gif-div col-xs-12");
				var $img = $("<img>").attr("src", still)
					.attr("alt", "gif")
					.attr("class", "gif")
					.attr("animated", animated)
					.attr("still", still)
					.attr("state", "still");
				var $cap = $("<h2>");

				$("#gifs").append($newDiv);
				$newDiv.append($img)
					.prepend($cap);
				
				$cap.html("SURPRISE!");
		});

	});

	createBtns();
});
