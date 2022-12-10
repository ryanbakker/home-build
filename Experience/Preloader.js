import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans";

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
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".second-sub"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();

      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });

      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });

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
      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
          onComplete: resolve,
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
          },
          "same"
        )
        .to(
          ".toggle-bar",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      console.log(this.roomChildren);

      this.secondTimeline
        .to(
          ".intro-text .animatedis",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )

        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.littlecube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 4,
          },
          "same"
        )
        .to(
          this.roomChildren.littlecube.scale,
          {
            x: 8,
            z: 8,
            y: 8,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 5,
            x: -0.4,
          },
          "same"
        )
        .to(
          this.roomChildren.littlecube.position,
          {
            x: 0,
            y: 1.40675,
            z: 0,
          },
          "same"
        )
        .set(this.roomChildren.foundation.scale, {
          // cube = Floor and walls object
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.littlecube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 1,
          },
          "introtext"
        )
        .to(
          ".hero-main-title .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
          },
          "introtext"
        )
        .to(
          ".hero-main-description .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
            onComplete: resolve,
          },
          "introtext"
        )
        .to(
          ".first-sub .animatedis",
          {
            yPercent: -0,
            stagger: 0.07,
            ease: "back.out(1.2)",
            onComplete: resolve,
          },
          "introtext"
        )
        .to(
          ".second-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
            onComplete: resolve,
          },
          "introtext"
        )
        .to(this.roomChildren.bed.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.drawers.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.clock.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.desk.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(this.roomChildren.chair.scale, {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.out(2.2)",
          duration: 0.5,
        })
        .to(
          this.roomChildren.chess_game.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "decor"
        )
        .to(
          this.roomChildren.panels.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "decor"
        )
        .to(
          this.roomChildren.computer.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "desktop"
        )
        .set(this.roomChildren.mini.scale, {
          x: 1,
          y: 1,
          z: 1,
        })
        .to(
          this.roomChildren.bed_lamp.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          "desktop"
        )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSectionIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = (this.initalY = currentY);
    if (difference > 0) {
      console.log("swiped up");
      this.removeEventListeners();
      this.playSectionIntro();
    }
    this.initalY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }

  async playSectionIntro() {
    this.moveFlag = false;
    await this.secondIntro();
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    this.roomChildren.pointLight.width = 0;
    this.roomChildren.pointLight.height = 0;
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }
  }
}
