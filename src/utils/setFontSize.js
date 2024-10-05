// 开发尺寸的宽度
const width = 375
function setFontSize(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth / (width / 16) + 'px'
}
setFontSize()
window.onresize = setFontSize