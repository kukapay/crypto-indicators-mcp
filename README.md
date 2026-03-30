# Crypto Indicators MCP Server

An MCP server providing a range of cryptocurrency technical analysis indicators and strategies, empowering AI trading agents to efficiently analyze market trends and develop robust quantitative strategies.

For more crypto-related MCP servers, see the [Kukapay MCP servers](https://github.com/kukapay/kukapay-mcp-servers).

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
![Status](https://img.shields.io/badge/status-active-brightgreen.svg)

## Features

- **Technical Indicators**: 50+ indicators across trend, momentum, volatility, and volume categories.
- **Trading Strategies**: Corresponding strategies outputting signals: `-1` (SELL), `0` (HOLD), `1` (BUY).
- **Flexible Data Source**: Defaults to Binance, configurable to any `ccxt`-supported exchange.
- **Modular Design**: Indicators and strategies are categorized for easy maintenance.

## Hosted deployment

A hosted deployment is available on [Fronteir AI](https://fronteir.ai/mcp/kukapay-crypto-indicators-mcp).

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or higher)
- npm (v8.x or higher)

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kukapay/crypto-indicators-mcp.git
   cd crypto-indicators-mcp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure MCP Client**:
   To use this server with an MCP client like Claude Desktop, add the following to your config file (or equivalent):
   ```json
    {
      "mcpServers": {
        "crypto-indicators-mcp": {
          "command": "node",
          "args": ["path/to/crypto-indicators-mcp/index.js"],
          "env": {
            "EXCHANGE_NAME": "binance"
          }
        }
      }
    }   
    ```

## Available Tools

### Trend Indicators
- `calculate_absolute_price_oscillator`: Measures the difference between two EMAs to identify trend strength (APO).
- `calculate_aroon`: Identifies trend changes and strength using high/low price extremes (Aroon).
- `calculate_balance_of_power`: Gauges buying vs. selling pressure based on price movement (BOP).
- `calculate_chande_forecast_oscillator`: Predicts future price movements relative to past trends (CFO).
- `calculate_commodity_channel_index`: Detects overbought/oversold conditions and trend reversals (CCI).
- `calculate_double_exponential_moving_average`: Smooths price data with reduced lag for trend detection (DEMA).
- `calculate_exponential_moving_average`: Weights recent prices more heavily for trend analysis (EMA).
- `calculate_mass_index`: Identifies potential reversals by measuring range expansion (MI).
- `calculate_moving_average_convergence_divergence`: Tracks momentum and trend direction via EMA differences (MACD).
- `calculate_moving_max`: Computes the maximum price over a rolling period (MMAX).
- `calculate_moving_min`: Computes the minimum price over a rolling period (MMIN).
- `calculate_moving_sum`: Calculates the sum of prices over a rolling period (MSUM).
- `calculate_parabolic_sar`: Provides stop-and-reverse points for trend following (PSAR).
- `calculate_qstick`: Measures buying/selling pressure based on open-close differences (Qstick).
- `calculate_kdj`: Combines stochastic and momentum signals for trend analysis (KDJ).
- `calculate_rolling_moving_average`: Applies a rolling EMA for smoother trend tracking (RMA).
- `calculate_simple_moving_average`: Averages prices over a period to identify trends (SMA).
- `calculate_since_change`: Tracks the time since the last significant price change.
- `calculate_triple_exponential_moving_average`: Reduces lag further than DEMA for trend clarity (TEMA).
- `calculate_triangular_moving_average`: Weights middle prices more for smoother trends (TRIMA).
- `calculate_triple_exponential_average`: Measures momentum with triple smoothing (TRIX).
- `calculate_typical_price`: Averages high, low, and close prices for a balanced trend view.
- `calculate_volume_weighted_moving_average`: Incorporates volume into moving averages for trend strength (VWMA).
- `calculate_vortex`: Identifies trend direction and strength using true range (Vortex).

### Momentum Indicators
- `calculate_awesome_oscillator`: Measures market momentum using midline crossovers (AO).
- `calculate_chaikin_oscillator`: Tracks accumulation/distribution momentum (CMO).
- `calculate_ichimoku_cloud`: Provides a comprehensive view of support, resistance, and momentum (Ichimoku).
- `calculate_percentage_price_oscillator`: Normalizes MACD as a percentage for momentum (PPO).
- `calculate_percentage_volume_oscillator`: Measures volume momentum via EMA differences (PVO).
- `calculate_price_rate_of_change`: Tracks price momentum as a percentage change (ROC).
- `calculate_relative_strength_index`: Identifies overbought/oversold conditions via momentum (RSI).
- `calculate_stochastic_oscillator`: Compares closing prices to ranges for momentum signals (STOCH).
- `calculate_williams_r`: Measures momentum relative to recent high-low ranges (Williams %R).

### Volatility Indicators
- `calculate_acceleration_bands`: Frames price action with dynamic volatility bands (AB).
- `calculate_average_true_range`: Measures market volatility based on price ranges (ATR).
- `calculate_bollinger_bands`: Encloses price action with volatility-based bands (BB).
- `calculate_bollinger_bands_width`: Quantifies volatility via band width changes (BBW).
- `calculate_chandelier_exit`: Sets trailing stop-losses based on volatility (CE).
- `calculate_donchian_channel`: Tracks volatility with high/low price channels (DC).
- `calculate_keltner_channel`: Combines ATR and EMA for volatility bands (KC).
- `calculate_moving_standard_deviation`: Measures price deviation for volatility (MSTD).
- `calculate_projection_oscillator`: Assesses volatility relative to projected prices (PO).
- `calculate_true_range`: Calculates daily price range for volatility analysis (TR).
- `calculate_ulcer_index`: Quantifies downside volatility and drawdowns (UI).

### Volume Indicators
- `calculate_accumulation_distribution`: Tracks volume flow to confirm price trends (AD).
- `calculate_chaikin_money_flow`: Measures buying/selling pressure with volume (CMF).
- `calculate_ease_of_movement`: Assesses how easily prices move with volume (EMV).
- `calculate_force_index`: Combines price and volume for momentum strength (FI).
- `calculate_money_flow_index`: Identifies overbought/oversold via price-volume (MFI).
- `calculate_negative_volume_index`: Tracks price changes on lower volume days (NVI).
- `calculate_on_balance_volume`: Accumulates volume to predict price movements (OBV).
- `calculate_volume_price_trend`: Combines volume and price for trend confirmation (VPT).
- `calculate_volume_weighted_average_price`: Averages prices weighted by volume (VWAP).

### Trend Strategies
- `calculate_absolute_price_oscillator_strategy`: Generates buy/sell signals from APO crossovers (APO Strategy).
- `calculate_aroon_strategy`: Signals trend reversals using Aroon crossovers (Aroon Strategy).
- `calculate_balance_of_power_strategy`: Issues signals based on BOP thresholds (BOP Strategy).
- `calculate_chande_forecast_oscillator_strategy`: Predicts reversals with CFO signals (CFO Strategy).
- `calculate_kdj_strategy`: Combines KDJ lines for trend-based signals (KDJ Strategy).
- `calculate_macd_strategy`: Uses MACD crossovers for trading signals (MACD Strategy).
- `calculate_parabolic_sar_strategy`: Signals trend direction with PSAR shifts (PSAR Strategy).
- `calculate_typical_price_strategy`: Generates signals from typical price trends.
- `calculate_volume_weighted_moving_average_strategy`: Issues signals based on VWMA crossovers (VWMA Strategy).
- `calculate_vortex_strategy`: Signals trend direction with Vortex crossovers (Vortex Strategy).

### Momentum Strategies
- `calculate_momentum_strategy`: Issues signals based on momentum direction.
- `calculate_awesome_oscillator_strategy`: Signals momentum shifts with AO crossovers (AO Strategy).
- `calculate_ichimoku_cloud_strategy`: Generates signals from Ichimoku cloud positions (Ichimoku Strategy).
- `calculate_rsi2_strategy`: Signals overbought/oversold with RSI thresholds (RSI Strategy).
- `calculate_stochastic_oscillator_strategy`: Uses stochastic crossovers for signals (STOCH Strategy).
- `calculate_williams_r_strategy`: Signals momentum reversals with Williams %R (Williams %R Strategy).

### Volatility Strategies
- `calculate_acceleration_bands_strategy`: Signals breakouts with acceleration bands (AB Strategy).
- `calculate_bollinger_bands_strategy`: Issues signals from Bollinger Band breaches (BB Strategy).
- `calculate_projection_oscillator_strategy`: Signals volatility shifts with PO (PO Strategy).

### Volume Strategies
- `calculate_chaikin_money_flow_strategy`: Signals volume pressure with CMF (CMF Strategy).
- `calculate_ease_of_movement_strategy`: Issues signals based on EMV trends (EMV Strategy).
- `calculate_force_index_strategy`: Signals momentum with force index shifts (FI Strategy).
- `calculate_money_flow_index_strategy`: Signals overbought/oversold with MFI (MFI Strategy).
- `calculate_negative_volume_index_strategy`: Signals trends with NVI changes (NVI Strategy).
- `calculate_volume_weighted_average_price_strategy`: Issues signals from VWAP crossovers (VWAP Strategy).

## Usage Examples

### Example 1: Calculate MACD Indicator

**Input (Natural Language Prompt)**:
```
Calculate the MACD for BTC/USDT on a 1-hour timeframe with fast period 12, slow period 26, signal period 9, and fetch 100 data points.
```

**Output**:
```
{"macd": [...], "signal": [...], "histogram": [...]}
```

### Example 2: Calculate RSI Strategy

**Input (Natural Language Prompt)**:
```
Give me the RSI strategy signals for ETH/USDT on a 4-hour timeframe with a period of 14 and 50 data points.
```

**Output**:
```
[-1, 0, 1, 0, ...]
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

