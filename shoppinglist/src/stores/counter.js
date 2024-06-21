import { ref } from 'vue'

import { defineStore } from 'pinia'



import { getShoppingApi, postShoppingApi, deleteShoppingApi, putShoppingApi } from '../api/shoppingList'

export const useListStore = defineStore('lists', () => {

  const shoppingList = ref([])

  const uuid = ref('')

  const getShoppingList = async () => {
    const response = await getShoppingApi()
    shoppingList.value = response
  }


  const addShopping = async (newItem) => {
    const response = await postShoppingApi(newItem)
    getShoppingList()

  }

  const deleteShopping = async (id) => {
    await deleteShoppingApi(id)
    getShoppingList()
  }

  const updateShopping = async (id, updatedItem) => {
    const response = await putShoppingApi(id, updatedItem)
    getShoppingList()
  }

  return { shoppingList, getShoppingList, addShopping, deleteShopping, updateShopping, uuid }

})

import { getUsersApi } from '@/api/Users'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {

  //userouter要放在顶层
  const router = useRouter()

  const users = ref([])

  const inputUser = ref('')

  const inputPassword = ref('')

  const loginUser = ref('')
  getUsersApi().then(data => {
    users.value = data
  })

  const login = async () => {
    const user = users.value.find(user => user.name === inputUser.value)
    if (user) {
      if (user.password === inputPassword.value) {
        localStorage.setItem('isLogin', true)
        router.push('/shoppinglist')
        loginUser.value = user.name
      } else {
        alert('密码错误')
      }
    } else {
      alert('用户不存在')
    }
  }

  return { users, inputPassword, inputUser, login, loginUser }
})