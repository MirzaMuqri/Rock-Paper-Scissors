var running = 0;
var yourWins = 0;
var botWins = 0;
var roundsnum = 5;
var roundsDone = 0;
var tie = 0;

$(".container").hide();

$("#rock").click(function() {
    if (running == 1) {
        return;
    }

    startPlaying("rock", getRPSBot());

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-paper");
    $("#user-fa").removeClass("fa-hand-scissors");

    $("#user-fa").addClass("fa-hand-rock");
    $("#rock").addClass("select");
});

$("#paper").click(function() {
    if (running == 1) {
        return;
    }
    
    startPlaying("paper", getRPSBot());

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-rock");
    $("#user-fa").removeClass("fa-hand-scissors");

    $("#user-fa").addClass("fa-hand-paper");
    $("#paper").addClass("select");
});

$("#scissors").click(function() {
    if (running == 1) {
        return;
    }

    startPlaying("scissors", getRPSBot());

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-rock");
    $("#user-fa").removeClass("fa-hand-paper");

    $("#user-fa").addClass("fa-hand-scissors");
    $("#scissors").addClass("select");
});

$("#round-selector").click(function (){
    var round = parseInt($("#best-of").val());

    startGame(round);
});

$("#rock").hover(function() {
    $("#selector-name").text("ROCK");
}, function() {
    $("#selector-name").text("");
});

$("#paper").hover(function() {
    $("#selector-name").text("PAPER");
}, function() {
    $("#selector-name").text("");
});

$("#scissors").hover(function() {
    $("#selector-name").text("SCISSORS");
}, function() {
    $("#selector-name").text("");
});

function startGame(round) {
    if (round > 0) {
        $(".round-selector").fadeOut();
        $(".container").fadeIn();
        roundsnum = round;

        $("#round-title").text(roundsnum + " Round(s)");
    }
    else {
        $("#error").text("Round must be 1 or more!");
    }
}

function getRPSBot() {
    var randomNum = Math.round(Math.random() * (30 - 0) + 0);

    if (randomNum >= 20) {
        return "rock";
    }
    else if (randomNum >= 10) {
        return "paper";
    }
    else {
        return "scissors";
    }
}

function startPlaying(hand, bothand) {

    if (running == 1) {
        return;
    }

    running = 1;
    roundsDone++;
    var counter = 4;

    $("#bot-fa").addClass("fa-question-circle");
    $("#bot-fa").removeClass("fa-hand-rock");
    $("#bot-fa").removeClass("fa-hand-paper");
    $("#bot-fa").removeClass("fa-hand-scissors");

    var interval = setInterval(function() {
        counter--;

        $("#ding")[0].play();

        if (counter > 0) {
            $("#counter").text(counter);
            $("#counter").fadeIn(500);
            $("#counter").fadeOut(500);
        }
        else {
            $("#bot-fa").removeClass("fa-question-circle");
            $("#counter").fadeIn(500);

            if (bothand == "rock") {
                $("#bot-fa").addClass("fa-hand-rock");
            }
            else if (bothand == "paper") {
                $("#bot-fa").addClass("fa-hand-paper");
            }
            else {
                $("#bot-fa").addClass("fa-hand-scissors");
            }

            $("#counter").text("");

            if (hand == "rock") {
                if (bothand == "rock") {
                    // Tied
                    updateScore("tied");
                }
                else if (bothand == "paper") {
                    // Bot wins
                    updateScore("bot");
                }
                else { // Scissors
                    // User wins
                    updateScore("user");
                }
            }
            else if (hand == "paper") {
                if (bothand == "rock") {
                    // User wins
                    updateScore("user");
                }
                else if (bothand == "paper") {
                    // Tied
                    updateScore("tied");
                }
                else { // Scissors
                    // Bot wins
                    updateScore("bot");
                }
            }
            else { //Scissors
                if (bothand == "rock") {
                    // Bot wins
                    updateScore("bot");
                }
                else if (bothand == "paper") {
                    // User wins
                    updateScore("user");
                }
                else { // Scissors
                    // Tied wins
                    updateScore("tied");
                }
            }

            clearInterval(interval);
        }

    }, 1000);
}

function updateScore(winner) {
    if (winner == "bot") {
        botWins++;
        $("#counter").html('<i class="fas fa-arrow-right" style="color: red"></i>');
        $("#winner").text("You lost!");
    }
    else if (winner == "user") {
        yourWins++;
        $("#counter").html('<i class="fas fa-arrow-left" style="color: green"></i>');
        $("#winner").text("You win!");
    }
    else {
        tie++;
        $("#counter").html('<i class="fas fa-arrows-alt-h" style="color: green"></i>');
        $("#winner").text("Tie!");
    }

    $("#rock").removeClass("select");
    $("#paper").removeClass("select");
    $("#scissors").removeClass("select");

    $("#score").text(yourWins + " | " + tie + " | " + botWins);

    if (roundsDone >= roundsnum) {
        $("#round-show").text("The winner is....");
        setTimeout(function() {
            showWinner();
        }, 3000);
        return;
    }
    else {
        $("#round-show").text("Round: " + (roundsDone + 1));
        running = 0;
    }
}

function showWinner() {
    var wins;

    if (botWins > yourWins) {
        wins = "Bot";
    }
    else if (yourWins > botWins) {
        wins = "You";
    }
    else {
        wins = "Tied";
    }

    $("#show-winner").text("Winner: " + wins + "!");
    $(".round-selector").fadeIn();

    roundsDone = 0;
    roundsnum = 5;
    yourWins = 0;
    botWins = 0;
    running = 0;
    tie = 0;

    $("#score").text(yourWins + " | " + tie + " | " + botWins);
    $("#counter").empty();
    $(".container").fadeOut();

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-paper");
    $("#user-fa").removeClass("fa-hand-scissors");
    $("#user-fa").removeClass("fa-hand-rock");
    $("#user-fa").addClass("fa-user");

    $("#bot-fa").removeClass("fa-user");
    $("#bot-fa").removeClass("fa-hand-paper");
    $("#bot-fa").removeClass("fa-hand-scissors");
    $("#bot-fa").removeClass("fa-hand-rock");
    $("#bot-fa").addClass("fa-question-circle");

    $("#round-show").text("Round: 1");
    $("#winner").text("");
}