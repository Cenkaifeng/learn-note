import { AsyncTaskQueue } from "./async-task-queue";
import { stringify } from 'query-string'; // {a: 111, b:222} => a=111&b=222
import axios from 'axios';
import { v4 as uuid } from 'uuid'

interface TrackData {
    seqId: number;
    id: string;
    timestamp: number;
}

interface UserTrackData {
    msg?: string;
}

export class BaseTrack extends AsyncTaskQueue<TrackData> {
    private seq: number = 0;

    public track(data) {
        this.addTask({
            id: uuid(),
            seqId: this.seq++, // 防止数据在请求 abort 断掉
            timestamp: Date.now(),
            ...data,
        })
    }
    public consumeTaskQueue(data: any) {
        return axios.post(`https://Jervis.com`, {data})
    }
}

// new BaseTrack().track({}) // 调用
