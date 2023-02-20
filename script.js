let bodyNode = document.getElementsByTagName("body")[0];

let holds = [false, false, false, false, false, false];

//---------------------TERNING-----------------------------------------
let terninger = Array.from(bodyNode.querySelectorAll("img"));
let button = document.getElementById("knap-rul");

for (const terning of terninger) {
    terning.addEventListener("click", () => {
        chooseDice(terning);
    });
}

button.addEventListener("click", () => {
    rollDice(terninger);
})



function rollDice(terninger) {
    for (const i in terninger) {
        if (holds[i]) {
            let rand = Math.trunc((Math.random()*6) + 1);
            terninger[i].src = `/images/Dice.${rand}.png`;
        }
    }
}

function chooseDice(target) {
    let id = target.id.split(".")[1];
    let terningKast = target.src.split(".")[4];
    target.src = `/images/Valgt.${terningKast}.png`;
    holds[id-1] = true;
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