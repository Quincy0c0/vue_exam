import { ref, computed } from 'vue'

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