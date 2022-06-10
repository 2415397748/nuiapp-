/**
	自定义校验规则
 */

//验证账号
export function validateaCcount (rule,value,data,callback) {
	const r = /^[0-9A-Za-z]{5,10}$/
	// 要求：由数字和字母组成，并且要同时含有数字和字母，且长度要在5-10位之间。
	if (value === null || value.trim() === '') {
		callback('不能为空')
	} else if (!r.test(value)) {
		callback('密码由有数字或字母组成，长度要在5-10位')
	} else {
		callback()
	}
}

//验证账号
export function validateaPassword (rule,value,data,callback) {
	const r = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/
	// 要求：由数字和字母组成，并且要同时含有数字和字母，且长度要在5-10位之间。
	if (value === null || value.trim() === '') {
		callback('不能为空')
	} else if (!r.test(value)) {
		callback('密码由有数字和字母组成，长度要在5-10位')
	} else {
		callback()
	}
}

