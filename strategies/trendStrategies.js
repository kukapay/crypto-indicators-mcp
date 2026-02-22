const { z } = require("zod");
const {
  absolutePriceOscillatorStrategy, aroonStrategy, balanceOfPowerStrategy,
  chandeForecastOscillatorStrategy, kdjStrategy, macdStrategy, parabolicSarStrategy,
  typicalPriceStrategy, volumeWeightedMovingAverageStrategy, vortexStrategy,
} = require("indicatorts");
const fetchOhlcvData = require("../utils/fetchOhlcvData");

module.exports = (server) => {
  server.tool(
    "calculate_absolute_price_oscillator_strategy",
    "Calculate the Absolute Price Oscillator Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      fastPeriod: z.number().int().min(1).max(500).default(12).describe("Fast period for APO"),
      slowPeriod: z.number().int().min(1).max(500).default(26).describe("Slow period for APO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, fastPeriod, slowPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = absolutePriceOscillatorStrategy(asset, { fast: fastPeriod, slow: slowPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_aroon_strategy",
    "Calculate the Aroon Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for Aroon"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = aroonStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_balance_of_power_strategy",
    "Calculate the Balance of Power Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for BOP"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = balanceOfPowerStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_chande_forecast_oscillator_strategy",
    "Calculate the Chande Forecast Oscillator Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for CFO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = chandeForecastOscillatorStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_kdj_strategy",
    "Calculate the KDJ Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(9).describe("Period length for KDJ"),
      signalPeriod: z.number().int().min(1).max(500).default(3).describe("Signal period for KDJ"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, signalPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = kdjStrategy(asset, { period, signal: signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_macd_strategy",
    "Calculate the MACD Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      fastPeriod: z.number().int().min(1).max(500).default(12).describe("Fast period for MACD"),
      slowPeriod: z.number().int().min(1).max(500).default(26).describe("Slow period for MACD"),
      signalPeriod: z.number().int().min(1).max(500).default(9).describe("Signal period for MACD"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, fastPeriod, slowPeriod, signalPeriod, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = macdStrategy(asset, { fast: fastPeriod, slow: slowPeriod, signal: signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_parabolic_sar_strategy",
    "Calculate the Parabolic SAR Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      accelerationFactorStep: z.number().min(0.001).max(1).default(0.02).describe("Acceleration factor step for PSAR"),
      accelerationFactorMax: z.number().min(0.01).max(1).default(0.2).describe("Maximum acceleration factor for PSAR"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, accelerationFactorStep, accelerationFactorMax, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = parabolicSarStrategy(asset, { accelerationFactorStep, accelerationFactorMax });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_typical_price_strategy",
    "Calculate the Typical Price Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for Typical Price"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = typicalPriceStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_volume_weighted_moving_average_strategy",
    "Calculate the VWMA Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for VWMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = volumeWeightedMovingAverageStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_vortex_strategy",
    "Calculate the Vortex Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for Vortex"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = vortexStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );
};