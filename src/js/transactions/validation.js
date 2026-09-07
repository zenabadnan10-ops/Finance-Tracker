export const validateForm = (data) => {
    const errors = {};

    if(data.description.trim().length > 100) {
        errors.description = "Description must be 100 characters or less."
    }

    const inputDate = new Date(data.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if(inputDate > today) {
        errors.date = "Date must be in the past";
    }

    return {
        isValid: Object.keys(errors).length === 0, errors
    }
}