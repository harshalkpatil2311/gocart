# GoCart Backend

This backend is a separate Node/Express API for the GoCart marketplace frontend.

## Setup

1. Open a terminal in the `backend/` folder.
2. Run `npm install`.
3. Start the backend with `npm run dev`.

## Default configuration

- Port: `4000`
- CORS origin: `http://localhost:5173`
- Demo user email: `user@gocart.com`
- Demo user password: `123456`

## Available endpoints

- `GET /api/health`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/categories`

## Example login request

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@gocart.com","password":"123456"}'
```
