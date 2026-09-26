import { states } from "../state/state";
import { getFinancialSummary } from "./summary";

const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");

export const renderDashboard = () => {

    const {balance, income, expense} = getFinancialSummary(states.transactions);

    console.log(balance);

    totalBalance.textContent = balance;
    totalIncome.textContent = income;
    totalExpense.textContent = expense;
};