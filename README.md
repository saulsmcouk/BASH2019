# Who Paid the Piper

Originally written for the BASH Festival of Code 2019, updated in 2026 to bring dependencies current and secure API key handling.

This app visualises data from the [Electoral Commission](https://www.electoralcommission.org.uk/) to create interactive maps showing who donated to which political parties and where, as well as allowing users to view the flows of money from type of source through to category of spending by each political party. It also shows MP voting records via [TheyWorkForYou](https://www.theyworkforyou.com/).

## Features

- **Heatmap** – Geographic concentration of political donations across the UK
- **Sankey diagram** – Money flows from donor type through to spending category
- **Pie charts** – Spending and donation breakdowns by party
- **MP Votes** – Voting records for individual MPs

## Quick start

### Prerequisites

- [Node.js](https://nodejs.org/) 20 LTS (see `.nvmrc`)
- API keys for the external services listed in `.env.example`

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file and fill in API keys
cp .env.example .env

# 3. Start the server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development (auto-restart on file changes)

```bash
npm run dev
```

## Environment variables

All API keys are read from a `.env` file in the project root. Copy `.env.example` to `.env` and populate the values:

| Variable | Description |
|---|---|
| `PORT` | Port for the server (default: `3000`) |
| `MAPBOX_TOKEN` | Mapbox public token – [get one here](https://account.mapbox.com/) |
| `THEYWORKFORYOU_KEY` | TheyWorkForYou API key – [request one here](https://www.theyworkforyou.com/api/key) |
| `COMPANIES_HOUSE_KEY` | Companies House API key – [get one here](https://developer.company-information.service.gov.uk/) |

> **Never commit `.env` or any real API keys to version control.**

## Deployment

See [DEPLOY.md](DEPLOY.md) for step-by-step deployment instructions for common platforms.

## License

ISC
