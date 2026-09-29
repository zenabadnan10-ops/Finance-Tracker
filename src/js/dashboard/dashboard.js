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

export const renderDashboard = () => {

    // First Row
    const {balance, income, expense} = getFinancialSummary(states.transactions);

    totalBalance.textContent = balance;
    totalIncome.textContent = income;
    totalExpense.textContent = expense;

    // Second Row First Column
    renderDashboardSpendingChart(states.transactions);

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