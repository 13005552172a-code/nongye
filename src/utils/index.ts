import proj4 from 'proj4'

// 使用proj4转换坐标 从EPSG:4326转换为EPSG:4547
// 4326是经纬度坐标系，4547是投影坐标系
// EPSG:4547 = CGCS2000 / 3-degree Gauss-Kruger CM 114E（中央经线114°，东偏500km）
export function transformEPSG4326ToEPSG4547(coordinate: [number, number], isReverse = false) {
    const projStr = '+proj=tmerc +lat_0=0 +lon_0=114 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs'
    proj4.defs('EPSG:4547', projStr)
    if (isReverse) {
        return proj4('EPSG:4547', 'EPSG:4326', coordinate)
    }
    return proj4('EPSG:4326', 'EPSG:4547', coordinate)
}
