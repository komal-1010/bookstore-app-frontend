
### 🧭 Overview

React SPA that consumes the Bookstore API. Handles browsing, cart, checkout, Stripe Checkout redirect, and order confirmation.

### 🧱 Tech Stack

* React 18
* React Router
* Axios
* Stripe.js (`@stripe/stripe-js`)
* (CSS or Tailwind, depending on your setup)

### ✅ Features

* Product list & detail
* Cart UI (add/update/remove)
* Checkout form (shipping address)
* Stripe Checkout redirect
* Order Confirmation page `/order-confirmation/:id`
* Auth: Login/Signup forms
* Admin views: basic product/order management

---

## 🚀 Quick Start (Local)

### 1) Clone & enter

```bash
git clone <your-frontend-repo-url> frontend
cd frontend
```

### 2) Install deps

```bash
npm install
# or
yarn
```

### 3) Create `.env`

Create `.env` in project root:

For **Create React App**:

```env
REACT_APP_API_BASE=http://localhost:8000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxx
```

For **Vite** (if you used it):

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
```

> Update your Axios base URL to use the env value instead of a hard-coded URL.

### 4) Start app

```bash
npm start       # CRA
# or
npm run dev     # Vite
```

App runs at `http://localhost:3000` by default.

---

## 🔗 API Client (Axios)

Ensure you include the JWT token in each request:

```js
const token = localStorage.getItem('access_token');
const authHeader = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
```

Base URL should come from env (`REACT_APP_API_BASE` or `VITE_API_BASE_URL`).

---

## 🧭 Routing

* `/` – Product list
* `/product/:id` – Product detail
* `/cart` – Cart
* `/checkout` – Checkout (creates order → Stripe checkout)
* `/order-confirmation/:id` – Confirmation after Stripe success redirect
* `/login`, `/signup`
* `/admin/*` – Basic admin views

---

## 💳 Payment Flow (Frontend)

1. User fills **shipping address** on `/checkout`.
2. Frontend calls `POST /api/store/orders/` → gets `orderId` (status: `pending`).
3. Frontend calls `POST /api/payments/create-checkout-session/{orderId}/` → receives `{ id }`.
4. Frontend runs `stripe.redirectToCheckout({ sessionId: id })`.
5. Stripe collects payment, then redirects to:
   `${REACT_APP_SITE_URL}/order-confirmation/${orderId}?session_id={CHECKOUT_SESSION_ID}`
6. Backend webhook sets **Payment: paid** and **Order: placed**.
7. Confirmation page fetches `/api/store/orders/{orderId}/` and displays details.

---

## 🔧 Environment Variables (Frontend)

Put these in `.env`:

* `REACT_APP_API_BASE` or `VITE_API_BASE_URL` – your backend URL
* `REACT_APP_STRIPE_PUBLIC_KEY` or `VITE_STRIPE_PUBLIC_KEY` – Stripe publishable key
* (Optionally) `REACT_APP_SITE_URL` – your deployed frontend URL used in docs or config

> Ensure the backend has `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` including this site.

---

## 🐳 Docker (Frontend)

If your repo includes a Dockerfile:

```bash
docker build -t bookstore-frontend .
docker run -p 3000:3000 --env-file .env bookstore-frontend
```

Or use a `docker-compose.yml` that builds & serves the app.

---

## 🔐 Auth UX

* On successful login, store `access_token` (and optionally `refresh_token`) in `localStorage`.
* Attach `Authorization: Bearer <access_token>` on every request.
* When token expires, use refresh token or redirect to `/login`.

---

## 🧪 Quick Manual Test Plan

1. **Register** a user and **Login**; open DevTools → Storage → confirm `access_token` exists.
2. View **Products**, open a **Product detail**.
3. **Add to cart**, go to **Cart**, update quantities.
4. **Checkout** → completes order creation → Stripe checkout opens.
5. Use Stripe test card `4242 4242 4242 4242` (MM/YY future, CVC any, ZIP any).
6. After success, Stripe redirects to **Order Confirmation**; status becomes `placed` after webhook.

---

## 🩺 Frontend Troubleshooting

* **CORS error**: Add the frontend URL to backend `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS`.
* **401 Unauthorized**: Ensure `Authorization` header is sent; token present after login.
* **Not redirected to confirmation**: Check Django session creation uses `success_url` with `/order-confirmation/{orderId}`; ensure `FRONTEND_URL` is set correctly on backend.
* **Order status not updating**: Confirm Stripe webhook is configured & reachable; watch backend logs during `stripe listen`.

---

## 📦 Repo Structure Tips (Frontend)

```
src/
  api/
    auth.js
    products.js
    cart.js
    orders.js
    payment.js
  components/
  pages/
    Home.jsx
    ProductDetail.jsx
    Cart.jsx
    Checkout.jsx
    OrderConfirmation.jsx
    Login.jsx
    Signup.jsx
    Admin/
  App.jsx
  main.jsx / index.jsx
