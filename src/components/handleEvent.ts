
const handleEvent = (e: any) => {
    if (!e) return

    // ========== 左键点击事件 ==========
    if (e.eventtype === 'LeftMouseButtonClick') {
        console.log(e)
    }
}

export default handleEvent
