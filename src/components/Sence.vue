<template>
  <div class="top-button-wrapper">
    <CuButton class="button-item" name="轴视图" @click="onLookLeft" />
    <CuButton class="button-item" name="俯视图" @click="onLookDown" />
    <CuButton class="button-item" name="正视图" @click="onLookFront" />
  </div>
  <div id="three"></div>
  <Popover ref="popoverRef" :top="popoverTop" :left="popoverLeft" :data="popoverData"></Popover>
</template>

<script lang="ts" setup name="Sence">
/* eslint-disable */
import { ref, onMounted, type Ref } from "vue";
import Viewer, { type Animate } from "@/modules/Viewer";
import Floors from "@/modules/Floors";
import ModelLoader from "@/modules/ModelLoder";
import * as THREE from "three";
import gsap from "gsap";
import Event from "@/modules/Viewer/Events";
import BoxHelperWrap from "@/modules/BoxHelperWrap";
import { checkNameIncludes, findParent } from "@/utils";
import { demoData } from "@/mock/floorData";
import { bedConfigs } from "@/mock/bedConfig";
import { bedTextConfigs } from "@/mock/bedTextConfig";

import Popover from "./Popover/index.vue";
import CuButton from "@/components/cu-button/index.vue";

let viewer: Viewer;
let modelLoader: ModelLoader;
let boxHelperWrap: BoxHelperWrap;

const popoverRef: Ref = ref(null);
const popoverTop = ref(0);
const popoverLeft = ref(0);
const popoverData = ref<any>({});

let office: any = null;
let oldOffice: any = null;
let dataCenter: any = null;
let oldDataCenter: any = null;
let modelSelect = ["zuo0", "zuo1", "zuo2", "zuo3", "zuo4", "zuo5"];
let modelSelectName = "";
let modelMoveName = "";
let isModelSelectName = false;
// let cube1, cube2, bed03, bed04, bedIndex;
const bed03 = ref(null);
const bed04 = ref(null);
const cube1 = ref(null);
const cube2 = ref(null);
// const bedPanel = ref();
const bedPanel = ref(false);
const INTERSECTED = ref<THREE.Intersection>();
const UPPERED = ref(null);

onMounted(() => {
  init();
  initModel();
});

const init = () => {
  viewer = new Viewer("three");
  // viewer.addAxis();
  // viewer.addStats();
  viewer.initRaycaster();

  modelLoader = new ModelLoader(viewer);
  // const floors = new Floors(viewer);
  // floors.addGird();

  boxHelperWrap = new BoxHelperWrap(viewer);

  viewer.emitter.on(Event.mousedown.raycaster, bedIndex => {
    onMouseClick(bedIndex);
  });

  viewer.emitter.on(Event.mousemove.raycaster, bedIndex => {
    onMouseMove(bedIndex);
  });

  // viewer.emitter.on(Event.mousemove.raycaster, (list: THREE.Intersection[]) => {
  //   onMouseMove(list);
  // });
};

const initModel = () => {
  modelLoader.loadModel("/models/model-small.glb", gltf => {
    // baseModel.setScalc(0.15);
    // baseModel.object.rotation.y = Math.PI / 2;
    const mesh = gltf.scene;
    centerModel(mesh);
    loadMiniBed();
    // loadPanel()
  });
};
// const loadPanel = () => {
//   if (bedPanel.value && bedPanel.value) {
//                 bedPanel.value.style.display = 'inline-block';
//                 bedPanel.value.style.top = mouseEvent ? mouseEvent.clientY + 'px' : 0;
//                 bedPanel.value.style.left = mouseEvent ? mouseEvent.clientX + 'px' : 0;
//                 if (bedIndex) {
//                     let bedData = demoData.data[bedIndex];
//                     let patient_name = '';
//                     if (bedData.patinet_name) {
//                         patient_name = `, patient_name: ${bedData.patinet_name},`;
//                     }
//                     let enum_sex = '';
//                     if (bedData.enum_sex) {
//                         enum_sex = `, enum_sex: ${bedData.enum_sex},`;
//                     }
//                     bedPanel.value.textContent = `dic_room_id: ${bedData.dic_room_id}, dic_bed_id: ${bedData.dic_bed_id}${patient_name}${enum_sex}`;
//                 }

