const { z } = require("zod");
const {
  awesomeOscillator, chaikinOscillator, ichimokuCloud, percentagePriceOscillator,
  percentageVolumeOscillator, priceRateOfChange, relativeStrengthIndex,
  stochasticOscillator, williamsR,
} = require("indicatorts");
const fetchOhlcvData = require("../utils/fetchOhlcvData");

module.exports = (server) => {
  server.tool(
    "calculate_awesome_oscillator",
    "Calculate the Awesome Oscillator (AO) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      fastPeriod: z.number().int().min(1).max(500).default(5).describe("Fast period for AO"),
      slowPeriod: z.number().int().min(1).max(500).default(34).describe("Slow period for AO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, fastPeriod, slowPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = awesomeOscillator(asset.highs, asset.lows, { fastPeriod, slowPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_chaikin_oscillator",
    "Calculate the Chaikin Oscillator (CMO) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      fastPeriod: z.number().int().min(1).max(500).default(3).describe("Fast period for CMO"),
      slowPeriod: z.number().int().min(1).max(500).default(10).describe("Slow period for CMO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, fastPeriod, slowPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = chaikinOscillator(asset.highs, asset.lows, asset.closings, asset.volumes, { fastPeriod, slowPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_ichimoku_cloud",
    "Calculate the Ichimoku Cloud for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      conversionPeriod: z.number().int().min(1).max(500).default(9).describe("Conversion line period"),
      basePeriod: z.number().int().min(1).max(500).default(26).describe("Base line period"),
      spanPeriod: z.number().int().min(1).max(500).default(52).describe("Leading span period"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, conversionPeriod, basePeriod, spanPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = ichimokuCloud(asset.highs, asset.lows, asset.closings, { conversionPeriod, basePeriod, spanPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_percentage_price_oscillator",
    "Calculate the Percentage Price Oscillator (PPO) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      fastPeriod: z.number().int().min(1).max(500).default(12).describe("Fast period for PPO"),
      slowPeriod: z.number().int().min(1).max(500).default(26).describe("Slow period for PPO"),
      signalPeriod: z.number().int().min(1).max(500).default(9).describe("Signal period for PPO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, fastPeriod, slowPeriod, signalPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = percentagePriceOscillator(asset.closings, { fastPeriod, slowPeriod, signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_percentage_volume_oscillator",
    "Calculate the Percentage Volume Oscillator (PVO) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      fastPeriod: z.number().int().min(1).max(500).default(12).describe("Fast period for PVO"),
      slowPeriod: z.number().int().min(1).max(500).default(26).describe("Slow period for PVO"),
      signalPeriod: z.number().int().min(1).max(500).default(9).describe("Signal period for PVO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, fastPeriod, slowPeriod, signalPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = percentageVolumeOscillator(asset.volumes, { fastPeriod, slowPeriod, signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_price_rate_of_change",
    "Calculate the Price Rate of Change (ROC) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for ROC"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = priceRateOfChange(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_relative_strength_index",
    "Calculate the Relative Strength Index (RSI) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for RSI"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = relativeStrengthIndex(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_stochastic_oscillator",
    "Calculate the Stochastic Oscillator (STOCH) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for STOCH"),
      signalPeriod: z.number().int().min(1).max(500).default(3).describe("Signal period for STOCH"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, signalPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = stochasticOscillator(asset.highs, asset.lows, asset.closings, { period, signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_williams_r",
    "Calculate the Williams R (WILLR) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for WILLR"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = williamsR(asset.highs, asset.lows, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );
};