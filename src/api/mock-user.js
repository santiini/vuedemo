import fetch from 'utils/axios';

export function getList() {
  return fetch({
    url: '/user/list',
    method: 'get'
  });
}

export function getArticle() {
  return fetch({
    url: '/user/detail',
    method: 'get'
  });
}

