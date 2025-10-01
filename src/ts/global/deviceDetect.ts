//检测设备是否为移动设备
export const isMobile = (() => {
    const ua = navigator.userAgent;
    // 常见的移动端关键字
    const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(ua);
})();