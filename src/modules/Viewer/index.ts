import {
  Scene,
  PerspectiveCamera,
  AxesHelper,
  WebGLRenderer,
  Camera,
  SRGBColorSpace,
  AmbientLight,
  Raycaster,
  Vector2
} from "three";
import * as THREE from "three";
import mitt, { type Emitter } from "mitt";
import Events from "./Events";
import { throttle } from "lodash-es";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import TWEEN from "three/examples/jsm/libs/tween.module";
import Stats from "three/examples/jsm/libs/stats.module";
import SkyBoxs from "../SkyBoxs";

export type Animate = {
  fun: (arg: any) => any;
  content: any;
};

export default class Viewer {
  public id: string;
  public viewerDom!: HTMLElement;
  public scene!: Scene;
  public camera!: PerspectiveCamera;
  public renderer!: WebGLRenderer;
  public controls!: OrbitControls;
  public skyboxs!: SkyBoxs;
  public animateEventList: any[] = [];
  public statsControls!: Stats;
  public raycaster!: Raycaster;
  public mouse!: Vector2;
  public emitter!: Emitter<any>;
  public mouseEvent: MouseEvent | undefined;
  public raycasterObjects: THREE.Object3D[] = [];
  public isDestroy = false;
  public ambientLight!: AmbientLight;
  public directionalLight!: THREE.DirectionalLight;
  // 常量
  public ambientLightIntensity = 6;
  public directionalLightIntensity = 5;
  private initCameraPositionX = 0;
  private initCameraPositionY = Math.tan(THREE.MathUtils.degToRad(25)) * 90;
  private initCameraPositionZ = 90;

  constructor(id: string) {
    this.id = id;
    this.initViewer();
  }
  /**坐标轴辅助 */
  public addAxis() {
    const axis = new AxesHelper(1000);
    this.scene?.add(axis);
  }

  public addAnimate(animate: Animate) {
    this.animateEventList.push(animate);
  }
  /**
   * 添加性能状态监测
   */
  public addStats() {
    if (!this.statsControls) this.statsControls = new Stats();
    this.statsControls.dom.style.position = "absolute";
    this.viewerDom.appendChild(this.statsControls.dom);

    // 添加到动画
    this.addAnimate({
      fun: this.statsUpdate,
      content: this.statsControls
    });
  }

  /**注册鼠标事件监听 */
  public initRaycaster() {
    this.raycaster = new Raycaster();

    const initRaycasterEvent: Function = (eventName: keyof HTMLElementEventMap): void => {
      const funWrap = throttle((event: any) => {
        this.mouseEvent = event;
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // @ts-expect-error
        this.emitter.emit(Events[eventName].raycaster, this.getRaycasterIntersectObjects());
      }, 50);
      this.viewerDom.addEventListener(eventName, funWrap, false);
    };

    initRaycasterEvent("click");
    initRaycasterEvent("dblclick");
    initRaycasterEvent("mousemove");
  }

  /**销毁场景 */
  public destroy() {
    this.scene.traverse((child: any) => {
      if (child.material) {
        child.material.dispose();
      }
      if (child.geometry) {
        child.geometry.dispose();
      }
      child = null;
    });
    this.renderer.forceContextLoss();
    this.renderer.dispose();
    this.scene.clear();

    this.isDestroy = true;
  }

  private statsUpdate(statsControls: any) {
    statsControls.update();
  }

  private initViewer() {
    this.emitter = mitt();

    this.initRenderer();
    this.initScene();
    this.initCamera();
    this.initLight();
    this.initControl();
    // this.initSkybox();

    this.raycaster = new Raycaster();
    this.mouse = new Vector2();

    // this.onModelLoaded();
  }

  private initScene() {
    this.scene = new Scene();
  }

