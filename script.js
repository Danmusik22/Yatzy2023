let bodyNode = document.getElementsByTagName("body")[0];

//Array af <img> -elementer, som viser de terningeslag der er blevet slået
let terninger = Array.from(bodyNode.querySelectorAll("img"));

//Rul knappen
let button = document.getElementById("knap-rul");

//Array af int-værdier af terning-slagene. Bliver opdateret i rollDoce() metoden
//kan bruges til at aflæse point
let terningValues = [];

//Loop som tilføjer event listener til hver terning, så man kan klikke på alle terningerne
for (const terning of terninger) {
    terning.addEventListener("click", () => {
        chooseDice(terning);
    });
}

//event listener til 'rul' -knappen
button.addEventListener("click", () => {
    rollDice(terninger);
});


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
*/
function rollDice(terninger) {
    for (const i in terninger) {
        if (terninger[i].dataset.valgt == "false") {
            let rand = Math.trunc((Math.random()*6) + 1);
            terninger[i].src = `/images/Dice.${rand}.png`;
            let urlString = terninger[i].src;
            terningValues[i] = rand;
        }
    }
    console.log(terningValues);
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
function initializeGameFunctions() {
  let values = [5]
  let throwCount = 0

  function throwDice(holds) {
    for (i = 0; i < values.length; i++) {
      if (!holds[i]) {
        values[i] = (int)((Math.random() * 6) + 1);
      }
    }
    throwCount++;
  }

  function getResults() {
    let results = []
    for (i = 0; i <= 5; i++) {
      results[i] = this.sameValuePoints(i + 1);
    }
    results[6] = this.onePairPoints();
    results[7] = this.twoPairPoints();
    results[8] = this.threeSamePoints();
    results[9] = this.fourSamePoints();
    results[10] = this.fullHousePoints();
    results[11] = this.smallStraightPoints();
    results[12] = this.largeStraightPoints();
    results[13] = this.chancePoints();
    results[14] = this.yatzyPoints();

    return results;
  }

  function calcCounts() {
    counts = new int[7];
    for (i of values) {
      counts[i]++;
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
    counts = calcCounts();
    for (i = 1; i < counts.length - 1; i++) {
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
    chancePoints = 0;
    for (i = 1; i < calcCounts().length; i++) {
      chancePoints += calcCounts()[i] * i;
    }
    return chancePoints;
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