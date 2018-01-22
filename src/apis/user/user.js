import fetch from 'utils/fetch';

export function getUserList(params={}) {
  return fetch({
    url: '/user/list',
    method: 'get',
    params:params
  });
}

export function deleteUser(id=null){
	return fetch(
	{
		url:'/user/delete/'+id,
		method:"delete"
	})
}