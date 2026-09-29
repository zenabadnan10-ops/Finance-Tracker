import { getDailySpending, getSavingsRate, getTransactionsInRange } from "../calculations/analyticsCalc";
import { states } from "../state/state"
import { renderCategoryChart, renderMonthlyComparisonChart, renderSpendingOverTimeChart } from "./charts";

export const renderAnalyticsCards = () => {

    const {analyticsRange} = states.ui;
    
    const rangeTransaction = getTransactionsInRange(states.transactions, analyticsRange);

    const rate = getSavingsRate(rangeTransaction).toFixed(1);
    
    document.getElementById("analytics-savings-rate").textContent = rate;
    document.getElementById("analytics-daily-average").textContent = getDailySpending(rangeTransaction, analyticsRange).toFixed(0);

    renderSpendingOverTimeChart(states.transactions, states.ui.analyticsRange);
    renderCategoryChart(rangeTransaction);
    renderMonthlyComparisonChart(states.transactions);
};