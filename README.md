# Barber

A full-featured Ravencoin tradebot, including a web interface. By [RavenApps](https://ravenapps.xyz)!

This bot does not guarantee any financial gains. Be prepared to lose anything. See security at the bottom.

**IMPORTANT!!** This bot will use all the money in your binance account! Be careful!

## Running (Tested on Linux)

You must have Python version 3.6 or above!

Edit the `your_keys.py` file to reflect your binance API keys. You must gives these keys permission to trade.

Then clone this repo:

```
git clone https://github.com/RavenApp/Barber && cd Barber
```

and install requirements from pip:

```
pip install -r requirements.txt
```

### Web Interface

```
python interface.py
```

Then the interface will be accessable at http://localhost:3333/

### From Terminal

```
python barber.py
```

to run without printing anything you can add a `-q` or `--quiet`

## The Algorithm

The Barber waits until RVN is within ~10% of the day high or day low. If RVN is close to the day low, then he will place a buy order and vice versa for the day high. The Barber will **NOT** make any trades if RVN day high minus RVN day low is less than 20 satoshis.

### Editing the algorithm

Please do! Make your own version of Barber. By editing the `barber.py` file you can do just that, and quite easily because of the small Binance API wrapper I made! If you do this, consider commiting your file under `other/blah.py`!

## Security

Before running look at the code, it's actually fairly simple. Look for any requests being sent outside of `binance.com` that could be stealing your keys. Look for anything shady whatsoever. I didn't put anything bad in there, but you don't know that. If you don't know how to code, find someone who does, or at least try to read the code. It is extremely important that you or someone you trust reads the code and gives it the OK. All your cryptocurrency is at risk if you don't.
