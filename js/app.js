var running = 0;
var yourWins = 0;
var botWins = 0;

$("#rock").click(function() {
    startPlaying("rock", getRPSBot());

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-paper");
    $("#user-fa").removeClass("fa-hand-scissors");

    $("#user-fa").addClass("fa-hand-rock");
});

$("#paper").click(function() {
    startPlaying("paper", getRPSBot());

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-rock");
    $("#user-fa").removeClass("fa-hand-scissors");

    $("#user-fa").addClass("fa-hand-paper");
});

$("#scissors").click(function() {
    startPlaying("scissors", getRPSBot());

    $("#user-fa").removeClass("fa-user");
    $("#user-fa").removeClass("fa-hand-rock");
    $("#user-fa").removeClass("fa-hand-paper");

    $("#user-fa").addClass("fa-hand-scissors");
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
                    $("#winner").text("Tied!");
                }
                else if (bothand == "paper") {
                    // Bot wins
                    $("#winner").text("You lost!");
                    updateScore("bot");
                }
                else { // Scissors
                    // User wins
                    $("#winner").text("You win!");
                    updateScore("user");
                }
            }
            else if (hand == "paper") {
                if (bothand == "rock") {
                    // User wins
                    $("#winner").text("You win!");
                    updateScore("user");
                }
                else if (bothand == "paper") {
                    // Tied
                    $("#winner").text("Tied!");
                }
                else { // Scissors
                    // Bot wins
                    $("#winner").text("You lost!");
                    updateScore("bot");
                }
            }
            else { //Scissors
                if (bothand == "rock") {
                    // Bot wins
                    $("#winner").text("You lost!");
                    updateScore("bot");
                }
                else if (bothand == "paper") {
                    // User wins
                    $("#winner").text("You win!");
                    updateScore("user");
                }
                else { // Scissors
                    // Tied wins
                    $("#winner").text("Tied!");
                }
            }

            running = 0;
            clearInterval(interval);
        }

    }, 1000);
}

function updateScore(winner) {
    if (winner == "bot") {
        botWins++;
        $("#counter").html('<i class="fas fa-arrow-right" style="color: red"></i>');
    }
    else {
        yourWins++;
        $("#counter").html('<i class="fas fa-arrow-left" style="color: green"></i>');
    }

    $("#score").text(yourWins + " | " + botWins);
}