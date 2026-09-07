/**
 * AirCity 3D 场景初始化
 *
 * 当视频流连接成功后，此函数会被调用。
 * 负责设置天气、隐藏 UI、设置相机位置、绑定点击事件等。
 */

// 记录 onReady 是否已执行
let isOnReady = false
export const getIsOnReady = () => isOnReady

/**
 * 天气初始化
 * - 禁用雨雪
 * - 设置白天时间
 * - 设置雾、云层、日照、环境光
 */
const initWeather = () => {
    __g.weather.disableRainSnow()
    // 设置为白天
    __g.weather.setDateTime(2026, 7, 9, 10, 0, false)
    // 设置雾
    __g.weather.setFogParam(0, 0, 0, 1)
    __g.weather.setCloudDensity(0.4)
    __g.weather.setCloudHeight(15)
    __g.weather.setCloudThickness(2)
    // 重置日照
    __g.weather.setSunIntensity(5)
    // 重置环境光
    __g.weather.setAmbientLightIntensity(0.6)
    __g.settings.SetScreenControlsVisible(false)
}

/**
 * onReady 回调
 * 视频流连接成功后自动执行
 */
const onReady = async () => {
    if (isOnReady) return
    isOnReady = true

    console.log('[AirCity] onReady - 场景初始化开始')

    // 1. 天气初始化
    initWeather()

    // 2. 隐藏指南针
    // __g.settings.setCampassVisible(false)

    // 3. 隐藏主界面 UI
    __g.misc.setMainUIVisibility(true)

    // 4. 设置相机位置 (经度, 纬度, 高度, 俯仰角, 偏航角, 滚转角)
    // __g.camera.set(64.669062, -549.725312, 50.88562, -20.441519, -38.935188, 0)

    console.log('[AirCity] onReady - 场景初始化完成')

    // 5. 绑定视频元素点击事件（用于获取鼠标坐标）
    // bindVideoClick()
}

export default onReady
