import requests
import json
import hmac
import time
import hashlib

from your_keys import BINANCE_KEY, BINANCE_SECRET


class Binance:
    def __init__(self, key, secret):
        self.key = key
        self.secret = secret
        self.endpoint = 'https://api.binance.com/api/v3'
        self.headers = {
            'X-MBX-APIKEY': self.key,
        }

    def sign_params(self, params):
        h = hmac.new(self.secret.encode(), params.encode(), hashlib.sha256)
        return h.hexdigest()

    def get_coin_price(self, symbol):
        return json.loads(requests.get(self.endpoint + f'/avgPrice?symbol={symbol}').text)['price']

    def post_buy(self, symbol, price, amount):
        data = f'symbol={symbol}&price={price}&quantity={amount}&type=LIMIT&side=BUY&timeInForce=GTC&recvWindow=60000&timestamp={self.server_time()}'
        print(data)
        return requests.post(self.endpoint + f'/order?{data}&signature={self.sign_params(data)}', headers=self.headers).text

    def post_sell(self, symbol, price, amount):
        data = f'symbol={symbol}&price={price}&quantity={amount}&type=LIMIT&side=SELL&timeInForce=GTC&recvWindow=60000&timestamp={self.server_time()}'
        return requests.post(self.endpoint + f'/order?{data}&signature={self.sign_params(data)}', headers=self.headers).text

    def get_trades(self, symbol):
        data = f'symbol={symbol}&limit=10&timestamp={self.server_time()}'
        trades = json.loads(requests.get(self.endpoint + f'/myTrades?{data}&signature={self.sign_params(data)}', headers=self.headers).text)
        return trades
    
    def get_balance(self, asset):
        data = f'timestamp={self.server_time()}'
        balances = json.loads(requests.get(self.endpoint + f'/account?{data}&signature={self.sign_params(data)}', headers=self.headers).text)['balances']
        return next((item for item in balances if item["asset"] == asset), {'free':0})['free']

    def get_24h_data(self, symbol):
        data = json.loads(requests.get(self.endpoint + f'/ticker/24hr?symbol={symbol}').text)
        return {'high': data['highPrice'], 'low': data['lowPrice']}

    def server_time(self):
        j = json.loads(requests.get(self.endpoint + '/time').text)
        return j['serverTime']



if __name__ == '__main__':
    input('ctrl-c if you don\'t want to run debug tests, otherwise press ENTER')
    b = Binance(BINANCE_KEY, BINANCE_SECRET)
    print('RVNBTC price:', b.get_coin_price('RVNBTC'))
    print('BTCUSDT price:', b.get_coin_price('BTCUSDT'))
    print('BUY 1 RVN 0.00000200', b.post_buy('RVNBTC', '0.00000200', 100))
    print('RVN bal:', b.get_balance('RVN'))
    print('BTC bal:', b.get_balance('BTC'))
