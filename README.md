# SJSU Parking — Premium

Small demo app showing SJSU parking garage fullness levels.

This repository contains a Vite + React frontend in `src/` and a small FastAPI backend in `api/` that scrapes and serves garage levels at the `/api/garage-levels` endpoint.

## Quick start (development)

- Start the Python backend (runs on port 8000):

```bash
cd api
python server.py
# or: uvicorn server:app --reload --port 8000
```

- Start the frontend dev server (Vite):

```bash
# from project root
npm install
npm run dev
```

By default the frontend will fetch `http://localhost:8000/api/garage-levels` while in development and `/api/garage-levels` in production.

## What you'll see

- The React app displays a simple list of garages with their `name` and `fullness` values returned by the backend.

## Notes

- The backend scrapes data with `requests` and `BeautifulSoup` (see `api/main.py`).
- CORS is enabled for the Vite dev server origin in `api/server.py`.
- If you'd rather proxy requests through Vite instead of using the hard-coded dev host, add a proxy entry in `vite.config.js` and I can update the frontend fetch accordingly.

## Files of interest

- `src/` — React app
- `api/server.py` — FastAPI app exposing `/api/garage-levels`
- `api/main.py` — scraper that builds the JSON response

## License

Unlicensed demo code.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
 