export const postUserLogin = (data: UserLoginDTO) => {
  return request<UserLoginVO>('/user/login', { data })
}

export const postUserLogout = () => {
  return request('/user/logout')
}

export const getUserinfo = (id: number) => {
  return request<UserinfoVO>(`/user/${id}`, { method: 'GET', loading: false })
}

export const putUserinfo = (data: UserinfoUpdateDTO) => {
  return request('/user/update', { data })
}

export const getRichText = (query: { type: number | string }) => {
  return request<string>('/richtext', { method: 'GET', params: { ...query } })
}
