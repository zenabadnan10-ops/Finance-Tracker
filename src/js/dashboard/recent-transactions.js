import { states } from "../state/state";
import { createTransactionElement } from "../transactions/transactionUI"

const noRecentTransactions = document.getElementById("no-recent-transactions");
const transactionDiv = document.getElementById("transactions-div");

const getRecentTransactions = (transactions) => {
    const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
    return sorted.slice(0, 3);
};

export const renderRecentTransactions = () => {

    const recent = getRecentTransactions(states.transactions);

    transactionDiv.innerHTML = "";

    if(recent.length === 0){
        noRecentTransactions.style.display = "";
        transactionDiv.style.display = "none";
        return;
    }

    noRecentTransactions.style.display = "none";
    transactionDiv.style.display = "flex";

    recent.forEach(transaction => {
        const transactionElement = createTransactionElement(transaction, { showActions: false , showRecurring: false });
        transactionDiv.appendChild(transactionElement);
    });
};