// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Object3D } from "three";

declare module "three" {
  interface Object3D {
    userData: {
      [key: string]: unknown;
      selectable?: boolean;
      id?: string;
      type?: string;
    };
  }
}
