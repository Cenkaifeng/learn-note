import{ EventEmitter } from 'eventemitter3';

export enum CountdownEventName {
    START = 'START',
    STOP = 'STOP',
    RUNNING = 'RUNNING'
}

enum CountdownStatus {
    running,
    paused,
    stoped,
}

export interface RemainTimeData {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    count: number;
}

interface CountdownEventMap {
    [CountdownEventName.START]: [];
    [CountdownEventName.STOP]: [];
    [CountdownEventName.RUNNING]: [RemainTimeData];
}

export function fillZero(num: number):string {
    return `0${num}`.slice(-2);
}

export class Countdown extends EventEmitter<CountdownEventMap> {
    private static COUNT_IN_MILLSECOND: number = 1 * 100;
    private static SECOND_IN_MILLSECOND: number = 10 * Countdown.COUNT_IN_MILLSECOND;
    private static MINUTE_IN_MILLSECOND: number = 60 * Countdown.SECOND_IN_MILLSECOND;
    private static HOUR_IN_MILLSECOND: number = 60 * Countdown.MINUTE_IN_MILLSECOND;
    private static DAY_IN_MILLSECOND: number = 24 * Countdown.HOUR_IN_MILLSECOND;

    private endTime: number;
    private step: number;
    private remainTime: number = 0;
    private status: CountdownStatus = CountdownStatus.stoped;

    constructor(endTime: number, step: number = 1e3) {
        super();

        this.endTime = endTime;
        this.step = step;

        this.start();// 声明完成后自动调用
    }

    public start() {
        this.emit(CountdownEventName.START);
        this.status = CountdownStatus.running;

        this.countdown();
    }

    public stop() {
        this.emit(CountdownEventName.STOP);
        this.status = CountdownStatus.stoped;
    }

    private countdown() {
        if(this.status !== CountdownStatus.running) {
            return;
        }

        this.remainTime = Math.max(this.endTime - Date.now(), 0);// 避免负数

        this.emit(CountdownEventName.RUNNING, this.parseRemainTime(this.remainTime));

        if (this.remainTime > 0) {
            setTimeout(() => this.countdown(), this.step);
        } else {
            this.stop();
        }
    }

    private parseRemainTime(remainTime: number): RemainTimeData {
        let time = remainTime;
        const days = Math.floor(time / Countdown.DAY_IN_MILLSECOND);
        time = time % Countdown.DAY_IN_MILLSECOND;

        const hours = Math.floor(time / Countdown.HOUR_IN_MILLSECOND);
        time = time % Countdown.HOUR_IN_MILLSECOND;

        const minutes = Math.floor(time / Countdown.MINUTE_IN_MILLSECOND);
        time = time % Countdown.MINUTE_IN_MILLSECOND;

        const seconds = Math.floor(time / Countdown.SECOND_IN_MILLSECOND);
        time = time % Countdown.SECOND_IN_MILLSECOND;

        const count = Math.floor(time / Countdown.COUNT_IN_MILLSECOND);

        return {
            days,
            hours,
            minutes,
            seconds,
            count
        }
    }

}

// const countdown = new Countdown();

// countdown.on('stop');
// countdown.on('countdown');