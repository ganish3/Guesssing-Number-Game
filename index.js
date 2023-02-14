let name;
const gameStart = () => {
  name = document.getElementById("name").value;
  localStorage.setItem("name", name);
  document.getElementById("welcome").innerHTML = "Welcome " + name + "!";
  document.getElementById("gameIn").style.visibility = "visible";
  localStorage.setItem("starting", new Date());
};
function random4Digit() {
  return shuffle("0123456789".split("")).join("").substring(0, 4);
}

function shuffle(o) {
  for (
    var j, x, i = o.length;
    i;
    j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
  );
  return o;
}
let arr1 = random4Digit().split("");

const validate = () => {
  const numbers = document.getElementById("int").value.split("");

  const duplicates = [
    ...new Set(numbers.filter((n, i) => numbers.indexOf(n) !== i)),
  ];

  console.log(duplicates);
  if (duplicates.length) {
    alert("Dont enter same number again");
  } else {
    let finalValue = compareArrays(arr1, numbers);
    console.log(finalValue);
    document.getElementById("result").innerHTML =
      "Your Result is " + finalValue;

    if (finalValue == "++++") {
      localStorage.setItem("ending", new Date());
      let date1 = new Date(localStorage.starting);
      let date2 = new Date(localStorage.ending);
      const diffInMs = date2 - date1;
      const diffInMin = Math.floor(diffInMs / (1000 * 60));
      document.getElementById("timing").innerHTML =
        " Your best time is " + diffInMin + " minutes";
    }

    if (localStorage.player && localStorage.player.length > 0) {
      let player = JSON.parse(localStorage.player);
      let obj = { attempt: +player.attempt + 1, name: localStorage.name };
      console.log(obj);
      localStorage.setItem("player", JSON.stringify(obj));
    } else {
      let obj = {
        name: localStorage.name,
        attempt: 1,
      };
      localStorage.setItem("player", JSON.stringify(obj));
    }
  }
};

function compareArrays(arr1, arr2) {
  let plus = "";
  let minus = "";
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) {
      plus += "+";
    } else if (arr2.includes(arr1[i])) {
      minus += "-";
    }
  }
  console.log(arr1, arr2);
  return plus + minus;
}
