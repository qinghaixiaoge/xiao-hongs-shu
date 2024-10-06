export function wall(cardParentDom, colum = 2) {
    const cardArray = cardParentDom.children
    const viewWidth = window.innerWidth
    const margin = viewWidth * 0.015
    const cardWidth = (viewWidth - (colum + 1) * margin) / colum
    const heightArray = new Array(colum).fill(0)
    // 开始布局
    for (let i = 0; i < cardArray.length; i++) {
        // 得到高度的较低的一列
        const top = Math.min.apply(null, heightArray)
        const index = heightArray.indexOf(top)
        // 设置left
        const left = (index + 1) * margin + index * cardWidth
        cardArray[i].style.width = cardWidth + 'px'
        cardArray[i].style.transform = `translate(${left}px,${top}px)`;
        heightArray[index] += (margin + cardArray[i].offsetHeight)
    }
    const height = Math.max.apply(null, heightArray)
    cardParentDom.style.height = height + margin + 'px'
}