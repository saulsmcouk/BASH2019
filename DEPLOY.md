# Deploy Instructions

## Prerequisites

- [Node.js](https://nodejs.org/) 20 LTS
- API keys for all external services (see `.env.example`)

---

## Local deployment

```bash
git clone https://github.com/saulsmcouk/BASH2019.git
cd BASH2019
npm install
cp .env.example .env   # then edit .env with your real keys
npm start
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Railway / Render / Fly.io (recommended)

These platforms support Node.js apps and let you set environment variables via their dashboard.

1. Create an account and connect your GitHub repository.
2. Set the following environment variables in the platform dashboard:
   - `MAPBOX_TOKEN`
   - `THEYWORKFORYOU_KEY`
   - `COMPANIES_HOUSE_KEY`
   - `PORT` (usually set automatically by the platform)
3. Set the **start command** to `npm start` (or `node server.js`).
4. Deploy – the platform will run `npm install` and then `npm start` automatically.

---

## Deploy to Heroku

```bash
# Install Heroku CLI, then:
heroku create your-app-name

heroku config:set MAPBOX_TOKEN=your_token
heroku config:set THEYWORKFORYOU_KEY=your_key
heroku config:set COMPANIES_HOUSE_KEY=your_key

git push heroku main
heroku open
```

---

## Deploy with Docker

Create a `.env` file with your API keys, then:

```bash
# Build image
docker build -t who-paid-the-piper .

# Run container (reads .env file)
docker run --env-file .env -p 3000:3000 who-paid-the-piper
```

> A `Dockerfile` is not included in this repo. A minimal example:
>
> ```dockerfile
> FROM node:20-alpine
> WORKDIR /app
> COPY package*.json ./
> RUN npm ci --omit=dev
> COPY . .
> EXPOSE 3000
> CMD ["node", "server.js"]
> ```

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Port the server listens on (default: `3000`) |
| `MAPBOX_TOKEN` | Yes | Mapbox public token for the heatmap |
| `THEYWORKFORYOU_KEY` | Yes | TheyWorkForYou API key for MP voting data |
| `COMPANIES_HOUSE_KEY` | Yes | Companies House API key for donor SIC codes |

---

## Notes

- API keys are **never** stored in source code; they are loaded from environment variables at runtime.
- The `PORT` environment variable is respected so the app works correctly behind reverse proxies and on PaaS platforms.
