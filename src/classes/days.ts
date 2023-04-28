
import Task from './task';



/**
 * Class representing a days
 * @class Days
 * @param {Task} task - task
 * @method getDays - returns the number of days between today and the  start  task date
 * 
 */
class Days{
    private task: Task;
    private constructor(task: Task) {
        this.task = task;
    }
    static create(task: Task): Days {
        return new Days(task);
    }
    getDays(): number {
        const date = new Date(this.task.taskDate);
        const today = new Date();
        const timeDiff = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    }

}

export default Days;