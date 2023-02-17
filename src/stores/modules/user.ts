import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { login } from '@/api/sys'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/utils/constant'
// @ts-ignore
import md5 from 'md5'
import router from '@/router'

export const useUserStore = defineStore('user', () => {
  const token = ref(getItem(TOKEN))
  const userData = ref({})

  /**
   * 监听token的变化，存储到localStorage
   */
  watch(token, (newState: string, oldState: string) => {
    setItem(TOKEN, newState)
  })

  const loginAction = (username: string, password: string) => {
    return new Promise((resolve, reject) => {
      login({
        username,
        password: md5(password)
      })
        .then((data: any) => {
          token.value = data.token
          resolve(data)
          // 登录后操作
          router.push('/')
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { token, userData, loginAction }
})