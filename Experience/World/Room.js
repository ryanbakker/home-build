import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      if (child.name === "computer") {
        child.children[13].material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "mini") {
        child.position.x = -0.233969;
        child.position.z = 1.27611;
      }

      // if (
      //   child.name === "mail" ||
      //   child.name === "tile_one" ||
      //   child.name === "tile_two" ||
      //   child.name === "tile_three" ||
      //   child.name === "lamp" ||
      //   child.name === "bonsai"
      // ) {
      //   child.scale.set(0, 0, 0);
      // }

      child.scale.set(0, 0, 0);
      if (child.name === "littlecube") {
        // child.scale.set(1, 1, 1);
        child.position.set(0, -0.2, 0);
        child.rotation.y = Math.PI / 4;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    // Room lamp model lighting

    const pointLight = new THREE.PointLight(0xffcf99, 1, 100);
    pointLight.position.set(-0.805, 0.5, -0.98);
    this.actualRoom.add(pointLight);

    const sphereSize = 0.08;

    this.roomChildren["pointLight"] = pointLight;

    // const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    // this.scene.add(pointLightHelper);

    // Add actual room

    this.scene.add(this.actualRoom);

    // TO SCALE THE ROOM
    this.actualRoom.scale.set(1, 1, 1);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
