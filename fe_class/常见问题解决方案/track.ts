import { AsyncTaskQueue } from "./async-task-queue";
import { stringify } from "query-string"; // {a: 111, b:222} => a=111&b=222
import axios from "axios";
import { v4 as uuid } from "uuid";

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
    // 借鉴架构分层 用 track 兜住业务代码防止业务代码侵入公共代码（async-task-queue.ts）
    this.addTask({
      id: uuid(),
      seqId: this.seq++, // 防止数据在请求 abort 断掉,如果seqId 不连续，那么这段数据是有断层的，可信度是很低的。
      timestamp: Date.now(),
      ...data,
    });
  }
  public consumeTaskQueue(data: any) {
    // return new Promise(resolve => {
    //   const image = new Image();
    //   image.onload = () => {
    //     // 监听一下
    //     resolve(true);
    //   };
    //   image.src = `https://jervis.com?${stringify(data)}`;
    // });
    return axios.post(`https://Jervis.com`, { data });
  }
}

// new BaseTrack().track({}) // 调用
