function trimImg(img) {
  let canvas = document.createElement('canvas');
  let cw = canvas.width = img.naturalWidth;
  let ch = canvas.height = img.naturalHeight;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  let imgData = ctx.getImageData(0, 0, cw, ch).data;
  let alphaData = imgData.filter((val, index) => index % 4 === 0);

  function findIndexByPos(row, col) {
    return cw * row + col;
  }

  function findAlphaByPos(row, col) {
    return alphaData[findIndexByPos(row, col)];
  }

  // 一行一行由上到下掃描 找出第一個 alpha > 0 的位置
  function findTopPos() {
    for (let row = 0; row < ch; row++) {
      for (let col = 0; col < cw; col++) {
        let alpha = findAlphaByPos(row, col);
        if (alpha > 0) {
          return { row, col };
        }
      }
    }
  }

  // 一行一行由下到上掃描 找出第一個 alpha > 0 的位置
  function findBottomPos() {
    for (let row = ch; row > 0; row--) {
      for (let col = 0; col < cw; col++) {
        let alpha = findAlphaByPos(row, col);
        if (alpha > 0) {
          return { row, col };
        }
      }
    }
  }

  // 一列一列由左到右掃描 找出第一個 alpha > 0 的位置
  function findLeftPos() {
    for (let col = 0; col < cw; col++) {
      for (let row = 0; row < ch; row++) {
        let alpha = findAlphaByPos(row, col);
        if (alpha > 0) {
          return { row, col };
        }
      }
    }
  }

  // 一列一列由右到左掃描 找出第一個 alpha > 0 的位置
  function findRightPos() {
    for (let col = cw; col > 0; col--) {
      for (let row = 0; row < ch; row++) {
        let alpha = findAlphaByPos(row, col);
        if (alpha > 0) {
          return { row, col };
        }
      }
    }
  }

  let topPos = findTopPos();
  let bottomPos = findBottomPos();
  let leftPos = findLeftPos();
  let rightPos = findRightPos();

  let trimCanvas = document.createElement('canvas');
  let trimCtx = trimCanvas.getContext('2d');
  let trimCw = trimCanvas.width = rightPos.col - leftPos.col;
  let trimCh = trimCanvas.height = bottomPos.row - topPos.row;
  trimCtx.drawImage(canvas, leftPos.col, topPos.row, trimCw, trimCh, 0, 0, trimCw, trimCh);
  return trimCanvas;
}