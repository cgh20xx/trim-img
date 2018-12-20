# trim-img
修剪圖片空白部份

![](example.png)

```javascript=
let img = document.querySelector('img');
let canvas = trimImg(img); // return canvas
document.body.appendChild(canvas);