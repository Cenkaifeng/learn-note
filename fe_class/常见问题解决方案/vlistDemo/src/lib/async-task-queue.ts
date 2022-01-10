
import { debounce } from 'lodash';

interface RequiredData {
    timestamp: number | string;
}

class TaskQueueStorableHelper<T extends RequiredData = any> {
    public static getInstance<T extends RequiredData = any>() {
        if (!this.instance) {
            this.instance = new TaskQueueStorableHelper<T>();
        }
        return this.instance;
    }

    private static instance: TaskQueueStorableHelper | null = null;

    protected store: any = null;
    private STORAGE_KEY = 'lubai_store';

    constructor() {
        const localStorageValue = localStorage.getItem(this.STORAGE_KEY);
        if (localStorageValue) {
            this.store = JSON.parse(localStorageValue);
        }
    }

    get queueData() {
        return this.store?.queueData || [];
    }

    set queueData(queueData: T[]) {
        this.store = {
            ...this.store,
            queueData: queueData.sort((a, b) => Number(a.timestamp) - Number(b.timestamp)),
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
    }

}

export abstract class AsyncTaskQueue<T extends RequiredData = any> {
    private get storableService() {
        return TaskQueueStorableHelper.getInstance<T>();
    }

    private get queueData() {
        return this.storableService.queueData;
    }

    private set queueData(value: T[]) {
        this.storableService.queueData = value;
        if (value.length) {
            this.debounceRun();
        }
    }

    protected debounceRun = debounce(this.run.bind(this), 500);

    protected abstract consumeTaskQueue(data: T[]): Promise<any>;

    protected addTask(data: T | T[]) {
        this.queueData = this.queueData.concat(data);
    }


    private run() {
        const currentDataList = this.queueData;

        if (currentDataList.length) {
            this.queueData = [];
            this.consumeTaskQueue(currentDataList); // .catch(() => this.addTask(currentDataList))
        }
    }
}
