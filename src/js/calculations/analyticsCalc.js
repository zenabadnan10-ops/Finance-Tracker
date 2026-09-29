export const getTransactionsInRange = (transactions, rangeType) => {

    const { start, end } = getAnalyticsRange(rangeType);
    return transactions.filter(t => {
        const date = new Date(t.date + "T00:00:00");
        return date >= start && date < end;
    });
};

export const getAnalyticsRange = (rangeType) => {

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    if (rangeType === "week") {
        const weekday = today.getDay();
        return { start: new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekday), end };
    }
    if (rangeType === "month") {
        return { start: new Date(today.getFullYear(), today.getMonth(), 1), end };
    }
    if (rangeType === "year") {
        return { start: new Date(today.getFullYear(), 0, 1), end };
    }
    return { start: new Date(0), end };
};

export const getSpendingOverTime = (transactions, rangeType) => {

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let buckets = [];

    if (rangeType === "week") {
        const weekday = today.getDay();
        for (let i = weekday; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            buckets.push({ label: d.toLocaleDateString('default', { weekday: 'short' }), date: d, income: 0, expenses: 0 });
        }
    } else if (rangeType === "month") {
        const daysSoFar = today.getDate();
        for (let i = 1; i <= daysSoFar; i++) {
            const d = new Date(today.getFullYear(), today.getMonth(), i);
            buckets.push({ label: String(i), date: d, income: 0, expenses: 0 });
        }
    } else if (rangeType === "year") {
        for (let m = 0; m <= today.getMonth(); m++) {
            const d = new Date(today.getFullYear(), m, 1);
            buckets.push({ label: d.toLocaleString('default', { month: 'short' }), month: m, year: today.getFullYear(), income: 0, expenses: 0 });
        }
    } else {
        if (transactions.length === 0) return [];
        const earliest = transactions.reduce((min, t) => {
            const d = new Date(t.date + "T00:00:00");
            return d < min ? d : min;
        }, today);

        let cursor = new Date(earliest.getFullYear(), earliest.getMonth(), 1);
        while (cursor <= today) {
            buckets.push({
                label: cursor.toLocaleString('default', { month: 'short', year: '2-digit' }),
                month: cursor.getMonth(),
                year: cursor.getFullYear(),
                income: 0,
                expenses: 0,
            });
            cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
        }
    }

    transactions.forEach((t) => {
        const date = new Date(t.date + "T00:00:00");
        let bucket;

        if (rangeType === "week" || rangeType === "month") {
            bucket = buckets.find(b => b.date.getTime() === new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime());
        } else {
            bucket = buckets.find(b => b.month === date.getMonth() && b.year === date.getFullYear());
        }

        if (!bucket) return;
        if (t.type === "income") bucket.income += Number(t.amount);
        if (t.type === "expense") bucket.expenses += Number(t.amount);
    });

    return buckets;
};

export const getSavingsRate = (transactions) => {

    const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + Number(t.amount), 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);

    if (income === 0) return 0;

    return ((income - expenses) / income) * 100;
};

const getDayCount = (transactions, rangeType) => {

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (rangeType === "week") {
        return today.getDay() + 1; 
    }
    if (rangeType === "month") {
        return today.getDate();
    }
    if (rangeType === "year") {
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        return Math.floor((today - startOfYear) / 86400000) + 1;
    }

    if (transactions.length === 0) return 0;
    const earliest = transactions.reduce((min, t) => {
        const date = new Date(t.date + "T00:00:00");
        return date < min ? date : min;
    }, today);
    return Math.floor((today - earliest) / 86400000) + 1;
};

export const getDailySpending = (transactions, range) => {

    const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Number(t.amount), 0);
    const days = getDayCount(transactions, range);

    if (days <= 0 || expenses === 0) return 0;
    return expenses / days;
};

export const getSpendingByCategory = (transactions) => {

    const totals = {};

    transactions.filter(t => t.type === "expense").forEach(t => {
        totals[t.category] = (totals[t.category] || 0) + Number(t.amount);
    });

    const total = Object.values(totals).reduce((sum, v) => sum + v, 0);

    return Object.entries(totals)
        .map(([category, amount]) => ({
            category,
            amount,
            percent: total > 0 ? (amount / total) * 100 : 0,
        }))
        .sort((a, b) => b.amount - a.amount);
};

export const getMonthlyComparison = (transactions) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const totals = {
        thisMonth: { income: 0, expenses: 0 },
        lastMonth: { income: 0, expenses: 0 },
    };

    transactions.forEach((t) => {
        const date = new Date(t.date + "T00:00:00");
        const amount = Number(t.amount);

        let bucket = null;
        if (date.getFullYear() === thisYear && date.getMonth() === thisMonth) {
            bucket = totals.thisMonth;
        } else if (date.getFullYear() === lastMonthYear && date.getMonth() === lastMonth) {
            bucket = totals.lastMonth;
        }

        if (!bucket) return;

        if (t.type === "income") bucket.income += amount;
        if (t.type === "expense") bucket.expenses += amount;
    });

    return totals;
};