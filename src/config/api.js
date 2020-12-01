import axios from 'axios';
// import storage from './storage'
// let storage = ''
axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
import router from '../routers/index'
const API_URL = 'http://192.168.7.123:8080/api/'

//http request 拦截器
axios.interceptors.request.use(
	config => {
        config.data = JSON.stringify(config.data);
		config.headers = {
			// 'Content-Type': 'application/x-www-form-urlencoded'//form
			'Content-Type': 'application/json;charset=UTF-8', //json
			// 'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWpoIiwiaWF0IjoxNjA1MTczODE3LCJleHAiOjE2MDUyNjAyMTd9.akWXc7n0E6fVKw7NsEiOYHJ5zWhcfJy9qe934uLcbZ8'
			// 'Content-Type':'application/json;charset=UTF-8',
		}
		// if (localStorage.getItem('token')) { //请求头添加token
		// 	const token = localStorage.getItem('token');
		// 	console.log('request,token:' + token)
		// }
		config.headers['Authorization'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWpoIiwiaWF0IjoxNjA2NTgxNjg4LCJleHAiOjE2MDY2NjgwODh9.Xvc36lttuG6UAS_33XfHAvNbU2Y0NWkeo85duB-RXrI'

		// 
		// config.url = API_URL 
        config.url = 'http://192.168.7.123:8080/api/' + config.url
        console.log(config)
		return config;
	},
	error => {
		return Promise.reject(err);
	}
);
// console.log(this.$route)
// console.log(this)



//http response 拦截器
axios.interceptors.response.use(
	response => {
		console.log(response)
		if (response.data.code == 10021 || response.data.code == 10020) { //token过期 || token为空

			router.push('/login')
			// router.push({path:"/"})
			// console.log(router)
            // router.push(`/?redirect=${this.$route.fullPath}`)
            config.url = API_URL + config.url
		}
		return response;
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Get(url, params = {}) {
	return new Promise((resolve, reject) => {
		// link:
		axios.get(url, {
				params: params
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function Post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}
/*** delete
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function Delete(url, params) {
	return new Promise((resolve, reject) => {
	  axios.delete(url, params)
		.then(response => {
		  resolve(response.data);
		})
		.catch(err => {
		  reject(err)
		})
	})
  }