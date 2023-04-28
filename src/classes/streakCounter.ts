import  Task from  './task' ;
import streakCounterInterface from '../interfaces/streakCounterInterface';



/**
 * Class representing a streakCounter
 * @class StreakCounter
 * @implements {streakCounterInterface}
 * @param {Task[]} tasks - array of tasks
 * 
 * 
 */
class  StreakCounter  implements  streakCounterInterface {
    tasks: Task[];
    constructor() {
        this.tasks = [];
    }
}

export default StreakCounter;