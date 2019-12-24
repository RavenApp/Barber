import atexit

from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, jsonify, render_template

from barber import binance, find_and_do_trades

app = Flask(__name__)

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/data', methods=['GET'])
def data():
    return jsonify({
        'btc': binance.get_balance('BTC'),
        'rvn': binance.get_balance('RVN'),
        'trades': binance.get_trades('RVNBTC'),
        'rvnprice': binance.get_coin_price('RVNBTC'),
        'btcprice': round(float(binance.get_coin_price('BTCUSDT')), 2),
    })

if __name__ == '__main__':
    app.run('localhost', 3333)
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=find_and_do_trades, trigger="interval", seconds=120)
    scheduler.start()

    atexit.register(lambda: scheduler.shutdown())
