//---------------------DICES-----------------------------------------

let bodyNode = document.getElementsByTagName("body")[0];
let dices = Array.from(bodyNode.querySelectorAll("img"));
let button = document.getElementById("button-roll");
let values = [5];
let throwCount = 0;
let throwCountText = document.getElementById("throwCount")
let content = document.createTextNode("Turn " + throwCount)
throwCountText.appendChild(content);

// add click event to roll-button to roll dices
button.addEventListener("click", () => {
  rollDice(dices);
  throwCount++;
  throwCountText.textContent = "Turn " + throwCount;
  updatePoints();
  if (throwCount > 2) {
    button.disabled = true;
  }
});

function rollDice(dices) {
  for (let i in dices) {
    if (dices[i].dataset.valgt == "false") {
      let rand = Math.trunc((Math.random() * 6) + 1);
      dices[i].src = `/images/Dice.${rand}.png`;
      values[i] = rand;
    }
  }
  // add click events to dices so you can choose them
  for (let dice of dices) {
    dice.addEventListener("click", () => {
      chooseDice(dice);
    });
  }
}

/*
funktion chooseDice(target)
  param: <img>-element

  Få værdien ved at <img>.src -strengen ved hvert "."
  og gem strengen på plads 4 i variablen terningValue

  Hvis <img>s valgt-data-attribut er false:
    Ændre billedet til sort
    Ændre valgt-data-attributten til true
  ellers:
    Ændre billedet til transperent
    Ændre valgt-data-attributten til false
*/
function chooseDice(target) {
  let diceKast = target.src.split(".")[4];
  if (target.dataset.valgt == "false") {
    target.src = `/images/Valgt.${diceKast}.png`;
    target.dataset.valgt = "true";
  } else {
    target.src = `/images/Dice.${diceKast}.png`;
    target.dataset.valgt = "false";
  }
  if (throwCount > 2) {
    target.src = `/images/Valgt.${diceKast}.png`;
    target.dataset.valgt = "true";
  }
}

//-------------------POINTS-------------------------------------------

let totalInput = document.getElementById("total");
let totalPoints = 0;
let sumInput = document.getElementById("sum");
let totalSum = 0;
let bonusInput = document.getElementById("bonus");
let totalBonus = 0;

function updatePoints() {
  let results = getResults();
  let resultInputFields = Array.from(bodyNode.getElementsByClassName("result"));
  for (let i = 0; i < resultInputFields.length; i++) {
    if (!resultInputFields[i].dataset.gemt) {
      resultInputFields[i].value = results[i];
      resultInputFields[i].disabled = false;
      //add click events to result fields and their labels so you can save a result
      [resultInputFields[i], resultInputFields[i].previousElementSibling].forEach(function (element) {
        element.addEventListener("click", () => {
          updateTopSectionContent();
          updateTotalSumBonus(resultInputFields[i], i);
          resultInputFields[i].dataset.gemt = "true";
          for (let i = 0; i < resultInputFields.length; i++) {
            resultInputFields[i].disabled = true;
          }
          checkGameOver(resultInputFields, totalPoints);
        });
      });
    } else {
      resultInputFields[i].disabled = true;
    }
  }
}

function updateTopSectionContent() {
  document.getElementById("button-roll").disabled = false;
  throwCount = 0;
  throwCountText.textContent = "Turn " + throwCount;
  for (let dice of dices) {
    let diceKast = dice.src.split(".")[4];
    dice.src = `/images/Dice.${diceKast}.png`;
    dice.dataset.valgt = "false";
  }
}

function updateTotalSumBonus(input, i) {
  if (!input.dataset.gemt) {
    totalPoints += parseInt(input.value);
    totalInput.value = totalPoints;
    if (i < 6) {
      totalSum += parseInt(input.value);
      sumInput.value = totalSum;
      if (totalSum > 62) {
        totalBonus += 50;
        bonusInput.value = totalBonus;
        totalPoints += totalBonus;
        totalInput.value = totalPoints;
      }
    }
  }
}

