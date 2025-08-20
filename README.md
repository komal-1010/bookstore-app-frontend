📚 Bookstore Frontend

React SPA for browsing books, managing cart, checkout with Stripe, and simple admin portal.

⚡ Features

User login/signup (JWT auth)

Browse products & view details

Cart (add/update/remove)

Checkout with Stripe

Order confirmation page

Admin portal (manage products & orders)

🚀 Quick Start
git clone https://github.com/komal-1010/bookstore-frontend.git
cd bookstore-frontend
npm install


Create .env (CRA or Vite):

REACT_APP_API_BASE=http://localhost:8000
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_xxx
REACT_APP_SITE_URL=http://localhost:3000


Run locally:

npm start   # CRA
npm run dev # Vite


App → http://localhost:3000
Docker Run
docker build -t bookstore-frontend .
docker run -p 3000:80 --env-file .env bookstore-frontend
