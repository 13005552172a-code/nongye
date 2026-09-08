import { transformEPSG4326ToEPSG4547 } from '@/utils/index'
import trackData from '@/data/19号田插秧机310TS18402400290.json'
/*
 * 轨迹
 */
export const PylogonePlace = () => {
    __g.polygon3d.clear()
    ////使用Polygon3DStyle样式的polygon3d
    // 循环轨迹数据，把每个点的经纬度(EPSG:4326)转换成4547平面坐标
    const coordinates = trackData.features.map(feature => {
        const [lng, lat] = feature.geometry.coordinates
        const [x, y] = transformEPSG4326ToEPSG4547([lng, lat])
        return [x, y, 58]
    })
    let o1 = {
        id: 'p3d1',
        coordinates, // [x, y, 0] 4547平面坐标点集
        coordinateType: 0, //坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0
        color: [1, 0, 1, 1], //颜色值
        height: 10, //3D多边形的高度
        intensity: 1.0, //亮度
        viewHeightRange: [-100000000000000000000000000000, 10000000000000000000000000000], //可见高度范围
        style: 5, //3DPolygon的样式 请参照API开发文档选取枚举
        tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺
        tillingY: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺

        generateTop: false, //是否生成顶面
        generateSide: true, //是否生成侧面
        generateBottom: false, //是否生成底面
        bClip: false, //是否支持剖切
        depthTest: true //深度检测
    }
    let p3dArr = []
    p3dArr.push(o1)
    __g.polygon3d.add(p3dArr)
    console.log('插秧机轨迹渲染完成')
}
/*
 * 农田
 */
export const playPolygon3D = () => {
    __g.camera.set([613262.201562, 2656945.780625, 216.389199, -31.518372, -87.224854, 0.000004], 0)
    __g.polygon3d.clear()
    ////使用Polygon3DStyle样式的polygon3d
    let o1 = {
        id: 'farms',
        coordinates: [
            [613205.349063, 2657245.109375, 52.065322],
            [613221.9275, 2657230.1375, 53.74707],
            [613258.939531, 2657268.434063, 55.307773],
            [613245.510469, 2657282.706562, 54.994824],
            [613273.97, 2657314.2225, 55.999883],
            [613408.285781, 2657183.0425, 58],
            [613276.852812, 2657045.414063, 58.000078],
            [613139.744062, 2657177.675625, 55.999766]
        ],
        coordinateType: 0, //坐标系类型，取值范围：0为Projection类型，1为WGS84类型，2为火星坐标系(GCJ02)，3为百度坐标系(BD09)，默认值：0
        color: [1, 0, 1, 1], //颜色值
        height: 50, //3D多边形的高度
        intensity: 1.0, //亮度
        viewHeightRange: [0, 10000000000000], //可见高度范围
        style: 4, //3DPolygon的样式 请参照API开发文档选取枚举
        tillingX: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图横向平铺
        tillingY: 0, //可选，仅当3DPolygon的样式支持贴图显示，贴图纵向平铺
        generateTop: false, //是否生成顶面
        generateSide: true, //是否生成侧面
        generateBottom: false, //是否生成底面
        bClip: false, //是否支持剖切
        depthTest: true //深度检测
    }
    let p3dArr = []
    p3dArr.push(o1)
    __g.polygon3d.add(p3dArr)
}

export const clearPOlygon3D = () => {
    __g.polygon3d.clear()
}
