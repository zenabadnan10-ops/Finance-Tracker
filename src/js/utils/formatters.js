export const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).format(new Date(date));
};

export const formatAmount = (amount) => {

    return new Intl.NumberFormat("en-PK", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
};