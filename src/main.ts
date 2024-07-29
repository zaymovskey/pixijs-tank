import './style.css';
import {Application, Assets, FederatedPointerEvent, Rectangle} from "pixi.js";
import {manifest, TANK_BUNDLE_NAME} from "./manifest.ts";
import {Tank} from "./Tank.ts";
import { gsap } from "gsap";

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
    const distanceToTank = ev.getLocalPosition(tank.view);
    const rotateAngle = Math.atan2(distanceToTank.y, distanceToTank.x);
    const distanceToCursor = ev.getLocalPosition(app.stage);

    let tankRotationsCompleteCount = 0;
    const onTankRotateCompleted = () => {
      tankRotationsCompleteCount ++;
      if (tankRotationsCompleteCount < 2) return;

      const tankMoveTween = gsap.timeline(
        {
          onStart: () => tank.startTracks(),
          onComplete: () => tank.stopTracks()
        })
        .to(tank,{
          x: distanceToCursor.x, y: distanceToCursor.y,
          duration: 2, ease: "power1.inOut"
        });
      tankMoveTween.play();
    }

    const tankBodyRotateTween = gsap.timeline(
      {onComplete: onTankRotateCompleted})
      .to(tank,{towerDirection: rotateAngle, duration: 2, ease: "power1.inOut"});
    tankBodyRotateTween.play();

    const tankTowerRotateTween = gsap.timeline(
      {onComplete: onTankRotateCompleted})
      .to(tank,{bodyDirection: rotateAngle, duration: 1.4, ease: "power1.inOut"});
    tankTowerRotateTween.play();
  }

  app.stage.on('pointerdown', moveTank);
  app.stage.interactive = true;
  app.stage.interactiveChildren = false;
  app.stage.hitArea = new Rectangle(-400, -400, 800, 800);
}

runGame();
