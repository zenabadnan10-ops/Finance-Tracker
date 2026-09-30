# 📒 Ledger

**Ledger** is a browser-based personal finance tracker for managing your budget. Log income and expenses, set spending limits by category, and understand your habits through a dashboard, insights, and charts. All data is stored locally in your browser, so there is no account, backend, or setup beyond running the app.

> Amounts are displayed in Pakistani Rupees (Rs.).

---

## ✨ Features

### 📊 Dashboard
- At-a-glance **total balance**, **income**, and **expenses**
- **Spending Overview** chart of monthly income vs. expenses across the year
- Recent transactions and budget progress previews
- Automatic **insights** (positive, neutral, and negative) based on your transactions and budgets

### 💸 Transactions
- Add, edit, and delete income and expense transactions
- Fields: type, description, amount, category, date, and recurring flag
- **Search** by keyword
- **Quick filters**: All / Income / Expenses
- **Advanced filters**: category, preset date range (today, week, month, year), custom from/to dates, and recurring-only
- **Sort** by newest, oldest, highest, or lowest amount
- **Export** your data as **CSV** or **JSON**
- Live count and total for the currently shown transactions
- Form validation with confirmation before deleting

### 🎯 Budgets
- Set spending limits per category (Food, Transport, Entertainment) with a weekly, monthly, or yearly period
- Summary cards for **Total Budgeted**, **Total Spent**, and **Remaining**
- Filter budgets by status: All / On Track / Over Budget
- Budgets update automatically as you add, edit, or delete transactions

### 📈 Analytics
- Choose a range: This Week, This Month, This Year, or All Time
- **Savings rate** and **average daily spending**
- **Spending Over Time** chart
- **Spending by Category** chart
- **Monthly Comparison** (this month vs. last month)

### 💾 Storage
- Transactions and budgets persist in the browser via **localStorage**

---

## 🛠️ Tech Stack

| Purpose      | Tool                                                                 |
| ------------ | -------------------------------------------------------------------- |
| Language     | Vanilla JavaScript (ES modules), HTML5, CSS3                         |
| Build tool   | [Vite](https://vitejs.dev/)                                          |
| Charts       | [Chart.js](https://www.chartjs.org/)                                 |
| Icons        | [Tabler Icons](https://tabler.io/icons) (webfont) and custom SVGs    |
| Persistence  | Browser `localStorage`                                               |
| Code quality | [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/)   |

No frontend framework is used.

---

## 📁 Project Structure

```
Finance-Tracker/
├── public/                  # Static assets (logo, icons, SVGs)
├── src/
│   ├── css/                 # Stylesheets
│   └── js/
│       ├── app.js           # Entry point: init and event listeners
│       ├── analytics/       # Analytics cards and charts
│       ├── budgets/         # Budget logic, validation, and UI
│       ├── dashboard/       # Dashboard rendering and insights
│       ├── state/           # Shared application state
│       ├── storage/         # localStorage load/save helpers
│       ├── transactions/    # Transaction logic, filters, validation, export, UI
│       └── ui/              # Modals and section navigation
├── index.html               # App shell
├── eslint.config.mjs
├── .prettierrc
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
git clone https://github.com/zenabadnan10-ops/Finance-Tracker.git
cd Finance-Tracker
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

---

## 📜 Scripts

| Command                | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start the Vite development server       |
| `npm run build`        | Create a production build in `dist/`    |
| `npm run preview`      | Preview the production build locally    |
| `npm run format`       | Format the codebase with Prettier       |
| `npm run format:check` | Check formatting without changing files |

---

## 🌐 Deployment

Run `npm run build` and deploy the `dist/` folder to any static host such as Netlify, Vercel, or GitHub Pages.

---

## 🗺️ Roadmap

- [ ] Custom categories
- [ ] Multi-currency support
- [ ] Automatic generation of recurring transactions
- [ ] Dark mode
- [ ] Data import (CSV/JSON)

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Run `npm run format` before pushing
5. Open a Pull Request

---

## 📄 License

Add a `LICENSE` file (e.g. MIT) to specify how others may use this project.

---

## 👤 Author

Built by [@zenabadnan10-ops](https://github.com/zenabadnan10-ops)