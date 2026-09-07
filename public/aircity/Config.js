var Common_config = {
    title: '数字孪生',
    iid: '2612328084290',
    isDTS: true,
    reset() {
        __g.reset(7)
    },
    calculateSize(val = 1, defaultWidth = 1920) {
        let nowClientWidth = document.documentElement.clientWidth
        return val * (nowClientWidth / defaultWidth)
    }
}
