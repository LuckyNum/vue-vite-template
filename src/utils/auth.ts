import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/utils/constant'
import { setItem, getItem } from '@/utils/storage'

/**
 * 获取时间戳
 */
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}
/**
 * 设置时间戳
 */
export const setTimeStamp = () => {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 是否超时
 */
export const isCheckTimeout = () => {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()
  // @ts-ignore
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
