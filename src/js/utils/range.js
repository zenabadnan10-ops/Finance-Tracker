const parseLocal = (str) => new Date(str + "T00:00:00");

const addMonths = (date, n) => {
    const year = date.getFullYear();
    const month = date.getMonth() + n;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return new Date(year, month, Math.min(date.getDate(), daysInMonth));
};

export const getPeriodRange = (period, anchorStr) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const anchor = anchorStr ? parseLocal(anchorStr) : today;

    if (period === "weekly") {
        const days = Math.round((today - anchor) / 86400000);
        const cycles = Math.max(0, Math.floor(days / 7));
        const y = anchor.getFullYear(), m = anchor.getMonth(), d = anchor.getDate();

        return {
            start: new Date(y, m, d + cycles * 7),
            end: new Date(y, m, d + cycles * 7 + 7)
        };
    }

    const unit = period === "yearly" ? 12 : 1;
    const monthsElapsed =
        (today.getFullYear() - anchor.getFullYear()) * 12 +
        (today.getMonth() - anchor.getMonth());

    let cycles = Math.floor(monthsElapsed / unit);
    if (addMonths(anchor, cycles * unit) > today) cycles--;
    cycles = Math.max(0, cycles);

    return {
        start: addMonths(anchor, cycles * unit),
        end: addMonths(anchor, (cycles + 1) * unit)
    };
};