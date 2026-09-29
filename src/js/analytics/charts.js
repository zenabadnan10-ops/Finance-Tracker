/* eslint-disable no-undef */
import { getSpendingByCategory, getSpendingOverTime, getMonthlyComparison } from "../calculations/analyticsCalc";

let spendingOverTimeChart = null;
let categoryChart = null;
let monthlyComparisonChart = null;

const CATEGORY_COLORS = {
    food: '#2e7d32',
    transport: '#1565c0',
    entertainment: '#e65100',
};

export const renderSpendingOverTimeChart = (transactions, range) => {

    const buckets = getSpendingOverTime(transactions, range);

    const canvas = document.getElementById('spending-over-time-canvas');

    if (spendingOverTimeChart) spendingOverTimeChart.destroy();

    spendingOverTimeChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: buckets.map(b => b.label),
            datasets: [
                {
                    label: "Income",
                    data: buckets.map(b => b.income),
                    borderColor: "green",
                    backgroundColor: "green",
                    tension: 0.3
                },
                {
                    label: "Expense",
                    data: buckets.map(b => b.expenses),
                    borderColor: "red",
                    backgroundColor: "red",
                    tension: 0.3
                }
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

export const renderCategoryChart = (transactions) => {

    console.log('transactions going into category chart:', transactions);
    const categories = getSpendingByCategory(transactions);
    console.log('grouped categories:', categories);

    const canvas = document.getElementById('spending-by-category-canvas');

    if (categoryChart) categoryChart.destroy();

    categoryChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: categories.map(c => c.category),
            datasets: [{
                data: categories.map(c => c.amount),
                backgroundColor: categories.map(c => CATEGORY_COLORS[c.category] || 'gray'),
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' },
            },
        },
    });
};

export const renderMonthlyComparisonChart = (transactions) => {
    const { thisMonth, lastMonth } = getMonthlyComparison(transactions);

    const canvas = document.getElementById('monthly-comparison-canvas');

    if (monthlyComparisonChart) monthlyComparisonChart.destroy();

    monthlyComparisonChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['Last Month', 'This Month'],
            datasets: [
                {
                    label: 'Income',
                    data: [lastMonth.income, thisMonth.income],
                    backgroundColor: 'green',
                },
                {
                    label: 'Expenses',
                    data: [lastMonth.expenses, thisMonth.expenses],
                    backgroundColor: 'red',
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } },
        },
    });
};