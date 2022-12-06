import { EventEmitter } from "events";

export default class Time extends EventEmitter {
  constructor() {
    super();
    this.start = Date.now(); // time the experience initiates
    this.current = this.start;
    this.elapsed = 0; // time passed since the start of the experience
    this.delta = 16; // time between each frame (ms)

    this.update();
  }

  update() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.emit("update");
    window.requestAnimationFrame(() => this.update());
  }
}
