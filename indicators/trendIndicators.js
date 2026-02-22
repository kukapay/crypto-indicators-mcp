const { z } = require("zod");
const {
  absolutePriceOscillator, aroon, balanceOfPower, chandeForecastOscillator,
  commodityChannelIndex, doubleExponentialMovingAverage, exponentialMovingAverage,
  massIndex, movingAverageConvergenceDivergence, movingMax, movingMin, movingSum,
  parabolicSar, qstick, kdj, rollingMovingAverage, simpleMovingAverage, sinceChange,
  tripleExponentialMovingAverage, triangularMovingAverage, tripleExponentialAverage,
  typicalPrice, volumeWeightedMovingAverage, vortex,
} = require("indicatorts");
const fetchOhlcvData = require("../utils/fetchOhlcvData");

module.exports = (server) => {
  server.tool(
    "calculate_absolute_price_oscillator",
    "Calculate the Absolute Price Oscillator (APO) for a given trading pair using Binance OHLCV data",
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
        const result = absolutePriceOscillator(asset.closings, { fastPeriod, slowPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_aroon",
    "Calculate the Aroon Indicator for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for Aroon"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = aroon(asset.highs, asset.lows, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_balance_of_power",
    "Calculate the Balance of Power (BOP) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = balanceOfPower(asset.openings, asset.highs, asset.lows, asset.closings);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_chande_forecast_oscillator",
    "Calculate the Chande Forecast Oscillator (CFO) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for CFO"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = chandeForecastOscillator(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_commodity_channel_index",
    "Calculate the Commodity Channel Index (CCI) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(20).describe("Period length for CCI"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = commodityChannelIndex(asset.highs, asset.lows, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_double_exponential_moving_average",
    "Calculate the Double Exponential Moving Average (DEMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for DEMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = doubleExponentialMovingAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_exponential_moving_average",
    "Calculate the Exponential Moving Average (EMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for EMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = exponentialMovingAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_mass_index",
    "Calculate the Mass Index (MI) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(25).describe("Period length for MI"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = massIndex(asset.highs, asset.lows, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_moving_average_convergence_divergence",
    "Calculate the MACD for a given trading pair using Binance OHLCV data",
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
        const result = movingAverageConvergenceDivergence(asset.closings, { fastPeriod, slowPeriod, signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_moving_max",
    "Calculate the Moving Max (MMAX) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for MMAX"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = movingMax(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_moving_min",
    "Calculate the Moving Min (MMIN) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for MMIN"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = movingMin(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_moving_sum",
    "Calculate the Moving Sum (MSUM) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for MSUM"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = movingSum(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_parabolic_sar",
    "Calculate the Parabolic SAR (PSAR) for a given trading pair using Binance OHLCV data",
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
        const result = parabolicSar(asset.highs, asset.lows, { accelerationFactorStep, accelerationFactorMax });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_qstick",
    "Calculate the Qstick Indicator for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for Qstick"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = qstick(asset.openings, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_kdj",
    "Calculate the Random Index (KDJ) for a given trading pair using Binance OHLCV data",
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
        const result = kdj(asset.highs, asset.lows, asset.closings, { period, signalPeriod });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_rolling_moving_average",
    "Calculate the Rolling Moving Average (RMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for RMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = rollingMovingAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_simple_moving_average",
    "Calculate the Simple Moving Average (SMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for SMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = simpleMovingAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_since_change",
    "Calculate the Since Change for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = sinceChange(asset.closings);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_triple_exponential_moving_average",
    "Calculate the Triple Exponential Moving Average (TEMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for TEMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = tripleExponentialMovingAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_triangular_moving_average",
    "Calculate the Triangular Moving Average (TRIMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(10).describe("Period length for TRIMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = triangularMovingAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_triple_exponential_average",
    "Calculate the Triple Exponential Average (TRIX) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(15).describe("Period length for TRIX"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = tripleExponentialAverage(asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_typical_price",
    "Calculate the Typical Price for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = typicalPrice(asset.highs, asset.lows, asset.closings);
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_volume_weighted_moving_average",
    "Calculate the Volume Weighted Moving Average (VWMA) for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for VWMA"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = volumeWeightedMovingAverage(asset.closings, asset.volumes, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );

  server.tool(
    "calculate_vortex",
    "Calculate the Vortex Indicator for a given trading pair using Binance OHLCV data",
    {
      symbol: z.string().regex(/^[A-Z0-9]{1,10}\/[A-Z0-9]{1,10}$/, "Invalid symbol (e.g., BTC/USDT)").describe("Trading pair, e.g., 'BTC/USDT'"),
      timeframe: z.enum(["1m","3m","5m","15m","30m","1h","2h","4h","6h","12h","1d","1w","1M"]).default("1h").describe("Timeframe"),
      period: z.number().int().min(1).max(500).default(14).describe("Period length for Vortex"),
      limit: z.number().int().min(1).max(10000).default(100).describe("Number of OHLCV data points to fetch"),
    },
    async ({ symbol, timeframe, period, limit }) => {
      try {
        const asset = await fetchOhlcvData(symbol, timeframe, limit);
        const result = vortex(asset.highs, asset.lows, asset.closings, { period });
        return { content: [{ type: "text", text: JSON.stringify(result) }] };
      } catch (error) {
        return { content: [{ type: "text", text: `Error: ${error.message}` }] };
      }
    }
  );
};