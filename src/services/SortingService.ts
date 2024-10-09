import ApiService from './ApiService'

export async function apiGetSalesDashboardData<
  T extends Record<string, unknown>
>() {
  return ApiService.fetchData<T>({
    url: '/sales/dashboard',
    method: 'post',
  })
}