<template>
    <div class="stream-page">
        <div id="player" class="stream-player"></div>
        <div v-if="statusText" class="stream-status">{{ statusText }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import handleEvent from './handleEvent'
import onReady from './onReady'

const statusText = ref('正在连接飞渡视频流...')

let player: {
    destroy?: () => void
    resize?: () => void
    getAPI?: () => any
} | null = null

// 保存 __g API 引用
let api: any = null

const handleResize = () => {
    player?.resize?.()
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

    player = new window.DigitalTwinPlayer(host, {
        iid,
        pid: null,
        domId: 'player',
        keyEventReceiver: 'video',
        apiOptions: {
            onReady: () => {
                statusText.value = ''
                // 获取 __g API
                api = player?.getAPI?.()
                // 执行场景初始化（天气、UI、相机、事件绑定等）
                onReady()
            },
            onApiVersion: () => {},
            onEvent: (e: any) => {
                handleEvent(e)
            },
            onLog: () => {},
            useColorLog: false
        },
        onloaded: () => {
            handleResize()
        },
        onclose: (event?: { reason?: string }) => {
            statusText.value = event?.reason || '视频流连接已断开。'
        }
    })
}

onMounted(() => {
    initPlayer()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    player?.destroy?.()
    api = null
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

.stream-status {
    position: absolute;
    top: 24px;
    left: 24px;
    z-index: 10;
    padding: 10px 14px;
    color: #fff;
    font-size: 14px;
    line-height: 1.4;
    background: rgba(0, 0, 0, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 8px;
}
</style>
