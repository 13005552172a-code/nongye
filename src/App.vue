<script setup lang="ts">
import { ref } from 'vue'
import VideoStreamPlayer from './components/VideoStreamPlayer.vue'
import FarmToggleButton from './components/FarmToggleButton.vue'

// ==================== 插秧机轨迹按钮 ====================

// 按钮选中状态：true = 已选中，false = 未选中
const trackVisible = ref(false)

/**
 * 插秧机轨迹按钮点击回调
 * 在这里写你自己的业务方法：
 * @param visible 点击后按钮的状态
 *               - true  => 本次点击是「选中」
 *               - false => 本次点击是「取消选中」
 */
const handleTrackToggle = (visible: boolean) => {
    if (visible) {
        // TODO: 选中 —— 在这里写显示插秧机轨迹的方法
        // 例如：加载 19号田插秧机310TS18402400290.json 并渲染轨迹
    } else {
        // TODO: 取消选中 —— 在这里写隐藏/清除轨迹的方法
    }
}
</script>

<template>
    <VideoStreamPlayer />
    <!-- 农田风格切换按钮（位置在组件 style 里的 .farm-btn 中调整） -->
    <FarmToggleButton v-model="trackVisible" @toggle="handleTrackToggle" />
</template>
