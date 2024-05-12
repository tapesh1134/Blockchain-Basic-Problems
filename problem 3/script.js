var api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbHVlIjoiNjNlY2EwNjNlYzkzMzI0NGEwYjg5NjEzIiwiaWF0IjoxNjc5Mzc0MTYzLCJleHAiOjMzMTgzODM4MTYzfQ.xDEVj1vQO9xWKHPFbPbMWVnsC46NuQ-jQC-NbQ-FEcc'
var token = 'BTC/USDT';
var timeInterval = '5m'
var wallat = { "usd": 1000, "BTC": 0 }
var url;
var price_url = `https://api.taapi.io/price?secret=${api_key}&exchange=binance&symbol=${token}&interval=${timeInterval}`
var rsi_url = `https://api.taapi.io/rsi?secret=${api_key}&exchange=binance&symbol=${token}&interval=${timeInterval}`

function rsiCall() {
    fetch(rsi_url)
        .then(response => response.json())
        .then(json => buy(json.value))

}

var caller = setInterval(rsiCall, 16000)

const buy = (value) => {
    if (wallat.usd > 0 && value < 30) {
        clearInterval(caller)
        setTimeout(() => {
            fetch(price_url)
                .then(response => response.json())
                .then(json => {
                    wallat = {
                        usd: wallat.usd - 100,
                        BTC: wallat.BTC + 100 / json.value,
                    }
                    console.log(wallat)
                    caller = setInterval(rsiCall, 16000)
                })
        }, 16000)
    } else if (wallat.BTC >= 30 && value > 70) {
        clearInterval(caller)
        setTimeout(() => {
            fetch(price_url)
                .then(response => response.json())
                .then(json => {
                    wallat = {
                        usd: wallat.BTC * json.value,
                        BTC: 0,
                    }
                    console.log(wallat)
                    caller = setInterval(rsiCall, 16000)
                })
        }, 16000)
    } else {
        // console.log(value)
        // console.log(wallat)
    }
document.write("RSI value: ",value);
document.write("{USD :",wallat.usd," BTC: ",wallat.BTC,"}\n");
}