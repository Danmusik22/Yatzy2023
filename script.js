let bodyNode = document.getElementsByTagName("body")[0];

//Array af <img> -elementer, som viser de terningeslag der er blevet slået
let terninger = Array.from(bodyNode.querySelectorAll("img"));

//Rul knappen
let button = document.getElementById("knap-rul");

//Array af int-værdier af terning-slagene. Bliver opdateret i rollDoce() metoden
//kan bruges til at aflæse point
let terningValues = [5];

let pointInputs = Array.from(document.getElementsByClassName("point"));

let totalScore = 0;

let rollCount = 10;


//Loop som tilføjer event listener til hver terning, så man kan klikke på alle terningerne
for (const terning of terninger) {
    terning.addEventListener("click", () => {
        chooseDice(terning);
    });
}

//---------------------TERNING---------------------------------------------

/*
funktion rollDice(terninger) 
  param: array af <img>-elementer

  loop går igennem hver <img>-element 
  tjekker om 'valgt' attributten er false
  hvis den er det:
      Generér et tilfældigt tal mellem 1 og 6
      Sæt stien til aktuelle <img> til at matche
      det tal der blev generet.
      Gem den nye sti i en variabel: urlString
      Opdatér i'ende plads i terningValues[] til
      det tilfældige generede tal.

    Træk 1 fra rollCount
    Gem count html elementet i en variabel
    set texten i variablen til at være det nye antal kast
*/
function rollDice(terninger) {
  if(rollCount <= 0) {
    return;
  }
    for (const i in terninger) {
        if (terninger[i].dataset.valgt == "false") {
            let rand = Math.trunc((Math.random()*6) + 1);
            terninger[i].src = `/images/Dice.${rand}.png`;
            let urlString = terninger[i].src;
            terningValues[i] = rand;
        }
    }
    rollCount --;
    let rollCountText = document.getElementById("count");
    rollCountText.innerHTML = `Antal kast: ${rollCount}`
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
    let fileName = target.src.split("/")[4];
    if (fileName == "EmptyDice.png") {
      return;
    }
    let terningValue = target.src.split(".")[4];

    if (target.dataset.valgt == "false") {
        target.src = `/images/Valgt.${terningValue}.png`;
        target.dataset.valgt = "true";
    } else {
        target.src = `/images/Dice.${terningValue}.png`;
        target.dataset.valgt = "false";
    }
}

//-------------------POINTS-------------------------------------------

function calcCounts() {
  let øjne = [0, 0, 0, 0, 0, 0];
  for (value of terningValues) {
    øjne[value -1]++;
  }
  return øjne;
}

let sameValuePoints = function sameValuePoints(value) {
    return calcCounts()[value -1] * value;
}

let onePairPoints = function onePairPoints() {
    værdi = 0;
    for (i = 0; i < calcCounts().length; i++) {
      if (calcCounts()[i] > 1) {
        værdi = i+1;
      }
    }
    return 2 * værdi;
}
let twoPairPoints = function twoPairPoints() {
    værdi1 = 0;
    værdi2 = 0;
    for (let i = calcCounts().length-1; i >= 0; i--) {

      if (calcCounts()[i] > 1 && værdi1 == 0) {
        værdi1 = i+1;
      }

      if (calcCounts()[i] > 1) {
        værdi2 = i+1;
      }
    }
    if (værdi1 == værdi2) {
      værdi1 = 0;
      værdi2 = 0;
    }
    return (værdi1 * 2) + (værdi2 * 2);
  }

  let threeSamePoints = function threeSamePoints() {
    værdi = 0;
    for (let i = 0; i < calcCounts().length; i++) {
      if (calcCounts()[i] > 2) {
        værdi = i +1;
      }
    }
    return 3 * værdi;
  }

  let fourSamePoints = function fourSamePoints() {
    værdi = 0;
    for (let i = 0; i < calcCounts().length; i++) {
      if (calcCounts()[i] > 3) {
        værdi = i +1;
      }
    }
    return 4 * værdi;
  }

  let fullHousePoints = function fullHousePoints() {
    værdi1 = 0;
    værdi2 = 0;
    for (let i = calcCounts().length-1; i >= 0; i--) {
      if (calcCounts()[i] == 2 && værdi1 == 0) {
        værdi1 = i +1;
      }
      if (calcCounts()[i] == 3) {
        værdi2 = i +1;
      }
    }
    if (værdi1 == 0 || værdi2 == 0) {
      værdi1 = 0;
      værdi2 = 0;
    }
    return værdi1 * 2 + værdi2 * 3;
  }

  let smallStraightPoints = function smallStraightPoints() {
    counts = calcCounts();
    for (let i = 0; i < counts.length - 1; i++) {
      if (calcCounts()[i] != 1) {
        return 0;
      }
    }
    return 15;
  }

  let largeStraightPoints = function largeStraightPoints() {
    for (let i = 1; i < calcCounts().length; i++) {
      if (calcCounts()[i] != 1) {
        return 0;
      }
    }
    return 20;
  }

  let chancePoints = function Points() {
    let points = 0;
    for (let i = 0; i < calcCounts().length; i++) {
      points += calcCounts()[i] * (i+1);
    }
    return points;
  }

  let yatzyPoints = function yatzyPoints() {
    for (i = 0; i < calcCounts().length; i++) {
      if (calcCounts()[i] == 5) {
        return 50;
      }
    }
    return 0;
  }


let pointFunktioner = 
  [sameValuePoints, onePairPoints, twoPairPoints, 
    threeSamePoints, fourSamePoints, fullHousePoints, 
    smallStraightPoints, largeStraightPoints, chancePoints, 
    yatzyPoints];

//event listener til 'rul' -knappen
button.addEventListener("click", () => {
    rollDice(terninger);
    for (let i = 0; i < pointInputs.length; i++) {
      if (pointInputs[i].dataset.locked == "false") {
          if (i < 6) {
          pointInputs[i].value = pointFunktioner[0](i +1);
        } else {
          pointInputs[i].value = pointFunktioner[i - 5]();
        }
      }
    }
    document.getElementById("input-sum").value = sum();
    document.getElementById("input-bonus").value = bonusPoint();
    document.getElementById("input-total").value = total();
});

function total() {
  let totalScore = 0;
  for(input of pointInputs) {
    totalScore += parseInt(input.value);
  }
  totalScore += sum() + bonusPoint();
  return totalScore;
}

function sum() {
  let sumScore = 0;

  for(let i = 0; i < 6; i++) {
    sumScore += parseInt(pointInputs[i].value); 
  }
  return sumScore;
}

function bonusPoint() {
  if (sum() >= 63) {
    return 50;
  }
  return 0;
}
//-----------------------Input logic-----------------------------------------

for(let i = 0; i < pointInputs.length; i++) {
  pointInputs[i].addEventListener("click", () => {
    lockInput(pointInputs[i]);
  })
}

function lockInput(input) {
  input.dataset.locked = "true";
  input.disabled = "true";
}
