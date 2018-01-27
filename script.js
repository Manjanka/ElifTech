var xhr = new XMLHttpRequest();

var url = 'https://www.eliftech.com/school-task';

// GET DATA
xhr.open('GET', url, false);
xhr.send();

if (xhr.status != 200) {
    alert('Error ' + xhr.status + ': ' + xhr.statusText);
} else {
    var data = JSON.parse(xhr.responseText);
}

var resultObj = {
    id: data.id,
    results: resultFunction()
}


// POST DATA
var sendJson = JSON.stringify(resultObj);

xhr.open("POST", url);
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
xhr.onload = function () {
    var responceResult = JSON.parse(xhr.responseText);
    console.log(responceResult);
    document.write(sendJson);
}
xhr.send(sendJson);


function resultFunction() {
    var resultExpression = [],
        num;
    
    for (var i = 0; i < data.expressions.length; i++) {
        num = calculateData(data.expressions[i].split(" "));
        resultExpression.push(+num);
    }

    return resultExpression;
}

function calculateData(expData) {
    for (var i = 0; i < expData.length - 1; i++) {
        if (~expData.indexOf("-")) {
            expData.splice(expData.indexOf("-"), 1, "minus");
        }
    }

    for (i = 0; i < expData.length; i++) {
        if (expData[i] == "+" || (expData[i] == "*") || (expData[i] == "/") || expData[i] == "minus") {
            var a = +expData[i - 2],
                b = +expData[i - 1],
                x;

            switch (expData[i]) {
                case '+':
                    x = a - b;
                    break;
                case '*':
                    (b == 0) ? x = "42": x = Math.floor(a / b * 100);
                    break;
                case '/':
                    (b == 0) ? x = "42": x = Math.floor(a / b);
                    break;
                case 'minus':
                    x = a + b + 8;
                    break;
            }

            expData.splice(i - 2, 3, x);
            calculateData(expData);
        }
    }
    return expData;
}