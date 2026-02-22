const ccxt = require("ccxt");

// Whitelist of allowed exchanges — prevents prototype pollution via ccxt[exid]
const ALLOWED_EXCHANGES = new Set([
  "binance", "kraken", "coinbase", "bybit", "okx",
  "kucoin", "gate", "huobi", "bitfinex", "mexc",
]);

// Validate and initialize exchange
const exid = process.env.EXCHANGE_NAME || "binance";
if (!ALLOWED_EXCHANGES.has(exid)) {
  throw new Error(
    `Unsupported exchange: "${exid}". Allowed: ${[...ALLOWED_EXCHANGES].join(", ")}`
  );
}
const exchange = new ccxt[exid]({
  enableRateLimit: true,
});

// Reusable function to fetch OHLCV data and return an Asset object
async function fetchOhlcvData(symbol, timeframe, limit) {
  try {
    if (!exchange.has["fetchOHLCV"]) {
      throw new Error(`${exid} does not support fetchOHLCV`);
    }
    const ohlcv = await exchange.fetchOHLCV(symbol, timeframe, undefined, limit);

    // Validate response
    if (!Array.isArray(ohlcv) || ohlcv.length === 0) {
      throw new Error("No OHLCV data returned from exchange");
    }
    for (let i = 0; i < ohlcv.length; i++) {
      if (!Array.isArray(ohlcv[i]) || ohlcv[i].length < 6) {
        throw new Error(`Malformed OHLCV row at index ${i}: expected 6 values`);
      }
    }

    return {
      dates: ohlcv.map((row) => new Date(row[0])),
      openings: ohlcv.map((row) => row[1]),
      highs: ohlcv.map((row) => row[2]),
      lows: ohlcv.map((row) => row[3]),
      closings: ohlcv.map((row) => row[4]),
      volumes: ohlcv.map((row) => row[5]),
    };
  } catch (error) {
    throw new Error(`Failed to fetch OHLCV data: ${error.message}`);
  }
}

module.exports = fetchOhlcvData;
