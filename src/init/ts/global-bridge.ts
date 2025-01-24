//动态的将模块的所有导出内容(export)挂载到全局作用域
export function exposeModuleToGlobal(module: any) {
    const global = window as any;
    for (const key in module) {
        if (module.hasOwnProperty(key)) {
            global[key] = module[key];
        }
    }
}