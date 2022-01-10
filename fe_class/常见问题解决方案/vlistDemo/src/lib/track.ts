import axios from 'axios';
import { AsyncTaskQueue } from './async-task-queue';
import queryString from 'query-string';
import { v4 as uuid } from 'uuid';

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

    public track(data: UserTrackData) {
        this.addTask({
            id: uuid(),
            seqId: this.seq++,
            timestamp: Date.now(),
            ...data,
        });
    }

    public consumeTaskQueue(data: any) {
        // return new Promise((resolve) => {
        //     const image = new Image();
        //     image.src = `https://lubai.com?data=${queryString.stringify(data)}`;

        //     image.onload = () => {
        //         resolve(true);
        //     };
        // });

        return axios.post(`https://lubai.com`, { data });
    }

}