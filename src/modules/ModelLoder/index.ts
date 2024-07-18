import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import BaseModel from "../BaseModel";
import type Viewer from "../Viewer";

type LoadModelCallbackFn<T = any> = (arg: T) => any;

/**模型加载器 */
export default class ModelLoder {
  public viewer: Viewer;
  private loader: GLTFLoader;
  private dracoLoader: DRACOLoader;

  constructor(viewer: Viewer, dracolPath = "/draco/") {
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(dracolPath);

    this.viewer = viewer;
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(this.dracoLoader);
  }

  /**模型加载到场景 */
  // public loadModelToScene(url: string, callback: LoadModelCallbackFn<BaseModel>) {
  //   this.loadModel(url, model => {
  //     this.viewer.scene.add(model.object);
  //     callback && callback(model);
  //   });
  // }

  public loadModel(url: string, callback: LoadModelCallbackFn<GLTF>) {
    this.loader.load(url, gltf => {
      this.viewer.scene.add(gltf.scene);
      this.viewer.onModelLoaded();
      // const baseModel = new BaseModel(gltf, this.viewer);
      callback && callback(gltf);
    });
  }

  // 添加小场景
  public loadBed(x: number, y: number, z: number, rotation: number, modelPath: string) {
    this.loader.load(modelPath, gltf => {
      const bed = gltf.scene;
      bed.position.set(x, y, z);
      bed.rotation.set(0, rotation, 0);
      this.viewer.scene.add(bed);
    });
  }

  public setLookDown() {
    this.viewer.setLookDown();
  }
  public setLookFront() {
    this.viewer.setLookFront();
  }
  public setLookLeft() {
    this.viewer.setLookLeft();
  }
}
