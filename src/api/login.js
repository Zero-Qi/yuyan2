import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_API
console.log(BASE_URL);
import { Message } from 'element-ui'
export async function login(_data) {
	console.log(BASE_URL);
	return new Promise((res, rej) => {
		axios.request({
			url: BASE_URL + '/sys/login',
			data: {..._data},
			method: 'POST'
		}).then(resp => {
			console.log('请求成功');
			res(resp)
		}).catch((err) => {
            Message.error('请求错误')
            rej(err.data)
		})

	})
}
