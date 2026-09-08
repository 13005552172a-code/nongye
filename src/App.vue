<template>
    <VideoStreamPlayer />
    <!-- 农田风格切换按钮（位置在组件 style 里的 .farm-btn--left / .farm-btn--right 中调整） -->
    <FarmToggleButton v-model="trackVisible" @toggle="handleTrackToggle" />
    <!-- 第二个按钮：pos="right" 放到右下角，文字用 text 属性改 -->
    <FarmToggleButton v-model="fieldVisible" text="农田地块" pos="right" @toggle="handleFieldToggle" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoStreamPlayer from './components/VideoStreamPlayer.vue'
import FarmToggleButton from './components/FarmToggleButton.vue'
import { clearPOlygon3D, playPolygon3D, PylogonePlace } from './view/First/index.ts'

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
    // if / else if 结构：以后加别的状态或按钮，直接往下加 else if 就行
    if (visible) {
        // TODO: 选中 —— 在这里写显示插秧机轨迹的方法
        // 例如：加载 19号田插秧机310TS18402400290.json 并渲染轨迹
        console.log('显示插秧机轨迹')
        PylogonePlace()
    } else if (!visible) {
        // TODO: 取消选中 —— 在这里写隐藏/清除轨迹的方法
        console.log('隐藏插秧机轨迹')
        clearPOlygon3D()
    }
}

// ==================== 农田地块按钮 ====================

// 按钮选中状态：true = 已选中，false = 未选中
const fieldVisible = ref(false)

/**
 * 农田地块按钮点击回调
 * @param visible 点击后按钮的状态
 *               - true  => 本次点击是「选中」
 *               - false => 本次点击是「取消选中」
 */
const handleFieldToggle = (visible: boolean) => {
    if (visible) {
        // TODO: 选中 —— 在这里写显示农田地块的方法
        console.log('显示农田地块')
        playPolygon3D()
    } else if (!visible) {
        // TODO: 取消选中 —— 在这里写隐藏农田地块的方法
        console.log('隐藏农田地块')
        clearPOlygon3D()
    }
}
</script>
