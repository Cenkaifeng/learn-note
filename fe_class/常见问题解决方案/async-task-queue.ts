interface RequiredData {
    timestamp: number;
}

class TaskQueueStorableHelper<T extends RequiredData> {
    public static getInstance<T extends RequiredData = any> () {

    }
    private static instance: TaskQueueStorableHelper | null = null;
    protected store: any = null;
    private STORAGE_KEY = 'Jervis_cen_store';
    constructor() {
        const localStorageValue = localStorage.getItem(this.STORAGE_KEY);
        if(localStorageValue) {
            this.store = JSON.parse(localStorageValue)
        }
    }

    get queueData() {
        return this.store?.queueData || [];
    }

    set queueData(queueData: T[]) {
        this.store = {
            ...this.store,
            queueData: queueData.sort((a, b) => Number(a.timestamp) - Number(b.timestamp))
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store))
    }

}

export abstract class AsyncTaskQueue< T extends RequiredData = any> {
    private get storableService() {
        return TaskQueueStorableHelper.getInstance<T>();
    }

    private get queueData() {
        return this.storableService.queueData;
    }

    private set queueData(value) {
        this.storableService.queueData = value;
        if (value.length) {

        }
    }
}