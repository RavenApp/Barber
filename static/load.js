function load() {
    let r = new XMLHttpRequest();
    r.open('GET', '/data', true);
    r.onload = function() {
        let j = JSON.parse(this.response);
        var loading1 = document.getElementById('loading1');
        var loading2 = document.getElementById('loading2');
        var btc = document.getElementById('btc');
        var rvn = document.getElementById('rvn');
        var opentrades = document.getElementById('opentrades');
        loading1.style.display = "none";
        loading2.style.display = "none";
        btc.innerHTML = "<h3>Prices & Your Balances</h3><hr>Your BTC: " + j['btc'] + "<br>";
        rvn.innerHTML = "Your RVN: " + j['rvn'] + "<br>";
        opentrades.innerHTML = '<h3>Your Latest RVN Trades</h3><hr>' + json2html(j['trades']);
        updatePrices(j);
    }
    r.send();
}

function updatePrices(j) {
    let rvn = document.getElementById('rvn-price');
    let btc = document.getElementById('btc-price');

    rvn.innerHTML = 'RVN/BTC Price: ' + j['rvnprice'] + '<br>';
    btc.innerHTML = 'BTC/USDT Price: ' + j['btcprice'];
}

function json2html(j) {
    console.log(j);
    let s = '';
    let row;
    for (var i = 0; i < j.length; i++) {
        row = j[i];
        if (row['isBuyer'] === true) {
            s = s.concat('<b class="g">BUY</b>' + ' '  + row['price'] + '<br>');
        } else {
            s = s.concat('<b class="r">SELL</b>' + ' ' + row['price'] + '<br>');
        }
    }
    if (s.length !== 0) {
        return s;
    } else {
        return 'None... yet!'
    }
}

setInterval(load, 10000);
setTimeout(load, 20);