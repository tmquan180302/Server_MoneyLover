const moment = require('moment-timezone');
const { repeatOptions } = require('../utils/options');

function generateNewBudgets(budgets) {
    const newBudgets = [];
    const today = moment().startOf('day');

    budgets.forEach(budget => {

        const { frequency } = budget;

        if (repeatOptions.includes(frequency)) {
            const budgetStart = moment(budget.dayStart);


            switch (frequency) {
                case 'Daily':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'day');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'day');
                        }
                    }
                    break;
                case 'Weekly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'week');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'week');
                        }
                    }
                    break;
                case 'Biweekly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(2, 'week');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(2, 'week');
                        }
                    }
                    break;
                case 'Triweekly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(3, 'week');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(3, 'week');
                        }
                    }
                    break;
                case 'Quadweekly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(4, 'week');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(4, 'week');
                        }
                    }
                    break;

                case 'Monthly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'month');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'month');
                        }
                    }
                    break;
                case 'Bimonthly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(2, 'month');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(2, 'month');
                        }
                    }
                    break;
                case 'Trimonthly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(3, 'month');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(3, 'month');
                        }
                    }
                    break;
                case 'Quadmonthly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(4, 'month');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(4, 'month');
                        }
                    }
                    break;
                case 'Quinmonthly':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(5, 'month');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(5, 'month');
                        }
                    }
                    break;
                case 'Semiannually':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(6, 'month');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(6, 'month');
                        }
                    }
                    break;
                case 'Annually':

                    if (budget.dayEnd == null) {
                        while (budgetStart.isSameOrBefore(today)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'year');
                        }
                    } else {
                        while (budgetStart.isSameOrBefore(budget.dayEnd)) {
                            const newBudget = { ...budget.toObject() };
                            newBudget.dayStart = budgetStart.valueOf();

                            newBudgets.push(newBudget);
                            budgetStart.add(1, 'year');
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    });
    return newBudgets;
}

module.exports = generateNewBudgets;

