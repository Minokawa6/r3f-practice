class ThreeDDieData {
  constructor(modelPath, facePositions) {
    this.modelPath = modelPath;
    this.facePositions = facePositions;
  }

  getRotationFor(faceValue) {
    return this.facePositions.get(faceValue);
  }
}
