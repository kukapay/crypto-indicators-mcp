const { z } = require("zod");
const {
  chaikinMoneyFlowStrategy, easeOfMovementStrategy, forceIndexStrategy,
  moneyFlowIndexStrategy, negativeVolumeIndexStrategy, volumeWeightedAveragePriceStrategy,
} = require("indicatorts");
const fetchOhlcvData = require("../utils/fetchOhlcvData");

module.exports = (server) => {
  server.tool(
    "calculate_chaikin_money_flow_strategy",
    "Calculate the Chaikin Money Flow Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(20).describe("Period length for CMF"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = chaikinMoneyFlowStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_ease_of_movement_strategy",
    "Calculate the Ease of Movement Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for EMV"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = easeOfMovementStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_force_index_strategy",
    "Calculate the Force Index Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(13).describe("Period length for FI"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = forceIndexStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_money_flow_index_strategy",
    "Calculate the Money Flow Index Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for MFI"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = moneyFlowIndexStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_negative_volume_index_strategy",
    "Calculate the Negative Volume Index Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for NVI"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = negativeVolumeIndexStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_volume_weighted_average_price_strategy",
    "Calculate the VWAP Strategy for a given trading pair using Binance OHLCV data. Outputs: -1 (SELL), 0 (HOLD), 1 (BUY)",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for VWAP"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = volumeWeightedAveragePriceStrategy(asset, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );
};