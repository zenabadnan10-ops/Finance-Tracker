import { formatAmount } from "../utils/formatters";
import { formatDate } from "../utils/formatters";

const noTransactions = document.querySelector(".no-transactions");
const transactionList = document.getElementById("transactions-cards-section");
const categoryIcons = {
    food: "ti-tools-kitchen-2",
    salary: "ti-cash",
    transport: "ti-car",
    freelance: "ti-briefcase",
    entertainment: "ti-device-tv"
};

const getCategoryIcon = (category) => {
  return categoryIcons[category]
};

const createTransactionElement = (transaction) => {
    console.log("Creating card for:", transaction);

    const article = document.createElement("article");

    article.className = "transaction";
    article.dataset.id = transaction.id;

    const sign = transaction.type === "income" ? "+" : "-";
    const color = transaction.type === "income" ? "green" : "red";
    const backgroundColor = transaction.type === "income" ? "rgb(193, 255, 193)" : "rgb(255, 211, 211)";
    const isRecurring = transaction.recurring === "on";
    const categoryIcon = getCategoryIcon(transaction.category);

    const recurringIconHtml = isRecurring ? 
    `<span class="recurring-indicator">
        <i class="ti ti-repeat" aria-hidden="true"></i>
        <span class="sr-only">Recurring transaction</span>
     </span>
    ` : "";

    article.innerHTML = `
        <div class="transaction-left">
            <div class="category-icon" style="background-color: ${backgroundColor}">
                <i class="ti ${categoryIcon}" aria-hidden="true"></i>
            </div>
            <div class="transaction-text">
                <p class="transaction-name">
                    ${transaction.description}
                </p>
                <div class="transaction-meta">
                    <p class="transaction-category">
                        ${transaction.category} ·
                    </p>
                    <p class="transaction-date">
                        ${formatDate(transaction.date)}
                    </p>
                </div>
            </div>
        </div>
        <div class="transaction-right">
            <p class="transaction-amount" style="color: ${color};">
                ${sign} Rs. ${formatAmount(transaction.amount)}
            </p>
            <div class="transaction-icons">
                ${recurringIconHtml}
                <button type="button" class="edit-transaction-btn" aria-label="Edit transaction">
                    <i class="ti ti-edit" aria-hidden="true"></i>
                </button>
                <button type="button" class="delete-transaction-btn" aria-label="Delete transaction">
                    <i class="ti ti-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    `;

    return article;
};

export const renderTransactions = (transactions) => {
    transactionList.innerHTML = "";

    if(transactions.length === 0){
        noTransactions.style.display = "";
        transactionList.style.display = "none";
        return;
    }

    noTransactions.style.display = "none";
    transactionList.style.display = "flex";

    transactions.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction);
        transactionList.appendChild(transactionElement);
    });
};