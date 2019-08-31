import { totalmem } from "os";

export default (expenses) => {
    return expenses
                .map((value)=> value.amount, [])
                .reduce((total, value)=>total+value, 0);
}