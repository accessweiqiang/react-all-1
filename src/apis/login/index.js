import fetch from 'utils/fetch';

export function login(username, password) {
    const data = {
        username,
        password
    }
    return fetch({
        url: '/login',
        method: 'post',
        data
    });
}


export function loginout() {
    return fetch({
        url: '/loginout',
        method: 'post'
    });
}



export function regist(userInfo){
	const data = userInfo;
	return fetch({
		url:"/regist",
		method:'post',
		data
	})

}