//             } else {
//                 if (bedPanel.value) {
//                     bedPanel.value.style.display = 'none';
//                 }
//             }
// }

// 模型局中
const centerModel = obj => {
  // 计算模型的包围盒
  const box = new THREE.Box3().setFromObject(obj);
  const center = new THREE.Vector3();

  // 计算模型中心
  box.getCenter(center);

  let ratio = 1;

  // 将模型中心平移到场景的原点
  obj.translateX(-center.x * ratio);
  // obj.translateY(-center.y * ratio);
  obj.translateZ(-center.z * ratio);

  // 缩小模型
  obj.scale.set(ratio, ratio, ratio); // 将模型缩小至原来的50%
};

// 加载床位小场景
const loadMiniBed = () => {
  const bedsData = demoData.data;
  bedConfigs.forEach((bedInfo, i) => {
    if (bedInfo.length > 0) {
      let bedData = bedsData.find(t => t.dic_bed_id == i + 1);
      let bed;
      if (bedData && bedData.enum_sex && bedData.enum_sex == 1) {
        bed = addMaleBed(bedInfo[0], bedInfo[1], bedInfo[2], bedInfo[3]);
      } else if (bedData && bedData.enum_sex && bedData.enum_sex == 2) {
        bed = addFemaleBed(bedInfo[0], bedInfo[1], bedInfo[2], bedInfo[3]);
      } else {
        bed = addEmptyBed(bedInfo[0], bedInfo[1], bedInfo[2], bedInfo[3]);
      }

      if (i == 2) {
        modelLoader.setBed03(bed);
        // bed03.value = bed;
      } else if (i == 3) {
        modelLoader.setBed04(bed);
        // bed04.value = bed;
      }
    }
  });
  // 添加床位编号
  modelLoader.loadFont("fonts/helvetiker_regular.typeface.json", res => {
    bedTextConfigs.forEach((bedTextInfo, index) => {
      const bedInfo = bedConfigs[index];
      modelLoader.addBedText(bedInfo[0], bedInfo[2], bedTextInfo[3]);
    });
  });
  // 添加透明立方体
  modelLoader.loadCube((cub1, cub2) => {
    cube1.value = cub1;
    cube2.value = cub2;
  });
};

// 添加空床位
const addEmptyBed = (x, y, z, rotation) => {
  // modelLoader.loadBed(x, y, z, rotation, "models/model-bed-default.glb");
  return modelLoader.addBedCube(x, y, z, rotation, 0xc7c7c7, 0x3e3e3e);
};

// 添加女床位
const addMaleBed = (x, y, z, rotation) => {
  return modelLoader.addBedCube(x, y, z, rotation, 0x00e1ff, 0x005f6c);
  // modelLoader.loadBed(x, y, z, rotation, "models/model-bed-male.glb");
};

// 添加男床位
const addFemaleBed = (x, y, z, rotation) => {
  // modelLoader.loadBed(x, y, z, rotation, "models/model-bed-female.glb");
  return modelLoader.addBedCube(x, y, z, rotation, 0xff729a, 0x64162c);
};

// 轴视图
const onLookLeft = () => {
  modelLoader.setLookLeft();
};
// 俯视图
const onLookDown = () => {
  modelLoader.setLookDown();
};
// 正视图
const onLookFront = () => {
  modelLoader.setLookFront();
};

// const onMouseMove = event => {
//   console.log("event", event);
//   // mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
//   // mousePointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
//   // mouseEvent = event;
// };

// const  onMouseDown = (event) => {
//     if (INTERSECTED.value.value == cube1 || INTERSECTED.value.value == cube2) {
//         if (INTERSECTED.value.value != UPPERED) {
//             if (UPPERED) {
//                 downBed(UPPERED);
//             }
//         }

//         // 升起来
//         if (INTERSECTED.value.value == cube1) {
//             UPPERED = bed03;
//             bedIndex = 2;
//             upBed(UPPERED);

//         } else if (INTERSECTED.value.value == cube2) {
//             UPPERED = bed04;
//             bedIndex = 3;
//             upBed(UPPERED);
//         }
//     }
// }

