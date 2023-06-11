export const userAnalitic = (operations, categories, accounts) => {
    const finalIncome = operations.reduce((ac, curVal) => {
        if (curVal.type === "income") {
            ac += curVal.summa;
        }
        return ac;
    }, 0);

    const finalExpenditure = operations.reduce((ac, curVal) => {
        if (curVal.type === "expenditure") {
            ac += curVal.summa;
        }
        return ac;
    }, 0);

    const finalCategories = categories.reduce((ac, curVal) => {
        if (curVal.type !== "base") {
            ac += 1;
        }
        return ac;
    }, 0);

    const finalAccounts = accounts.reduce((ac, curVal) => {
        ac += 1;
        return ac;
    }, 0);

    const finalBalance = accounts.reduce((ac, curVal) => {
        ac += curVal.balance;
        return ac;
    }, 0);

    return {
        income: finalIncome,
        expenditure: finalExpenditure,
        categories: finalCategories,
        accounts: finalAccounts,
        balance: finalBalance
    };
};
