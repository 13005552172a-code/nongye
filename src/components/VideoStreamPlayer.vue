<template>
    <div class="stream-page">
        <div id="player" class="stream-player"></div>
        <!-- 加载 / 断线重连遮罩 -->
        <transition name="fade">
            <div v-show="loading" class="stream-loading">
                <div class="loading-spinner"></div>
                <div class="loading-text">{{ statusText }}</div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import handleEvent from '../stores/handleEvent'
import onReady, { resetIsOnReady } from '../stores/onReady'

const statusText = ref('系统正在加载......')
const loading = ref(true)

let player: {
    destroy?: () => void
    resize?: () => void
    getAPI?: () => any
} | null = null

// 断线重连倒计时器
let reTimer: ReturnType<typeof setInterval> | null = null

// 出现这些错误码时自动重连
const NEED_RECONNECT_CODES = [
    1006, 1008, 1013, 4000, 4001, 4002, 4003, 4004, 4005, 4006, 4007, 4008, 4009, 4100, 4101, 4102, 4103, 4105, 4107
]

const handleResize = () => {
    player?.resize?.()
}

/**
 * 连接关闭回调
 * 按错误码决定：自动倒计时重连 / 仅提示原因
 */
const handleClose = (event?: { code?: number; reason?: string }) => {
    // 没有指定工程文件时，加上 pid=-1 让服务器随便指定一个工程文件
    if (event?.code === 4009) {
        location.href += location.href.indexOf('?') === -1 ? '?pid=-1' : '&pid=-1'
        return
    }
    if (event?.code && NEED_RECONNECT_CODES.includes(event.code)) {
        loading.value = true
        statusText.value = event.reason || '连接已断开，正在重新连接......'
        // 重置 onReady 状态，重连成功后重新执行场景初始化
        resetIsOnReady()
        if (reTimer) clearInterval(reTimer)
        let i = 5
        reTimer = setInterval(() => {
            statusText.value = `${event.reason || '连接已断开'}，${i}s后重新连接`
            if (i === 0) {
                if (reTimer) clearInterval(reTimer)
                reTimer = null
                statusText.value = '系统正在加载......'
                reConnect()
            }
            i--
        }, 1000)
    } else {
        loading.value = true
        statusText.value = event?.reason || '视频流连接已断开。'
    }
}

const reConnect = () => {
    initPlayer()
}

const initPlayer = () => {
    if (!window.DigitalTwinPlayer) {
        statusText.value = 'AirCity SDK 未加载，请检查 public/aircity 脚本。'
        return
    }

    const host = window.HostConfig?.Manager || window.HostConfig?.Player
    const iid = window.Common_config?.iid

    if (!host || !iid) {
        statusText.value = '视频流配置缺失，请检查 HostConfig 和 Common_config。'
        return
    }

    // AirCityAPI 初始化选项
    const apiOptions = {
        onReady: () => {
            // 场景初始化（天气、UI、相机、事件绑定等）
            onReady()
            loading.value = false
        },
        onApiVersion: () => {},
        onEvent: (e: any) => {
            handleEvent(e)
        },
        onLog: () => {},
        useColorLog: false // 仅用于SDK测试页面，二次开发请设置为false
    }

    player = new window.DigitalTwinPlayer(host, {
        domId: 'player',
        iid,
        pid: null,
        apiOptions,
        keyEventReceiver: 'video', // 三维键盘交互事件接收者，可选的值：document / video / none
        ui: {
            startupInfo: true, // 初始化过程中是否显示详细信息
            statusIndicator: true, // 左上角闪烁的状态指示灯
            statusButton: false, // 是否在左下角显示信息按钮
            fullscreenButton: false, // 是否在右下角显示全屏按钮
            homeButton: false, // 是否显示"回到初始位置"按钮
            taskListBar: 1 // 任务队列：0永不显示 / 1耗时操作时显示 / 2一直显示
        },
        onloaded: () => {
            handleResize()
        },
        onclose: handleClose
    })

    // 获取 __g API，赋值给全局，供场景代码使用
    __g = player.getAPI?.() ?? null
}

onMounted(() => {
    initPlayer()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (reTimer) clearInterval(reTimer)
    player?.destroy?.()
    player = null
    __g?.destroy?.()
    __g = null
})
</script>

<style scoped>
.stream-page {
    position: relative;
    width: 100%;
    height: 100%;
    background: #000;
}

.stream-player {
    width: 100%;
    height: 100%;
}

/* 加载 / 断线遮罩 */
.stream-loading {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    background: rgba(0, 0, 0, 0.85);
}

.loading-spinner {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 3px solid rgba(80, 167, 208, 0.25);
    border-top-color: #50a7d0;
    animation: spin 0.8s linear infinite;
}

.loading-text {
    color: #50a7d0;
    font-size: 14px;
    letter-spacing: 1px;
}

/* 遮罩淡入淡出 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
