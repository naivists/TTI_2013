/* 
 */

//capital cities of some countries
var capitalData = {
    "Turkey": "Ankara",
    "Ghana": "Accra",
    "Ethiopia": "Addis Ababa",
    "Latvia": "Rīga",
    "Germany": "Berlin",
    "The Netherlands": "Amsterdam",
    "Belgium": "Brussels",
    "Kazakhstan": "Astana",
    "Niger": "Niamey",
    "Nigeria": "Abuja"
};



//on page load, call the "initialize" function
$(initializeCountryGame);
$(initializeCapitalsGame);


function initializeCountryGame() {
    //since there is only one such submit, 
    //attaching the event handler directly
    $("#europe-game button.submit")
               .on("click", 
                    //as the button is clicked, calling "validateBox" on each checkbox
                    function (){
                       $("#europe-game input[type='checkbox']").each(validateBox);
                   }
                );
}


//checks if boxes that should be checked actually are.
function validateBox() {
    var $self = $(this);
    var isChecked = $self.prop('checked');
    var $parent = $self.closest("li");
    var isMember = $parent.hasClass("member");

    if (isChecked ^ isMember) {        
        //the cross cases are the wrong ones 
        //(! isChecked and isMember or otherwise)
        $parent.addClass("wrong").removeClass("right");
    } else {
        $parent.addClass("right").removeClass("wrong");

    }
}


//creates the UI for the "select a capital for a country" 
function initializeCapitalsGame() {
    var $game = $("#capital-game");
    var $p;
    var $choices;
    for (var country in capitalData) {
        $p = $("<p/>").text(country).attr("data-right-answer", capitalData[country])
        
        $game.append($p);

        $choices = $("<select />");
        for (var country2 in capitalData) {
            var $choice = $("<option />");
            $choice.text(capitalData[country2]);
            $choices.append($choice);
        }
        $p.prepend($choices);
    }
    $button = $("<button class='submit'>Am I right?</button>");

    $button.on("click", function() {
        $game.find("option:checked").each(
                function() {
                    var $self = $(this);
                    var $para = $self.closest("p");

                    if ($self.val() === $para.attr("data-right-answer")) {
                        $para.addClass("right").removeClass("wrong");
                    } else {
                        $para
                                .addClass("wrong")
                                .removeClass("right")
                                .animate({"margin-left": "55px"}, 3000)
                                .animate({"margin-left": "0px"});

                    }
                }
        );
    });

    $game.append($button);

}