import { formatDate } from "../utils/formatters";

const downloadFile = (content, fileName, mimeType) => {

    const blob = new Blob([content], {type: mimeType});
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
};

const escapeCSVField = (value) => {

    const stringValue = String(value ?? "");
    if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

export const exportCSV = (transactions) => {

    const headers = ["Date", "Description", "Category", "Amount", "Type", "Recurring"];

    const rows = transactions.map(transaction => [
        `="${transaction.date}"`,
        transaction.description,
        transaction.category,
        transaction.amount,
        transaction.type,
        transaction.recurring === "on" ? "Yes" : "No"
    ]);

    const csvContent = [headers, ...rows].map(row => row.map(escapeCSVField).join(",")).join("\n");

    downloadFile(csvContent, `transactions-${Date.now()}.csv`, "text/csv");
};

export const exportJSON = (transactions) => {

    const content = JSON.stringify(transactions, null, 2);
    downloadFile(content, `transactions-${Date.now()}.json`, "application/json");
};