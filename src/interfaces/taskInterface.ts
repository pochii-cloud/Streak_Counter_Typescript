
/**
 * @interface TaskInterface
 * @property {number} id - id of the task
 * @property {string} name - name of the task
 * @property {string} imageUrl - url of the image
 * @property {string} date - date of the task
 * 
 */
interface TaskInterface {
    id: number;
    name: string;
    imageUrl: string;
    taskDate: string;
}

export default TaskInterface;