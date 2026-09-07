<template>
    <button
        type="button"
        class="farm-btn"
        :class="{ 'is-selected': selected }"
        @click="handleClick"
    >
        <span class="farm-btn__dot"></span>
        <span class="farm-btn__text">{{ text }}</span>
    </button>
</template>

<script setup lang="ts">
// 农田风格切换按钮：点击选中，再次点击取消选中
withDefaults(
    defineProps<{
        /** 按钮文字 */
        text?: string
    }>(),
    { text: '插秧机轨迹' }
)

// 选中状态，支持 v-model
const selected = defineModel<boolean>({ default: false })

const emit = defineEmits<{ (e: 'toggle', value: boolean): void }>()

const handleClick = () => {
    selected.value = !selected.value
    emit('toggle', selected.value)
}
</script>

<style scoped>
.farm-btn {
    position: absolute;
    /* 按钮位置：距左 / 距下（在这里改，不用行内样式） */
    left: 24px;
    bottom: 24px;
    z-index: 20;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 18px;
    color: #f4f8ee;
    font-size: 14px;
    letter-spacing: 1px;
    user-select: none;
    cursor: pointer;
    /* 田垄纹 + 田绿底色 */
    background:
        repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.09) 0px,
            rgba(255, 255, 255, 0.09) 3px,
            transparent 3px,
            transparent 12px
        ),
        linear-gradient(160deg, #6f9d50, #47743a);
    border: 1.5px solid #8a6a45;
    border-radius: 12px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.35);
    transition: all 0.18s ease;
}

.farm-btn:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
}

/* 选中：田色更亮，田埂描边变稻穗金，呈按下效果 */
.farm-btn.is-selected {
    background:
        repeating-linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.12) 0px,
            rgba(255, 255, 255, 0.12) 3px,
            transparent 3px,
            transparent 12px
        ),
        linear-gradient(160deg, #93c95e, #3d7a2b);
    border-color: #e6b84f;
    box-shadow:
        0 0 0 2px rgba(230, 184, 79, 0.28),
        0 0 18px rgba(120, 190, 80, 0.45),
        inset 0 2px 5px rgba(0, 0, 0, 0.28);
    transform: translateY(1px);
}

.farm-btn__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: transparent;
    border: 1.5px solid rgba(244, 248, 238, 0.75);
    transition: all 0.18s ease;
}

.farm-btn.is-selected .farm-btn__dot {
    background: #ffd54f;
    border-color: #ffd54f;
    box-shadow: 0 0 6px rgba(255, 213, 79, 0.8);
}
</style>
