import { request } from '@/plugins/request'

// 获取articles列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// 获取用户收藏的articles列表
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 添加喜欢
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

//  根据slug删除喜欢
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

// 根据slug获取article
export const getArticleBySlug = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

// 根据article.slug获取评论
export const getCommentsBySlug = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}

// 添加评论
export const addCommentToArticle = (slug, data) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/comments`,
    data
  })
}

// 删除评论
export const deleteComment = (slug, id) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/comments/${id}`
  })
}

// 新建article
export const CreateArticle = data => {
  return request({
    method: 'POST',
    url: '/api/articles',
    data
  })
}

// 删除文章
export const DeleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`
  })
}

export const EditArticle = (slug, data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${slug}`,
    data
  })
}