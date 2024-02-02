import { reactive } from 'vue'

// 缓存值的接口定义
interface CacheValue {
  data: any // 存储的数据
  expireAt: number // 数据的过期时间戳
  timer?: any
}

// 使用缓存的功能函数
export function useCache() {
  // 创建一个响应式的Map对象来存储缓存
  const cache = reactive<Map<string, CacheValue>>(new Map())
  // 设置缓存的最大容量
  const max = 10
  // 使用一个数组来存储缓存的键，按照最近使用的顺序排序
  const keys = []

  /**
   * @param {string} key - 数据的键
   * @param {any} data - 要存储的数据
   * @param {number} cacheTime - 数据的缓存时间（以毫秒为单位）
   */
  function setDataToCache(key: string, data: any, cacheTime: number) {
    try {
      // 错误处理：确保所有参数都不为空
      if (!key || !data || !cacheTime) {
        throw new Error('参数不能为空')
      }
      // 错误处理：确保cacheTime是一个有效的正数字
      if (typeof cacheTime !== 'number' || isNaN(cacheTime) || cacheTime <= 0) {
        throw new Error('缓存时间必须是一个正数字')
      }
      // 计算过期时间戳
      const expireAt = Date.now() + cacheTime
      // 将数据和过期时间存储到缓存中
      cache.set(key, { data, expireAt })
      // 为每个缓存项设置一个定时器，当缓存过期时自动清除
      const timer = setTimeout(() => {
        cache.delete(key)
        // 从键数组中移除该键
        keys.splice(keys.indexOf(key), 1)
      }, cacheTime)
      // 将定时器的引用也存储到缓存中，方便取消
      cache.get(key)!.timer = timer
      // 将键添加到键数组的开头
      keys.unshift(key)
      // 如果缓存的数量超过了最大容量
      if (keys.length > max) {
        // 获取最久未使用的键
        const lastKey = keys.pop()!
        // 清除该键对应的缓存项和定时器
        clearTimeout(cache.get(lastKey)!.timer)
        cache.delete(lastKey)
      }
    } catch (error) {
      // 在控制台输出错误信息，方便调试
      console.error('在设置缓存时发生错误：', error)
      // 可以根据需要向用户发出警告或执行其他错误处理逻辑
    }
  }

  /**
   *getDataFromCache函数：尝试从缓存中获取数据
   *@param {string} key - 数据的键
   *@returns {any|null} 如果缓存存在且未过期，返回缓存的数据；否则返回null
   */
  function getDataFromCache(key) {
    try {
      // 如果缓存中存在这个键
      if (cache.get(key)) {
        // 获取键对应的缓存对象
        const { data, expireAt } = cache.get(key) as CacheValue
        // 如果当前时间还没有超过过期时间
        if (Date.now() < expireAt) {
          // 返回缓存的数据
          return data
        }
        // 如果缓存已过期，清除缓存项和定时器
        cache.delete(key)
        clearTimeout(cache.get(key)!.timer)
        // 从键数组中移除该键
        keys.splice(keys.indexOf(key), 1)
      }
    } catch (error) {
      console.error('在获取缓存数据时发生错误：', error)
    }
    // 如果缓存不存在或已过期，返回null
    return null
  }

  function clearAllCache() {
    // 清空缓存中的所有数据
    cache.clear()
    // 取消所有的定时器
    cache.forEach(value => {
      clearTimeout(value.timer)
    })
    // 清空键数组
    keys.length = 0
  }

  // 返回设置数据和获取数据的方法
  return { setDataToCache, getDataFromCache, clearAllCache }
}
