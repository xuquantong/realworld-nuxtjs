const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, payload) {
    state.user = payload
  }
}

export const actions = {
  // 在服务端渲染期间自动调用，用来初始化容器数据，传递数据给客户端使用
  nuxtServerInit({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (error) {

      }
    }
    commit('setUser', user)
  }
}