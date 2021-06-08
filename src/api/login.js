import axios from 'axios'
import { Message } from 'element-ui'
const BASE_URL = 'http://172.16.1.12:8080/jeecg-boot'
export async function login(_data) {
	return new Promise((res, rej) => {
		axios.request({
			url: 'http://192.168.2.4:8080/jeecg-boot/sys/login',
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