// const upBed = bed => {
//   new TWEEN.Tween(bed.scale)
//     .to({ x: 1, y: bedScaleY, z: 1 }, 800) // 目标尺寸和动画持续时间
//     .easing(TWEEN.Easing.Cubic.Out) // 使用二次方缓动
//     .onComplete(() => {
//       bedPanel.value = true;
//     })
//     .start();
// };

// const downBed = bed => {
//   bedPanel.value = false;
//   new TWEEN.Tween(bed.scale)
//     .to({ x: 1, y: 1, z: 1 }, 800) // 目标尺寸和动画持续时间
//     .easing(TWEEN.Easing.Cubic.Out) // 使用二次方缓动
//     .start();
// };

const planeAnimate = (texture: any): Animate => {
  console.log(texture, "texture");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  const animateFn = {
    fun: () => {
      const count = texture.repeat.y;
      if (count <= 10) {
        texture.repeat.x += 0.01;
        texture.repeat.y += 0.02;
      } else {
        texture.repeat.x = 0;
        texture.repeat.y = 0;
      }
    },
    content: viewer
  };
  return animateFn;
};

const onMouseClick = bedIndex => {
  let bedData = demoData.data[bedIndex];
  console.log("bedData", bedData);
  popoverData.value = bedData;
  updateRackInfo(bedIndex);
};

const onMouseMove = showPanel => {
  if (!showPanel) {
    popoverRef.value.setShow(false);
  }
};

// const onMouseClick1 = (intersects: THREE.Intersection[]) => {
//   if (!intersects.length) return;
//   const selectedObject = intersects[0].object;
//   let selectedObjectName = "";
//   const findClickModel = (object: any) => {
//     console.log(object, "object");
//     if (object.type === "Group") {
//       selectedObjectName = object.name;
//     }
//     if (object.parent && object.type !== "Scene") {
//       findClickModel(object.parent);
//     }
//   };
//   findClickModel(selectedObject);
//   console.log(selectedObjectName);

//   // if (!selectedObjectName || !selectedObjectName.includes('办公楼')) {
//   //   // this.scene.remove(this.label);
//   //   return;
//   // }

//   // const selectedModel = viewer.scene.getObjectByName(selectedObjectName);
//   console.log(selectedObject, "selectedObject");

//   // 点击楼房
//   if (selectedObject.name.includes("zuo")) {
//     selectOffice(selectedObject.parent);
//   }

//   // 点击其他区域
//   if (!selectedObject.name.includes("zuo")) {
//     if (!isModelSelectName && oldOffice) {
//       let oldmodel = oldOffice.getObjectByName(modelMoveName);
//       office.object
//         .getObjectByName(modelMoveName)
//         .traverse(function (child: { isMesh: any; material: any; name: any }) {
//           if (child.isMesh) {
//             child.material = oldmodel.getObjectByName(child.name).material;
//           }
//         });
//     }
//   }
// };

function checkIsRack(obj: any): boolean {
  return checkNameIncludes(obj, "rack");
}

// const onMouseMove = (intersects: THREE.Intersection[]) => {
//   console.log("intersects", intersects);
//   if (!intersects.length) {
//     popoverRef.value.setShow(false);
//     boxHelperWrap.setVisible(false);
//     return;
//   }
//   const selectedObject = intersects[0].object || {};
//   let needClear = true;
//   let needDown = true;
//   if (selectedObject == cube1.value || selectedObject == cube2.value) {
//     needClear = false;
//     if (INTERSECTED.value != selectedObject) {
//       if (INTERSECTED.value) {
//         INTERSECTED.value.material.color.setHex(INTERSECTED.value.currentHex);
//         INTERSECTED.value.material.opacity = 0;
//       }
//       INTERSECTED.value = selectedObject;
//       INTERSECTED.value.currentHex = INTERSECTED.value.material.color.getHex();
//       // INTERSECTED.value.material.color.setHex(0x1be8ee);
//       INTERSECTED.value.material.color.setHex(0x2cf3f4);
//       INTERSECTED.value.material.opacity = 0.4;
//     } else {
//       needDown = false;
//     }
//   }

//   // let selectedObjectName = "";
//   // const findClickModel = (object: any) => {
//   //   if (object.name.includes("rack")) {
//   //     selectedObjectName = object.name;
//   //     return;
//   //   }
//   //   if (object.parent) {
//   //     findClickModel(object.parent);
//   //   }
//   // };

