import moment from 'moment';

export default (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense)=>{
        const createdAt = moment(expense.createdAt);
        const startDateMatch = startDate? moment(startDate).isSameOrBefore(createdAt, 'day') : true;
        const endDateMatch = endDate? moment(endDate).isSameOrAfter(createdAt, 'day') : true;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch&&endDateMatch&&textMatch;
    }).sort((a, b)=>{
        if(sortBy==='date'){
            return b.createdAt - a.createdAt;
        } else if(sortBy==='amount'){
            return b.amount-a.amount;
        } else {
            return 0;
        }
    });
}