import bestInterface from '../interfaces/bestInterface';
import StreakCounter from './streakCounter';
import Task from './task';
import Days from './days.js';




/**
 * Class representing a bestDoneTask
 * @class BestDoneTask
 * @implements {bestInterface}
 * @param {StreakCounter} streakCounter - streakCounter object
 * @method getBest - returns the task with the most done days
 * 
 */
class BestDoneTask implements bestInterface {
    streakCounter: StreakCounter;
    constructor(streakCounter: StreakCounter) {
        this.streakCounter = streakCounter;
    }
    getBest(): Task {
        // return task with the most done days 
        let bestTask: Task = this.streakCounter.tasks[0];
        for (let i = 0; i < this.streakCounter.tasks.length; i++) {
            if (Days.create(this.streakCounter.tasks[i]).getDays()> Days.create(bestTask).getDays()) {
                bestTask = this.streakCounter.tasks[i];
            }
        }
        return bestTask;

    }
}

export default BestDoneTask;