export const validateBudgetForm = (data) => {
    const errors = {};

    if(!data.category || data.category.trim().length === 0) {
        errors.category = "Please select a category.";
    }

    const limit = Number(data.limit);

    if(!data.limit || isNaN(limit)) {
        errors.limit = "Limit is required.";
    } else if(limit <= 0) {
        errors.limit = "Limit must be greater than 0.";
    }

    const validPeriods = ["weekly", "monthly", "yearly"];

    if(!data.period || !validPeriods.includes(data.period)) {
        errors.period = "Please select a valid period.";
    }

    return {
        isValid: Object.keys(errors).length === 0, errors
    }
}