import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
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
  private bedWidth = 2.0;
  private bedHeight = 1;
  private bedDepth = 2.8;
  private bedScaleY = 6;
  private cubeWidth = 5.45;
  private cubeHeight = 5;
  private cubeDepth = 2.8;
  private cube1X = -37.4;
  private cube1Z = 13.75;
  private cube2X = -37.4;
  private cube2Z = 17;
  private font;

  constructor(viewer: Viewer, dracolPath = "/draco/") {
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(dracolPath);

    this.viewer = viewer;
    this.loader = new GLTFLoader();
    this.loader.setDRACOLoader(this.dracoLoader);
  }

  public loadModel(url: string, callback: LoadModelCallbackFn<GLTF>) {
    this.loader.load(url, gltf => {
      this.viewer.scene.add(gltf.scene);
      this.viewer.onModelLoaded();
      // const baseModel = new BaseModel(gltf, this.viewer);
      callback && callback(gltf);
    });
  }

  // 添加小场景 - old
  public loadBed(x: number, y: number, z: number, rotation: number, modelPath: string) {
    this.loader.load(modelPath, gltf => {
      const bed = gltf.scene;
      bed.position.set(x, y, z);
      bed.rotation.set(0, rotation, 0);
      this.viewer.scene.add(bed);
    });
  }

  // 添加小场景 - 床位
  public addBedCube(x, y, z, rotation, topColor, bottomColor) {
    const geometry = new THREE.BoxGeometry(this.bedWidth, this.bedHeight, this.bedDepth);

    // 定义颜色
    const colorTop = new THREE.Color(topColor);
    const colorBottom = new THREE.Color(bottomColor);

    // 创建顶点颜色属性
    const colors: number[] = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      colors.push(colorTop.r, colorTop.g, colorTop.b);
    }
    const colorAttribute = new THREE.Float32BufferAttribute(colors, 3);
    geometry.setAttribute("color", colorAttribute);

    // 设置材质，需要支持顶点颜色
    // const material = new THREE.MeshPhongMaterial({ vertexColors: THREE.VertexColors });
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8 // 设置不完全透明
    });

    // 遍历顶点，设置顶点颜色
    geometry.attributes.color.array = new Float32Array(geometry.attributes.position.count * 3);
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      const vertex = geometry.attributes.position.array;
      const color = geometry.attributes.color.array;

      const y = vertex[i * 3 + 1]; // Y坐标
      const gradient = (y + this.bedHeight / 2) / this.bedHeight; // 将Y坐标映射到0-1范围

      if (y === 1) {
        // 顶面
        color[i * 3] = colorTop.r;
        color[i * 3 + 1] = colorTop.g;
        color[i * 3 + 2] = colorTop.b;
      } else if (y === -1) {
        // 底面
        color[i * 3] = colorBottom.r;
        color[i * 3 + 1] = colorBottom.g;
        color[i * 3 + 2] = colorBottom.b;
      } else {
        // 侧面
        const colorValue = new THREE.Color().copy(colorBottom).lerp(colorTop, gradient);
        color[i * 3] = colorValue.r;
        color[i * 3 + 1] = colorValue.g;
        color[i * 3 + 2] = colorValue.b;
      }
    }

    // 更新顶点颜色属性
    geometry.attributes.color.needsUpdate = true;

    // 创建一个网格对象，结合几何体和材质
    const bed = new THREE.Mesh(geometry, material);

    // 设置立方体的位置
    bed.position.set(x, this.bedHeight / 2 + y, z); // 默认位置，你可以修改这些值
    bed.rotation.set(0, rotation, 0);

    // 将网格对象添加到场景中
    this.viewer.scene.add(bed);

    return bed;
  }
  // 加载字体
  public loadFont(url: string, callback) {
    const loader = new FontLoader();
    loader.load(url, response => {
      this.font = response;
      callback && callback(response);
    });
  }

  // 添加床位编码
  public addBedText(x, z, text) {
    const textGeo = new TextGeometry(text, {
      font: this.font,
      size: 1, // 文字大小
      depth: 0.15, // 文字厚度
      curveSegments: 3, // 曲线分段数
      bevelEnabled: false, // 是否开启倒角
      bevelThickness: 0.03, // 倒角厚度
      bevelSize: 0.02, // 倒角大小
      bevelOffset: 0, // 倒角偏移
      bevelSegments: 1 // 倒角分段数
    });

    // 添加材质
    const material = new THREE.MeshBasicMaterial({ color: 0xd7d7d7 });
    const textMesh = new THREE.Mesh(textGeo, material);

    // 计算模型的包围盒
    const box = new THREE.Box3().setFromObject(textMesh);
    const center = new THREE.Vector3();

    // 计算模型中心
    box.getCenter(center);

    textMesh.position.set(x - center.x, this.bedHeight + 0.1, z);
    // 将网格添加到场景
    this.viewer.scene.add(textMesh);
  }

  public loadCube(callback) {
    this.viewer.loadCube(callback);
  }

  public setBed03(bed03) {
    this.viewer.setBed03(bed03);
  }

  public setBed04(bed04) {
    this.viewer.setBed04(bed04);
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