function checkGameOver(array, totalPoints) {
  let freeFields = false;
  for (let i = 0; i < array.length; i++) {
    if (!array[i].dataset.gemt) {
      freeFields = true;
    }
  }
  if (!freeFields) {
    if (confirm("Game is over. You got " + totalPoints + " points.\nPress OK to start a new game :)")) {
      location.reload();
    }
  }
}

//-------------------RESULTCALCULATIONS-------------------------------------------

function getResults() {
  let results = [];
  results[0] = sameValuePoints(1);
  results[1] = sameValuePoints(2);
  results[2] = sameValuePoints(3);
  results[3] = sameValuePoints(4);
  results[4] = sameValuePoints(5);
  results[5] = sameValuePoints(6);
  results[6] = onePairPoints();
  results[7] = twoPairPoints();
  results[8] = threeSamePoints();
  results[9] = fourSamePoints();
  results[10] = fullHousePoints();
  results[11] = smallStraightPoints();
  results[12] = largeStraightPoints();
  results[13] = chancePoints();
  results[14] = yatzyPoints();
  return results;
}

function calcCounts() {
  let counts = [null, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < values.length; i++) {
    counts[values[i]]++;
  }
  return counts;
}

function sameValuePoints(value) {
  return calcCounts()[value] * value;
}

function onePairPoints() {
  værdi = 0;
  for (i = 1; i < calcCounts().length; i++) {
    if (calcCounts()[i] > 1) {
      værdi = i;
    }
  }
  return 2 * værdi;
}

function twoPairPoints() {
  værdi1 = 0;
  værdi2 = 0;
  for (i = 1; i < calcCounts().length; i++) {
    if (calcCounts()[i] > 1 && værdi1 == 0) {
      værdi1 = i;
    }
    if (calcCounts()[i] > 1 && værdi1 > 0) {
      værdi2 = i;
    }
  }
  if (værdi1 == værdi2) {
    værdi1 = 0;
    værdi2 = 0;
  }
  return (værdi1 * 2) + (værdi2 * 2);

}

function threeSamePoints() {
  værdi = 0;
  for (i = 1; i < calcCounts().length; i++) {
    if (calcCounts()[i] > 2) {
      værdi = i;
    }
  }
  return 3 * værdi;
}

function fourSamePoints() {
  værdi = 0;
  for (i = 1; i < calcCounts().length; i++) {
    if (calcCounts()[i] > 3) {
      værdi = i;
    }
  }
  return 4 * værdi;
}

function fullHousePoints() {
  værdi1 = 0;
  værdi2 = 0;
  for (i = 1; i < calcCounts().length; i++) {
    if (calcCounts()[i] == 2) {
      værdi1 = i;
    }
    if (calcCounts()[i] == 3) {
      værdi2 = i;
    }
  }
  if (værdi1 == 0 || værdi2 == 0) {
    værdi1 = 0;
    værdi2 = 0;
  }
  return værdi1 * 2 + værdi2 * 3;
}

function smallStraightPoints() {
  for (i = 1; i < calcCounts().length - 1; i++) {
    if (calcCounts()[i] != 1) {
      return 0;
    }
  }
  return 15;
}

function largeStraightPoints() {
  for (i = 2; i < calcCounts().length; i++) {
    if (calcCounts()[i] != 1) {
      return 0;
    }
  }
  return 20;
}

function chancePoints() {
  let værdi = 0;
  for (i = 1; i < calcCounts().length; i++) {
    værdi += calcCounts()[i] * i;
  }
  return værdi;
}

function yatzyPoints() {
  bonus = 0;
  for (i = 1; i < calcCounts().length; i++) {
    if (calcCounts()[i] > 4) {
      bonus = 50;
      break;
    }
  }
  return bonus;
}