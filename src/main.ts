import './style.css';
import {Application, Assets, FederatedPointerEvent, Rectangle} from "pixi.js";
import {manifest, TANK_BUNDLE_NAME} from "./manifest.ts";
import {Tank} from "./Tank.ts";
import {Easing, Tween} from "@tweenjs/tween.js";

const CANVAS_SIZE = { width: 800, height: 800 };

const app = new Application();

const init = async () => {
  await app.init({...CANVAS_SIZE, backgroundColor: '#414141'});

  document.body.appendChild(app.canvas);

  await Assets.init({ manifest });

  await Assets.loadBundle([TANK_BUNDLE_NAME]);
}

await init();

const runGame = () => {
  const tank = new Tank();
  app.stage.addChild(tank.view);
  app.stage.position.set(CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2);

  const moveTank = (ev: FederatedPointerEvent) => {
    const distanceToCursor = ev.getLocalPosition(app.stage);
    const distanceToTank = ev.getLocalPosition(tank.view);
    const rotateAngle = Math.atan2(distanceToTank.y, distanceToTank.x);

    let tankRotationsCompleteCount = 0;
    const onTankRotateCompleted = () => {
      tankRotationsCompleteCount ++;
      if (tankRotationsCompleteCount < 2) return;

      const tankMoveTween = new Tween(tank)
        .to({x: distanceToCursor.x, y: distanceToCursor.y}, 2000)
        .onStart((object) => object.startTracks())
        .onComplete((object) => object.stopTracks())
        .easing(Easing.Quadratic.Out)
        .start();

      function animate(time: number) {
        tankMoveTween.update(time)
        requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }

    const tankBodyRotateTween = new Tween(tank)
      .to({towerDirection: rotateAngle}, 1000)
      .easing(Easing.Quadratic.Out)
      .onComplete(onTankRotateCompleted)
      .start()
    const tankTowerRotateTween = new Tween(tank)
      .to({bodyDirection: rotateAngle}, 2000)
      .easing(Easing.Quadratic.Out)
      .onComplete(onTankRotateCompleted)
      .start()

    function animate(time: number) {
      tankBodyRotateTween.update(time)
      tankTowerRotateTween.update(time)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }

  app.stage.on('pointerdown', moveTank);
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
}

runGame();
