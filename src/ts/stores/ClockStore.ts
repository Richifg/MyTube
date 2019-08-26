import { observable, computed } from 'mobx';
import * as mobx from 'mobx';

class ClockStore {
  @observable time: Date;
  intervalId: NodeJS.Timeout;
  byMinute: boolean;

  constructor() {
    this.time = new Date();
    this.intervalId = setInterval(() => this.checkTime(), 1000);
    this.byMinute = false;
  }

  // time is checked every second until the first minute change
  // then it is checked every minute
  checkTime() {
    if (!this.byMinute) {
      const currentTime = new Date();
      if (currentTime.getMinutes() !== this.time.getMinutes()) {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => this.checkTime(), 60000);
        this.byMinute = true;
        this.time = new Date();
      }
    } else {
      this.time = new Date();
    }
  }

  // returns a AM / PM format hour
  @computed get getTime12hFormat(): string {
    const [hours, minutes] = [this.time.getHours(), this.time.getMinutes()];
    const [displayHour, interval] = hours > 12
      ? [hours - 12, 'PM']
      : [hours, 'AM'];
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHour}:${displayMinutes} ${interval}`;
  }
}

export default ClockStore;
