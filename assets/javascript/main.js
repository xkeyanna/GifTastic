var dogArray = ["Yorkie", "Pitbull", "American Bulldog", "Poodle", "Shitzu"];

$(document).ready(function() {
    for (var i = 0; i < dogArray.length; i++) {
        $("#dog-buttons").append("<button type='button' onclick='searchGif(\"" + dogArray[i] + "\")' class='btn btn-primary' value=' " + dogArray[i] + "'> " + dogArray[i] + " </button>");
    }
});

function dogButtonClicked() {
    var userInput = $('#dog-input').val();
    searchGif(userInput);
}


document.onkeyup = function(Event) {
    if (event.key === "Enter") {
        userInput();
    }
};


function submitButtonClicked() {
    var userInput = $('#dog-input').val();

    if (userInput) {
        $('#dog-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=r2W7X58QdeNq3AlcuEJDvQtRWfKqyAx8',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    $('#dogs').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#dogs').append(image);
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