$(document).ready(function() {

	var gifArr = ["sloth", "Futurama", "The Simpsons", "Family Guy", "Doug", "Rugrats", "Rocko's Modern Life",
	"Boy Meets World", "Underdog"];
	
	function createBtns() {
		$("#gif-buttons").empty();

		for (var i = 0; i < gifArr.length; i++) {
			var $btn = $("<button>").attr("data-attr", gifArr[i])
				.attr("class", "btn btn-default gif-button")
				.text(gifArr[i]);

			$("#gif-buttons").append($btn);
		}
	}

	function getGiphy(keyword) {
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + keyword + "&limit=10&api_key=dc6zaTOxFJmzC";

		$("#gifs").empty();

		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response) {
			var results = response.data;
			
			for (var i = 0; i < results.length; i++) {
				var gif = results[i].images.fixed_height.url;
				var rating = results[i].rating;

				var $img = $("<img>").attr("src", gif)
					.attr("alt", "gif")
					.attr("class", "gif");

				$("#gifs").append($img);
			}
		});
	}

	$("#addGif").on("click", function(event) {
		event.preventDefault();

		var newGif = $("#gif-input").val().trim();

		if (newGif !== "") {
			$("#gif-input").val("");

			gifArr.push(newGif);
			createBtns();
		}
	});

	$(document).on("click", ".gif-button", function() {
		var keyword = $(this).attr("data-attr");

		getGiphy(keyword);
	});

	createBtns();
});