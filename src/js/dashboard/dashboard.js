import { states } from "../state/state";
import { renderRecentBudgets } from "./recent-budgets";
import { renderRecentTransactions } from "./recent-transactions";
import { renderDashboardSpendingChart } from "./spending-chart";
import { getFinancialSummary } from "./summary";

const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const viewTransactionsBtn = document.getElementById("view-transactions-btn");
const transactionsSection = document.getElementById("transactions");
const transactionsBtn = document.getElementById("transactions-btn");
const dashboardSections = document.getElementById("dashboard");
const dashboardBtn = document.getElementById("dashboard-btn");
const budgetsSection = document.getElementById("budgets")
const budgetsBtn = document.getElementById("budgets-btn");
const viewBudgetsBtn = document.getElementById("see-more-budgets");
const viewAnalyticsBtn = document.getElementById("see-more-analytics");
const analyticsSection = document.getElementById("analytics");
const analyticsBtn = document.getElementById("analytics-btn");

export const renderDashboard = () => {

    // First Row
    const {balance, income, expense} = getFinancialSummary(states.transactions);

    totalBalance.textContent = balance;
    totalIncome.textContent = income;
    totalExpense.textContent = expense;

    // Second Row
    renderDashboardSpendingChart(states.transactions);

    viewAnalyticsBtn.addEventListener("click", () => {
        dashboardSections.style.display = "none";
        analyticsSection.style.display = "";

        dashboardBtn.classList.remove("btn-active");
        dashboardBtn.removeAttribute("aria-current");

        analyticsBtn.classList.add("btn-active");
        analyticsBtn.setAttribute("aria-current", "page");
    });

    // Third Row First Column
    renderRecentTransactions();

    viewTransactionsBtn.addEventListener("click", () => {
        dashboardSections.style.display = "none";
        transactionsSection.style.display = "";

        dashboardBtn.classList.remove("btn-active");
        dashboardBtn.removeAttribute("aria-current");

        transactionsBtn.classList.add("btn-active");
        transactionsBtn.setAttribute("aria-current", "page");
    });

    // Third Row Second Column
    renderRecentBudgets();

    viewBudgetsBtn.addEventListener("click", () => {
        dashboardSections.style.display = "none";
        budgetsSection.style.display = "";

        dashboardBtn.classList.remove("btn-active");
        dashboardBtn.removeAttribute("aria-current");

        budgetsBtn.classList.add("btn-active");
        budgetsBtn.setAttribute("aria-current", "page");
    })
};