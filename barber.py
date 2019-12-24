import requests
import json
import time
import sys

from your_keys import *
from binance import Binance

binance = Binance(BINANCE_KEY, BINANCE_SECRET)

def find_and_do_trades():
    rvn_price = float(binance.get_coin_price('RVNBTC'))

    rvn_24h_data = binance.get_24h_data('RVNBTC')
    rvn_24h_low = float(rvn_24h_data['low'])
    rvn_24h_high = float(rvn_24h_data['high'])

    if rvn_24h_high - rvn_24h_low < 0.00000020:
        return
    elif rvn_24h_high - (rvn_24h_high - rvn_24h_low) / 10 <= rvn_price:
        rvn_bal = binance.get_balance('RVN')
        if not '-q' in sys.argv or '--quiet' in sys.argv:
            print(f'Placed SELL Order on RVN @ {rvn_price + 0.00000002}\nRVN Balance: {rvn_bal}')
        binance.post_sell('RVNBTC', rvn_price + 0.00000002, rvn_bal / 10)
    elif rvn_24h_low + (rvn_24h_high - rvn_24h_low) / 10 >= rvn_price:
        btc_bal = binance.get_balance('BTC')
        if not '-q' in sys.argv or '--quiet' in sys.argv:
            print(f'Placed BUY Order on RVN @ {rvn_price + 0.00000002}\nBTC Balance: {btc_bal}')
        binance.post_buy('RVNBTC', rvn_price - 0.00000002, btc_bal / 10)

def show_welcome():
    print('\u001b[36;1m>-------------------------------------<')
    print('|          Welcome to BARBER          |')
    print('>-------------------------------------<\u001b[0m')

if __name__ == '__main__':
    if not '-q' in sys.argv or '--quiet' in sys.argv:
        show_welcome()
        print('\u001b[33mBarber is working!')
        print('To run this without printing, run it with the `-q` or `--quiet` option!')
        print('Use CTRL-C to quit!\u001b[0m')

    while True:
        try:
            find_and_do_trades()
            time.sleep(120)
        except KeyboardInterrupt:
            print('ool. Goodbye!')
            exit(0)
