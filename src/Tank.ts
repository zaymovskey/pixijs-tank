import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { EnumTankTexturesAliases } from "./manifest.ts";

const createAnimatedSprite = (
  texturesAliases: string[],
  speed: number,
  position: { x: number; y: number } | number = { x: 0, y: 0 },
  anchor: { x: number; y: number } | number = { x: 0.5, y: 0.5 },
) => {
  const animatedSprite = new AnimatedSprite(
    texturesAliases.map((alias) => Texture.from(alias)),
  );
  animatedSprite.animationSpeed = speed;
  const settingPosition =
    typeof position === "number" ? [position] : Object.values(position);
  animatedSprite.position.set(...settingPosition);

  const settingAnchor =
    typeof anchor === "number" ? [anchor] : Object.values(anchor);
  animatedSprite.anchor.set(...settingAnchor);

  return animatedSprite;
};

const createSprite = (
  textureAlias: string,
  position: { x: number; y: number } | number = { x: 0, y: 0 },
  anchor: { x: number; y: number } | number = { x: 0.5, y: 0.5 },
) => {
  const sprite = new Sprite(Texture.from(textureAlias));
  const settingPosition =
    typeof position === "number" ? [position] : Object.values(position);
  sprite.position.set(...settingPosition);

  const settingAnchor =
    typeof anchor === "number" ? [anchor] : Object.values(anchor);
  sprite.anchor.set(...settingAnchor);

  return sprite;
};

export class Tank {
  public _view: Container = new Container();

  private readonly _trackLeft: AnimatedSprite;
  private readonly _trackRight: AnimatedSprite;
  private readonly _trackAnimationSpeed: number = 0.25;

  private readonly _hull: Sprite;

  private readonly _gunLeft: Sprite;
  private readonly _gunRight: Sprite;

  private readonly _gunConnector: Sprite;

  private readonly _tower: Sprite;

  private readonly _bodyContainer: Container = new Container();
  private readonly _towerContainer: Container = new Container();

  constructor() {
    // Body
    this._trackLeft = createAnimatedSprite(
      [
        EnumTankTexturesAliases.TrackCFrame1,
        EnumTankTexturesAliases.TrackCFrame2,
      ],
      this._trackAnimationSpeed,
      { x: 0, y: -80 },
    );

    this._trackRight = createAnimatedSprite(
      [
        EnumTankTexturesAliases.TrackCFrame1,
        EnumTankTexturesAliases.TrackCFrame2,
      ],
      this._trackAnimationSpeed,
      { x: 0, y: 80 },
    );
    this._bodyContainer.addChild(this._trackLeft);
    this._bodyContainer.addChild(this._trackRight);

    this._hull = createSprite(
      EnumTankTexturesAliases.HeavyHullB,
      undefined,
      0.5,
    );
    this._bodyContainer.addChild(this._hull);
    this._view.addChild(this._bodyContainer);

    // Tower
    this._gunLeft = createSprite(EnumTankTexturesAliases.HeavyGunB, {
      x: 140,
      y: -27,
    });
    this._gunRight = createSprite(EnumTankTexturesAliases.HeavyGunB, {
      x: 160,
      y: 29,
    });
    this._towerContainer.addChild(this._gunLeft);
    this._towerContainer.addChild(this._gunRight);

    this._gunConnector = createSprite(EnumTankTexturesAliases.GunConnectorD, {
      x: 80,
      y: 0,
    });
    this._towerContainer.addChild(this._gunConnector);

    this._tower = createSprite(EnumTankTexturesAliases.HeavyTowerB);
    this._towerContainer.addChild(this._tower);

    this._view.addChild(this._towerContainer);
  }

  get view() {
    return this._view;
  }

  set towerDirection(value: number) {
    this._towerContainer.rotation = value;
  }

  get towerDirection() {
    return this._towerContainer.rotation;
  }

  set bodyDirection(value: number) {
    this._bodyContainer.rotation = value;
  }

  get bodyDirection() {
    return this._bodyContainer.rotation;
  }

  get x() {
    return this._view.position.x;
  }

  set x(value: number) {
    this._view.position.x = value;
  }

  get y() {
    return this._view.position.y;
  }

  set y(value: number) {
    this._view.position.y = value;
  }

  public startTracks() {
    this._trackLeft.play();
    this._trackRight.play();
  }

  public stopTracks() {
    this._trackLeft.stop();
    this._trackRight.stop();
  }
}