//   // // const findClickModel = (object: any) => {
//   // //   if (object.name.includes('zuo')) {
//   // //     selectedObjectName = object.name;
//   // //     return;
//   // //   }
//   // //   if (object.parent) {
//   // //     findClickModel(object.parent);
//   // //   }
//   // // };
//   // findClickModel(selectedObject);

//   // console.log(selectedObjectName, "--selectedObjectName---");
//   // console.log(selectedObject, "------selectedObject---------");
//   // const rack = findParent(selectedObject, checkIsRack);
//   // console.log(rack, "-------rack---------");
//   // if (rack) {
//   //   boxHelperWrap.attach(rack);
//   //   updateRackInfo(rack.name);
//   // }

//   // // if (!selectedObjectName || !selectedObjectName.includes('办公楼')) {
//   // //   // 重置模型
//   // //   // viewer.scene.children[viewer.scene.children.findIndex(o => o.name === '办公楼')] = office.object = oldOffice.clone();
//   // //   return;
//   // // }

//   // modelSelect.forEach((item: any) => {
//   //   if (item === selectedObject.parent?.name) {
//   //     modelMoveName = item;
//   //     if (modelSelectName === modelMoveName) return;
//   //     office.object
//   //       .getObjectByName(item)
//   //       .traverse(function (child: { isMesh: any; material: THREE.MeshPhongMaterial }) {
//   //         if (child.isMesh) {
//   //           child.material = new THREE.MeshPhongMaterial({
//   //             side: THREE.DoubleSide,
//   //             transparent: true,
//   //             depthTest: false,
//   //             depthWrite: true, // 无法被选择，鼠标穿透
//   //             color: "yellow",
//   //             opacity: 0.3
//   //           });
//   //         }
//   //       });
//   //   } else {
//   //     if (!isModelSelectName && oldOffice) {
//   //       let oldmodel = oldOffice.getObjectByName(item);
//   //       office.object.getObjectByName(item).traverse(function (child: { isMesh: any; material: any; name: any }) {
//   //         if (child.isMesh) {
//   //           child.material = oldmodel.getObjectByName(child.name).material;
//   //         }
//   //       });
//   //     }
//   //   }
//   // });
// };
const updateRackInfo = (name: string) => {
  if (name) {
    popoverRef.value.setShow(true, popoverData.value);
    const event = viewer.mouseEvent as MouseEvent;
    popoverTop.value = event.y - 200;
    popoverLeft.value = event.x;
  } else {
    popoverRef.value.setShow(false);
  }
};

const selectOffice = (model: any) => {
  modelSelectName = model.name;
  let oldmodel = oldOffice.getObjectByName(modelSelectName);
  let modelSelectIndex = modelSelect.findIndex(v => v === modelSelectName);
  office.object.children.forEach((child: any, index: number) => {
    child.children.forEach((Mesh: any) => {
      if (child.name === modelSelectName) {
        child.children.forEach((Mesh: { material: any; name: any }) => {
          Mesh.material = oldmodel.getObjectByName(Mesh.name).material;
        });
      } else {
        // Mesh.material = new THREE.MeshPhongMaterial({
        //   color: new THREE.Color('#123ca8'),
        //   transparent: true,
        //   opacity: 0.5,
        //   emissiveMap: Mesh.material.map,
        // });
      }
    });
    if (!model.userData.position && index > modelSelectIndex) {
      gsap.to(child.position, {
        y: !child.userData.position ? child.position.y + 60 : child.position.y,
        duration: 2,
        ease: "power1.inOut",
        onComplete: () => {
          child.userData.position = true;
        }
      });
    }
    if (model.userData.position && index <= modelSelectIndex) {
      if (child.userData.position) {
        gsap.to(child.position, {
          y: oldOffice.getObjectByName(child.name).position.y,
          duration: 2,
          ease: "power1.inOut",
          onComplete: () => {
            child.userData.position = false;
          }
        });
      }
    }
  });
};
</script>

<style scoped>
#three {
  height: 100%;
  width: 100%;
}
.top-button-wrapper {
  position: absolute;
  top: 1.2rem;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
}
.button-item {
  margin: 0 0.24rem;
}
</style>
