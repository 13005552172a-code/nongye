/**
 * AirCity 3D 场景初始化
 *
 * 当视频流连接成功后，此函数会被调用。
 * 负责场景基础设置、天气、相机位置等。
 */

// 记录 onReady 是否已执行
let isOnReady = false
export const getIsOnReady = () => isOnReady

// 断线重连时重置，让重连成功后能重新执行场景初始化
export const resetIsOnReady = () => {
    isOnReady = false
}

/**
 * 场景基础设置
 * - 隐藏指南针
 * - 隐藏主界面 UI
 * - 重置场景
 */
const initScene = () => {
    __g.settings.setCampassVisible(false)
    __g.settings.setMainUIVisibility(false)
    __g.reset(1)
}

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
}

/**
 * onReady 回调
 * 视频流连接成功后自动执行
 */
const onReady = async () => {
    if (isOnReady) return
    isOnReady = true

    console.log('[AirCity] onReady - 场景初始化开始')

    // 1. 场景基础设置
    initScene()

    // 2. 天气初始化
    initWeather()

    // 3. 设置相机位置 ([x, y, z, 俯仰角, 偏航角, 滚转角], 视角模式)
    __g.camera.set([612194.809063, 2657027.984844, 413.476406, -18.165979, -24.901295, -0], 0)

    console.log('[AirCity] onReady - 场景初始化完成')
}

export default onReady
