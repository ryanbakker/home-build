import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
  constructor() {
    super();

    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    this.timeline = new GSAP.timeline();

    if (this.device === "desktop") {
      this.timeline
        .to(this.roomChildren.littlecube.scale, {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          ease: "back-out(2.5)",
          duration: 0.7,
        })
        .to(this.room.position, {
          x: -1,
          ease: "power1.out",
          duration: 0.7,
        });
    } else {
      this.timeline
        .to(this.roomChildren.littlecube.scale, {
          x: 1.4,
          y: 1.4,
          z: 1.4,
          ease: "back-out(2.5)",
          duration: 0.7,
        })
        .to(this.room.position, {
          z: -1,
          ease: "power1.out",
          duration: 0.7,
        });
    }
  }

  secondIntro() {
    this.secondTimeline = new GSAP.timeline();

    if (this.device === "desktop") {
      this.secondTimeline.to(this.room.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power1.out",
        duration: 0.7,
      });
    } else {
      this.secondTimeline.to(this.room.position, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power1.out",
        duration: 0.7,
      });
    }
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      window.removeEventListener("wheel", this.scrollOnceEvent);
      this.playSectionIntro();
    }
  }

  playIntro() {
    this.firstIntro();
    this.scrollOnceEvent = this.onScroll.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
  }

  playSectionIntro() {
    this.secondIntro();
  }
}
