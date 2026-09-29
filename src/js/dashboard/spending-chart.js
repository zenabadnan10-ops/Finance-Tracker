import { getAllTimeMonthlyTotals } from "../calculations/analyticsCalc";

let dashboardSpendingChart = null;

export const renderDashboardSpendingChart = (transactions) => {
    const buckets = getAllTimeMonthlyTotals(transactions);

    const canvas = document.getElementById('dashboard-spending-canvas');
    if (!canvas) return;

    if (dashboardSpendingChart) dashboardSpendingChart.destroy();

    dashboardSpendingChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: buckets.map(b => b.label),
            datasets: [
                { label: "Income", data: buckets.map(b => b.income), borderColor: "green", backgroundColor: "green", tension: 0.3 },
                { label: "Expense", data: buckets.map(b => b.expenses), borderColor: "red", backgroundColor: "red", tension: 0.3 },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
        }
    });
};