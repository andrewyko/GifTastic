$(document).ready(function() {
    
    var topics = ["cats", "dogs", "turtles", "monkeys"];
   
    function buttonShow(){
        $("#display-btns").empty();
        for (var i = 0; i < topics.length; i ++) {
            var a = $("<button>");
            a.addClass("gif");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#display-btns").append(a);
        }
    } 

    function displayGif() {

        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
            animal + "&api_key=dc6zaTOxFJmzC&limit=20";
            // limit= how many you want to appear
            // ==================================

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {
            var results = response.data;

            for (var i=0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='item'>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var animalImage = $("<img>");
                        animalImage.attr("src", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url);
                        animalImage.attr("data-animate", results[i].images.fixed_height.url);
                        animalImage.attr("data-state", "still");
                        animalImage.addClass("animate");

                    gifDiv.append(p);
                    gifDiv.append(animalImage);

                    $("#display-gifs").prepend(gifDiv);
                }
            }
        })
    }

    buttonShow();

    // Event Handlers

    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        topics.push(gif);
        buttonShow();
        $("#add-a-btn")[0].reset();
    });
    
    $(document).on("click", ".gif", displayGif);

    $(document).on("click", ".animate", function() {
      
      var state = $(this).attr("data-state");
      
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

});