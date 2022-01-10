import { debounce } from "lodash";

interface RequiredData {
  timestamp: number | string;
  id: string;
}

class TaskQueueStorableHelper<T extends RequiredData = any> {
  public static getInstance<T extends RequiredData = any>() {
    if (!this.instance) {
      this.instance = new TaskQueueStorableHelper<T>();
    }
    return this.instance;
  }
  private static instance: TaskQueueStorableHelper | null = null;
  // 单例模式运行
  protected store: any = null;
  private STORAGE_KEY = "Jervis_cen_store";
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
      queueData: queueData.sort(
        (a, b) => Number(a.timestamp) - Number(b.timestamp)
      ),
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.store));
  }
}

export abstract class AsyncTaskQueue<T extends RequiredData = any> {
  private get storableService() {
    return TaskQueueStorableHelper.getInstance<T>();
  }
  // 和存储层分开，这里的 queueData 是提供给异步队列使用的
  private get queueData() {
    return this.storableService.queueData;
  }

  private set queueData(value: T[]) {
    this.storableService.queueData = value;
    if (value.length) {
      this.debounceRun();
    }
  }
  protected debounceRun = debounce(this.run.bind(this), 1000);
  protected abstract consumeTaskQueue(data: T[]): Promise<any>;

  protected addTask(data: T | T[]) {
    this.queueData = this.queueData.concat(data);
  }

  private run() {
    // 如果要严谨一点，通过每一个task的id来重新给队列赋值，怎么做？
    const currentDataList = this.queueData;
    if (currentDataList.length) {
      // 当前这批数据上报完成之后，需要从 queueData里剔除；
      this.queueData = []; // 严谨点上报后再置空
      this.consumeTaskQueue(currentDataList).catch(_ => {});
    }
  }
}
