import { AssetsManifest } from "pixi.js";

export const TANK_BUNDLE_NAME = "tank";

export enum EnumTankTexturesAliases {
  GunConnectorD = "GunConnectorD",
  HeavyGunB = "HeavyGunB",
  HeavyHullB = "HeavyHullB",
  HeavyTowerB = "HeavyTowerB",
  TrackCFrame1 = "TrackСFrame1",
  TrackCFrame2 = "TrackСFrame2",
  MediumShell = "MediumShell",
}

export const manifest: AssetsManifest = {
  bundles: [
    {
      name: TANK_BUNDLE_NAME,
      assets: [
        {
          alias: EnumTankTexturesAliases.GunConnectorD,
          src: "src/assets/parts/gun_connectors/GunConnectorD.png",
        },

        {
          alias: EnumTankTexturesAliases.HeavyGunB,
          src: "src/assets/parts/guns/HeavyGunB.png",
        },

        {
          alias: EnumTankTexturesAliases.HeavyHullB,
          src: "src/assets/parts/hulls/HeavyHullB.png",
        },

        {
          alias: EnumTankTexturesAliases.HeavyTowerB,
          src: "src/assets/parts/towers/HeavyTowerB.png",
        },

        {
          alias: EnumTankTexturesAliases.TrackCFrame1,
          src: "src/assets/parts/tracks/TrackCFrame1.png",
        },
        {
          alias: EnumTankTexturesAliases.TrackCFrame2,
          src: "src/assets/parts/tracks/TrackCFrame2.png",
        },

        {
          alias: EnumTankTexturesAliases.MediumShell,
          src: "src/assets/parts/bullets/MediumShell.png",
        },
      ],
    },
  ],
};
