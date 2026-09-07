export {}

declare global {
    interface Window {
        DigitalTwinPlayer: new (
            host: string,
            options: Record<string, unknown>
        ) => {
            destroy?: () => void
            resize?: () => void
            getAPI?: () => any
        }
        HostConfig?: {
            Manager?: string
            Player?: string
            Path?: string
            UseHttps?: boolean
            PlayerMapping?: string
        }
        Common_config?: {
            title?: string
            iid?: string
            isDTS?: boolean
            reset?: () => void
            calculateSize?: (val?: number, defaultWidth?: number) => number
        }
    }

    // AirCity 全局 API 对象（通过 player.getAPI() 获取）
    var __g: any
}
