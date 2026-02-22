const { z } = require("zod");
const {
  accelerationBandsStrategy, bollingerBandsStrategy, projectionOscillatorStrategy,
} = require("indicatorts");
const fetchOhlcvData = require("../utils/fetchOhlcvData");

module.exports = (server) => {
  server.tool(
    "calculate_acceleration_bands_strategy",
    "Calculate the Acceleration Bands Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(20).describe("Period length for AB"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = accelerationBandsStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_bollinger_bands_strategy",
    "Calculate the Bollinger Bands Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(20).describe("Period length for BB"),
      stdDev: z.number().min(0.1).max(10).default(2).describe("Standard deviation multiplier"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, stdDev, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = bollingerBandsStrategy(asset, { period, stdDev });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_projection_oscillator_strategy",
    "Calculate the Projection Oscillator Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for PO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = projectionOscillatorStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );
};