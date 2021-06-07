import axios from 'axios'
const BASE_URL = 'http://localhost:8080/jeecg-boot'
import { Message } from 'element-ui'
export async function login(_data) {
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
