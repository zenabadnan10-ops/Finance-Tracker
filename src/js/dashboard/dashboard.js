import { states } from "../state/state";
import { renderRecentTransactions } from "./recent-transactions";
import { getFinancialSummary } from "./summary";

const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const viewTransactionsBtn = document.getElementById("view-transactions-btn");
const transactionsSection = document.getElementById("transactions");
const transactionsBtn = document.getElementById("transactions-btn");
const dashboardSections = document.getElementById("dashboard");
const dashboardBtn = document.getElementById("dashboard-btn");

export const renderDashboard = () => {

    // First Row
    const {balance, income, expense} = getFinancialSummary(states.transactions);

    console.log(balance);

    totalBalance.textContent = balance;
    totalIncome.textContent = income;
    totalExpense.textContent = expense;

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
};