  private initCamera() {
    // 渲染相机
    this.camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 2000);
    // 设置初始缩放级别
    this.camera.zoom = 0.65;
    //设置相机位置
    this.camera.position.set(this.initCameraPositionX, this.initCameraPositionY, this.initCameraPositionZ);
    //设置相机方向
    this.camera.lookAt(0, 0, 0);
    // 必须更新投影矩阵
    this.camera.updateProjectionMatrix();
  }
  private animate = () => {
    // if (this.isDestroy) return;
    // requestAnimationFrame(animate);

    this.updateDom();
    this.readerDom();

    // 全局的公共动画函数，添加函数可同步执行
    // this.animateEventList.forEach(event => {
    //   // event.fun && event.content && event.fun(event.content);
    //   if (event.fun && event.content) {
    //     event.fun(event.content);
    //   }
    // });
  };

  public initRenderer() {
    // 获取画布dom
    this.viewerDom = document.getElementById(this.id) as HTMLElement;
    // 初始化渲染器
    this.renderer = new WebGLRenderer({
      // logarithmicDepthBuffer: true,
      antialias: true, // true/false表示是否开启反锯齿
      alpha: true // true/false 表示是否可以设置背景色透明
      // precision: "mediump", // highp/mediump/lowp 表示着色精度选择
      // premultipliedAlpha: true // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
      // preserveDrawingBuffer: false, // true/false 表示是否保存绘图缓冲
      // physicallyCorrectLights: true, // true/false 表示是否开启物理光照
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animate);
    this.renderer.setClearColor(0x000000, 0);

    // this.renderer.clearDepth();

    // this.renderer.shadowMap.enabled = true;
    // this.renderer.outputColorSpace = SRGBColorSpace; // 可以看到更亮的材质，同时这也影响到环境贴图。
    this.viewerDom.appendChild(this.renderer.domElement);
  }

  private initControl() {
    this.controls = new OrbitControls(this.camera as Camera, this.renderer?.domElement);
    this.controls.enableDamping = true;
    this.controls.screenSpacePanning = false; // 定义平移时如何平移相机的位置 控制不上下移动
    this.controls.dampingFactor = 0.2;
    this.controls.minDistance = 20;
    this.controls.maxDistance = 150;
    this.controls.maxPolarAngle = Math.PI / 2;
    this.controls.addEventListener("change", () => {
      this.renderer.render(this.scene, this.camera);
    });
  }

  private initSkybox() {
    if (!this.skyboxs) this.skyboxs = new SkyBoxs(this);
    this.skyboxs.addSkybox("night");
    this.skyboxs.addFog();
  }

  private initLight() {
    // 环境光
    this.ambientLight = new AmbientLight(0xffffff, 0.6);
    this.scene.add(this.ambientLight);
    // 创建一个方向光实例
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1).normalize();
    // light.castShadow = true;

    // light.shadow.camera.top = 180;
    // light.shadow.camera.bottom = -100;
    // light.shadow.camera.left = -120;
    // light.shadow.camera.right = 400;
    // light.shadow.camera.near = 0.1;
    // light.shadow.camera.far = 400;
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    this.directionalLight.shadow.mapSize.set(1024, 1024);

    this.scene.add(this.directionalLight);
  }

  // 渲染dom
  private readerDom() {
    this.renderer?.render(this.scene as Scene, this.camera as Camera);
  }

  // 更新dom
  private updateDom() {
    this.controls.update();
    // 更新参数
    this.camera.aspect = this.viewerDom.clientWidth / this.viewerDom.clientHeight; // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
    this.camera.updateProjectionMatrix(); // 更新摄像机投影矩阵。在任何参数被改变以后必须被调用,来使得这些改变生效
    this.renderer.setSize(this.viewerDom.clientWidth, this.viewerDom.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio); // 设置设备像素比
  }
  // 模型加载完成的回调函数
  public onModelLoaded() {
    const duration = 1200;
    const moveFunc = TWEEN.Easing.Cubic.Out;
    // 创建一个Tween对象，从当前的zoom值到目标值

    setTimeout(() => {
      new TWEEN.Tween(this.camera)
        .to({ zoom: 1 }, duration) // 目标值和动画持续时间（毫秒）
        .easing(moveFunc) // 缓动函数
        .onUpdate(() => {
          debugger;
          this.camera.updateProjectionMatrix(); // 更新投影矩阵，重要！
        })
        .start();

      const tweenl1 = new TWEEN.Tween(this.ambientLight)
        .to({ intensity: this.ambientLightIntensity }, duration) // 目标值和动画持续时间（毫秒）
        .easing(moveFunc) // 缓动函数
        .onUpdate(delta => {
          debugger;
          this.ambientLight.intensity = delta.intensity;
        })
        .start();

      const tweenl2 = new TWEEN.Tween(this.directionalLight)
        .to({ intensity: this.directionalLightIntensity }, duration) // 目标值和动画持续时间（毫秒）
        .easing(moveFunc) // 缓动函数
        .onUpdate(delta => {
          this.directionalLight.intensity = delta.intensity;
          // console.log(delta.intensity);
        })
        .start();
    }, 1500); // 1秒后开始 Tween
  }

  /**自定义鼠标事件触发的范围，给定一个模型组，对给定的模型组鼠标事件才生效 */
  public setRaycasterObjects(objList: THREE.Object3D[]): void {
    this.raycasterObjects = objList;
  }

  private getRaycasterIntersectObjects(): THREE.Intersection[] {
    if (!this.raycasterObjects.length) return [];
    this.raycaster.setFromCamera(this.mouse, this.camera);
    return this.raycaster.intersectObjects(this.raycasterObjects, true);
  }

  // 设置俯视图
  public setLookDown() {
    const moveFunc = TWEEN.Easing.Cubic.Out;
    const duration = 1000;

    // console.log(camera);
    // console.log(camera.quaternion);
    // console.log(camera.rotation);

    const tween = new TWEEN.Tween({
      // 相机开始坐标
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      // 相机开始指向的目标观察点
      tx: this.controls.target.x,
      ty: this.controls.target.y,
      tz: this.controls.target.z,
      qw: this.camera.quaternion.w,
      qx: this.camera.quaternion.x,
      qy: this.camera.quaternion.y,
      qz: this.camera.quaternion.z,
      rx: this.camera.rotation.x,
      ry: this.camera.rotation.y,
      rz: this.camera.rotation.z
    })
      .to(
        {
          // 相机结束坐标
          x: 0,
          y: 100,
          z: 1,
          // 相机结束指向的目标观察点
          tx: 0,
          ty: 0,
          tz: 0,
          qw: 0.70711,
          qx: -0.70711,
          qy: 0,
          qz: 0,
          rx: -Math.PI / 2,
          ry: 0,
          rz: 0
        },
        duration
      )
      .easing(moveFunc) // 缓动函数
      .onUpdate(e => {
        //小程序中使用e，H5中使用this，获取结束的位置信息
        // 动态改变相机位置
        this.camera.position.set(e.x, e.y, e.z);
        // 模型中心点
        this.controls.target.set(e.tx, e.ty, e.tz);
        // camera.quaternion.copy(e.tx, e.ty, e.tz);
        // camera.quaternion.set(e.qx, e.qy, e.qz, e.qw);
        // camera.rotation.set(e.rx, e.ry, e.rz);
        this.controls.update(); //内部会执行.lookAt()
        this.camera.updateProjectionMatrix(); // 更新投影矩阵
      })
      .start();
  }

  // 设置正视图
  public setLookFront() {
    // 移动相机到长方体的右边
    // camera.position.x = 0;
    // camera.position.z = 5;
    // camera.position.y = Math.tan(THREE.MathUtils.degToRad(25)) * 5; // 根据倾斜角度调整Y轴位置

    // controls.target.x = 0;
    // controls.target.y = 0;
    // controls.target.z = 0;

    const moveFunc = TWEEN.Easing.Cubic.InOut;
    const duration = 1000;

    const tween = new TWEEN.Tween({
      // 相机开始坐标
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      // 相机开始指向的目标观察点
      tx: this.controls.target.x,
      ty: this.controls.target.y,
      tz: this.controls.target.z
    })
      .to(
        {
          // 相机结束坐标
          x: this.initCameraPositionX,
          y: this.initCameraPositionY,
          z: this.initCameraPositionZ,
          // 相机结束指向的目标观察点
          tx: 0,
          ty: 0,
          tz: 0
        },
        duration
      )
      .easing(moveFunc) // 缓动函数
      .onUpdate(e => {
        //小程序中使用e，H5中使用this，获取结束的位置信息
        // 动态改变相机位置
        this.camera.position.set(e.x, e.y, e.z);
        // 模型中心点
        this.controls.target.set(e.tx, e.ty, e.tz);
        this.controls.update(); //内部会执行.lookAt()
        this.camera.updateProjectionMatrix(); // 更新投影矩阵
      })
      .start();
  }

  // 设置轴视图
  public setLookLeft() {
    const moveFunc = TWEEN.Easing.Cubic.Out;
    const duration = 1000;

    const tween = new TWEEN.Tween({
      // 相机开始坐标
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z,
      // 相机开始指向的目标观察点
      tx: this.controls.target.x,
      ty: this.controls.target.y,
      tz: this.controls.target.z
    })
      .to(
        {
          // 相机结束坐标
          x: -43,
          y: 61,
          z: 86,
          // 相机结束指向的目标观察点
          tx: 0,
          ty: 0,
          tz: 0
        },
        duration
      )
      .easing(moveFunc) // 缓动函数
      .onUpdate(e => {
        //小程序中使用e，H5中使用this，获取结束的位置信息
        // 动态改变相机位置
        this.camera.position.set(e.x, e.y, e.z);
        // 模型中心点
        this.controls.target.set(e.tx, e.ty, e.tz);
        this.controls.update(); //内部会执行.lookAt()
        this.camera.updateProjectionMatrix(); // 更新投影矩阵
      })
      .start();
  }
}
