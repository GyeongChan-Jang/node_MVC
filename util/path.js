const path = require('path')

// 프로젝트의 루트 경로를 찾아주는 함수
module.exports = path.dirname(process.mainModule.filename)
