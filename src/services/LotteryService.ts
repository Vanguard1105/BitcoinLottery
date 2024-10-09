import ApiService from './ApiService'

export async function apiCreateLottery<
  T,
  U extends Record<string, unknown>
>(data: U) {
  return ApiService.fetchData<T>({
    url: '/create_lottery',
    method: 'post',
    data,
  })
}

export async function apiDeleteLottery<
  T,
  U extends Record<string, unknown>
>(data: U) {
  return ApiService.fetchData<T>({
    url: '/delete_lottery',
    method: 'post',
    data,
  })
}