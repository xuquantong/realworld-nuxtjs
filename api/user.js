import { request } from '@/plugins/request'

//登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/api/users/login',
    data
  })
}

// 注册
export const register = data => {
  return request({
    method: 'POST',
    url: '/api/users',
    data
  })
}

// 更新用户信息
export const updateUser = data => {
  return request({
    method: 'PUT',
    url: '/api/user',
    data
  })
}

// 关注用户
export const followUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
  })
}
// 关注用户
export const unfollowUser = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
  })
}

// 获取用户信息
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}