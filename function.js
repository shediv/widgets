// Code By Webdevtrick ( https://webdevtrick.com )
// Listen for Submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // Hide Results
  document.getElementById("result").style.display = "none";
  // document.getElementById("bowling_overs").style.display = "none";

  // Show Loader
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function calculateResults() {
  
  let matches_count = parseInt(document.getElementById("matches_count").value);
  // let overs_per_match_count = parseInt(document.getElementById("overs_per_match_count").value);
  let run_scored = parseInt(document.getElementById("run_scored").value);
  let overs_played = parseFloat(document.getElementById("overs_played").value);
  let run_given = parseInt(document.getElementById("run_given").value);
  let overs_bowled = parseFloat(document.getElementById("overs_bowled").value);
  let batting_nrr = document.getElementById("batting_nrr");
  let bowling_nrr = document.getElementById("bowling_nrr");
  let nrr = document.getElementById("nrr");

  if (matches_count && run_scored && overs_played && run_given) {
    // Split overs played in overs and balls
    let overs_playedByTeam = (overs_played + "").split(".");
    let exactOversPlayed = parseInt(overs_playedByTeam[0]);
    let exactBallsPlayed = overs_playedByTeam[1] ? parseInt(overs_playedByTeam[1]) : 0;
    let totalOversPlayed = (exactOversPlayed + (0.16 * exactBallsPlayed));
    let battingNRR = (run_scored/totalOversPlayed);

    // Bowling
    let overs_bowledByTeam = (overs_bowled + "").split(".");
    let exactOversBowled = parseInt(overs_bowledByTeam[0]);
    let exactBallsBowled = overs_bowledByTeam[1] ? parseInt(overs_bowledByTeam[1]) : 0;
    let totalOversBowled = (exactOversBowled + (0.16 * exactBallsBowled));
    let bowlingNRR = (run_given/totalOversBowled);

    // nrr
    let totalNRR = battingNRR - bowlingNRR;

    // Set NRR values
    batting_nrr.value = battingNRR;
    bowling_nrr.value = bowlingNRR;
    nrr.value = totalNRR;    

    // Show Results
    document.getElementById("result").style.display = "block";
    // document.getElementById("bowling_overs").style.display = "block";

    // Hide Loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check number inputs");
  }
}

// Show Error
function showError(error) {
  // Hide Results
  document.getElementById("result").style.display = "none";
  // document.getElementById("bowling_overs").style.display = "none";

  // Hide Loader
  document.getElementById("loading").style.display = "none";

  // Create a div
  const errorDiv = document.createElement("div");

  // Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class
  errorDiv.className = "alert alert-danger";

  // Create text node and append div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear Error after 3 seconds
  setTimeout(clearError, 3000);

  // Clear Error
  function clearError() {
    document.querySelector(".alert").remove();
  }
}