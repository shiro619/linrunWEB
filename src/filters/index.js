function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 浮点计算方法
const FloatFun = {
			/**
			* 加法运算，避免数据相加小数点后产生多位数和计算精度损失。
			*
			* @param num1加数1 | num2加数2
			*/
			'add': function(num1, num2) {
			    var baseNum, baseNum1, baseNum2;
			    try {
			        baseNum1 = num1.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum1 = 0;
			    }
		 	    try {
			        baseNum2 = num2.toString().split(".")[1].length;
			    } catch (e) {
			        baseNum2 = 0;
			    }
			    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
			    return parseInt((num1 * baseNum + num2 * baseNum) / baseNum * 10000) / 10000;
			},
			/**
			* 减法运算，避免数据相减小数点后产生多位数和计算精度损失。
			*
			* @param num1被减数  |  num2减数
			*/
			'sub': function(num1, num2) {
		    	var baseNum, baseNum1, baseNum2;
		    	var precision;// 精度
		    	try {
		    	    baseNum1 = num1.toString().split(".")[1].length;
		    	} catch (e) {
		     	    baseNum1 = 0;
		    	}
		    	try {
		        	baseNum2 = num2.toString().split(".")[1].length;
		    	} catch (e) {
		        	baseNum2 = 0;
		    	}
		    	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
		    	precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
		    	return parseInt(((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision) * 10000) / 10000;
			},
			/**
			* 乘法运算，避免数据相乘小数点后产生多位数和计算精度损失。
			*
			* @param num1被乘数 | num2乘数
			*/
			'multi': function(num1, num2) {
		    	var baseNum = 0;
		    	try {
		        	baseNum += num1.toString().split(".")[1].length;
		    	} catch (e) {
		    	}
		    	try {
		        	baseNum += num2.toString().split(".")[1].length;
		    	} catch (e) {
		    	}
		    	return parseInt(Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum) * 10000) / 10000;
			},
			/**
			* 除法运算，避免数据相除小数点后产生多位数和计算精度损失。
			*
			* @param num1被除数 | num2除数
			*/
//			'div': function(num1, num2) {
//		    	var baseNum1 = 0, baseNum2 = 0;
//		    	var baseNum3, baseNum4;
//		    	try {
//		        	baseNum1 = num1.toString().split(".")[1].length;
//		    	} catch (e) {
//		        	baseNum1 = 0;
//		    	}
//		    	try {
//		        	baseNum2 = num2.toString().split(".")[1].length;
//		    	} catch (e) {
//		        	baseNum2 = 0;
//		    	}
//		    	with (Math) {
//		        	baseNum3 = Number(num1.toString().replace(".", ""));
//		        	baseNum4 = Number(num2.toString().replace(".", ""));
//		        	return parseInt((baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1) * 10000) / 10000;
//		    	}
//			}
}