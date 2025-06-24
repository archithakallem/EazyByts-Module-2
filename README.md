# EazyByts-Module-2
Internship tasks for EazyByts Web Developer

# 📈 Stock Market Dashboard

## 🧩 Project Overview

This project is a **frontend-based Stock Market Dashboard** that allows users to:

- 📊 **Monitor real-time stock prices** (AAPL, GOOGL, MSFT)
- 💼 **Simulate trading actions** (Buy/Sell)
- 📁 **Manage a personal portfolio**
- 📉 **Visualize stock holdings** using interactive charts
- 🔔 **Receive real-time notifications** for transactions

The dashboard fetches **live market data** using the [Twelve Data API](https://twelvedata.com/), simulating a realistic trading experience.

---

## 💻 Technologies Used

| Layer        | Tech Stack                     |
|--------------|--------------------------------|
| Frontend     | HTML, CSS, JavaScript          |
| Visualization| Chart.js                       |
| API          | Twelve Data API                |
| Hosting      | Local using Live Server        |

> ⚠️ This is a **frontend-only prototype**. Backend integration using Node.js and MongoDB/MySQL will be implemented in future versions.

---

## 🧪 Features Implemented

- ✅ Real-time stock price fetching
- ✅ Buy/Sell stock simulation with quantity tracking
- ✅ Portfolio table with total investment and profit/loss calculation
- ✅ Interactive bar chart (via Chart.js) to visualize holdings
- ✅ Real-time toast-style notifications on transactions
- ✅ Responsive and user-friendly UI

---

## 🛠️ Future Enhancements

- 🔐 User login and authentication
- 🧠 Backend database using MongoDB or MySQL
- 💾 Save user portfolio to the cloud
- 📊 Historical stock charts (line/pie)
- 📱 Full mobile responsiveness
- 📈 Analytics and performance reporting tools

---

## 📸 Screenshot (Optional)

> Add a screenshot here if required:
> ![Screenshot](./assets/screenshot.png)

---

## 🧠 How to Run

1. Clone or download the project folder.
2. Open `index.html` with **Live Server** (recommended).
3. Click "Buy" or "Sell" to simulate trading.
4. Watch updates in the portfolio table and chart.
5. Check browser console for debugging/logs if needed.

---

## 🔗 API Key Setup

> This project uses Twelve Data's free API key.
> Get your own key from https://twelvedata.com/ and update:

```js
const API_KEY = "your_api_key_here";

