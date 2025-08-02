import ThreeDDieSkin from "../../domain/objects/ThreeDDieSkin";
import gayumaD4File from "./Gayuma_256/D4_256.glb";
import gayumaD6File from "./Gayuma_256/D6_256.glb";
import gayumaD8File from "./Gayuma_256/D8_256.glb";
import gayumaD10File from "./Gayuma_256/D10_256.glb";
import gayumaD12File from "./Gayuma_256/D12_256.glb";
import gayuamD20File from "./Gayuma_256/D20_256.glb";
import gayumaD100File from "./Gayuma_256/D100_256.glb";

const d4 = {
  modelImport: gayumaD4File,
  facePositions: new Map([[1], [2], [3], [4]]),
};

const d6 = {
  modelImport: gayumaD6File,
  facePositions: new Map([
    [1, [-Math.PI / 2, Math.PI, Math.PI]],
    [2, [Math.PI, Math.PI / 2, Math.PI]],
    [3, [Math.PI, Math.PI, Math.PI / 2]],
    [4, [Math.PI * 2, Math.PI, -Math.PI / 2]],
    [5, [Math.PI, -Math.PI / 2, Math.PI]],
    [6, [Math.PI / 2, Math.PI, Math.PI]],
  ]),
};
const d8 = {
  modelImport: gayumaD8File,
  facePositions: new Map([[1], [2], [3], [4], [5], [6], [7], [8]]),
};
const d10 = {
  modelImport: gayumaD10File,
  facePositions: new Map([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]),
};

const d12 = {
  modelImport: gayumaD12File,
  facePositions: new Map([
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
    [10],
    [11],
    [12],
  ]),
};

const d20 = {
  modelImport: gayuamD20File,
  facePositions: new Map([
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
    [7],
    [8],
    [9],
    [10],
    [11],
    [12],
    [13],
    [14],
    [15],
    [16],
    [17],
    [18],
    [19],
    [20],
  ]),
};
const d100 = {
  modelImport: gayumaD100File,
  facePositions: new Map([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]),
};

export const gayuma = new ThreeDDieSkin({
  threeDD4: d4,
  threeDD6: d6,
  threeDD8: d8,
  threeDD10: d10,
  threeDD12: d12,
  threeDD20: d20,
  threeDD100: d100,
});
