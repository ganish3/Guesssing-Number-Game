let name;
const gameStart = () => {
    let name = document.getElementById("name").value;
    localStorage.removeItem('name');
    localStorage.setItem("name", name);
    document.getElementById("welcome").innerHTML = "Welcome " + name + "!";
    document.getElementById("gameIn").style.visibility = "visible";
    localStorage.setItem("starting", new Date());
    localStorage.removeItem('player');
    localStorage.removeItem("starting");
    localStorage.removeItem("ending");
    const data = localStorage.data ? JSON.parse(localStorage.data) : [];
    const check = data.filter((item) => item.name === name)
    if (check && check.length > 0) {
        // localStorage.setItem('data', JSON.stringify([...obj]))
    } else {
        const obj = {
            name: name,
            attempt: 0
        }
        localStorage.setItem('data', JSON.stringify([...data, obj]))
    }
    updateTable()
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

    if (duplicates.length) {
        alert("Dont enter same number again");
    } else {
        const data = localStorage.data ? JSON.parse(localStorage.data) : [];
        let finalValue = compareArrays(arr1, numbers);
        let name = document.getElementById("name").value;
        document.getElementById("result").innerHTML =
            "Your Result is " + finalValue;
        // let jsonObj = JSON.parse(localStorage.player)
        // document.getElementById("attempt").innerHTML = "Your attempt " + jsonObj.attempt;

        if (finalValue == "++++") {
            localStorage.setItem("ending", new Date());
            let date1 = new Date(localStorage.starting);
            let date2 = new Date(localStorage.ending);
            const diffInMs = date2 - date1;
            const diffInMin = Math.floor(diffInMs / (1000 * 60));
            document.getElementById("timing").innerHTML = " Your best time is " + diffInMin + " minutes";
            const updateData = data.map((item) => {
                if (item.name === name) {
                    item.bestTime = diffInMin
                }
                return item
            })
            localStorage.setItem('data', JSON.stringify(updateData))
        }
        const temp = data.map((item) => {
            if (item.name === name) {
                item.attempt = item.attempt + 1
            }
            return item
        })
        localStorage.setItem('data', JSON.stringify(temp))
        if (localStorage.player && localStorage.player.length > 0) {
            let player = JSON.parse(localStorage.player);
            let obj = { attempt: +player.attempt + 1, name: localStorage.name };
            localStorage.setItem("player", JSON.stringify(obj));
        } else {
            let obj = {
                name: localStorage.name,
                attempt: 1,
            };
            localStorage.setItem("player", JSON.stringify(obj));
        }
    }
    updateTable()
};

function compareArrays(arr1, arr2) {
    let emptArr = [];
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] === arr2[i]) {
            emptArr.push("+");
        } else if (arr1.includes(arr2[i])) {
            emptArr.push("-");
        } else {
            emptArr.push("*");
        }
    }
    console.log(arr1, arr2);
    return emptArr.join("");
}

localStorage.removeItem("player")

const updateTable = () => {
    let finalArr = JSON.parse(localStorage.getItem("data"));
    let displayName = finalArr.map((element) => {
        return `<tr>
          <td>${element.name}</td>
          <td>${element.attempt}</td>
          <td>${element.bestTime !== undefined ? element.bestTime : '-'}</td>
          </tr>`
    })
    document.getElementById("tableDyn").innerHTML = displayName;
}
updateTable()