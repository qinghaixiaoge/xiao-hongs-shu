function delay(duration = 2000){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve()
        },duration)
    })
}
export async function getData(nums){
    await delay()
    return new Array(nums).fill(0).map(item=>{
        const i = Math.floor(Math.random() * 11) + 1 //[0,11]
        return {
            id: 0,
            isVideo: Math.random() >= 0.5 ? 0 : 1,
            imageUrl : require(`@/mock/images/${i}.jpg`),
            content : i % 2 != 0 ? "我们这么拼" : "走出第一步，下一步就变得简单。想做的事，就在今天做吧，不要让未来的自己遗憾。",
            avatar: require(`@/mock/images/${i}.jpg`),
            author: `Xiao_Yu${i}`,
            likeCount: Math.floor(Math.random() * 1000)
        }
    })
}