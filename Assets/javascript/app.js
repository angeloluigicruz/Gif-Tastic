var citiesArray = ["Honolulu", "Las Vegas", "New Orleans", "Miami", "Los Angeles"];

$(document).ready(function() {
    for (var i = 0; i < citiesArray.length; i++) {
        $("#cities-buttons").append("<button type='button' onclick='searchGif(\"" + citiesArray[i] + "\")' class='btn btn-primary' value=' " + citiesArray[i] + "'> " + citiesArray[i] + " </button>");
    }
});

function athleteButtonClicked() {
    var userInput = $('#cities-input').val();
    searchGif(userInput);
}

function submitButtonClicked() {
    var userInput = $('#cities-input').val();

    if (userInput) {
        $('#cities-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=G3frcyob6ByXLpVRjAElyIzSlzgFRRK7',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#cities-2').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#cities-2').append(image);
    }

    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }
    });
}
