const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  var dataArray=new Array()
  dataArray.push(year,month,day)
  return dataArray
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

// function json2Form(json) {
//   var str = [];
//   for (var p in json) {
//     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
//   }
//   return str.join("&");
// }
// module.exports = {
//   json2Form: json2Form,
// }