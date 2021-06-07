import service from '../utils/request'


// 获取技术分解列表
export const getjssgl = (data) => {
  return service({
    url: '/Jsfjglb/queryTerritorys',
    method: 'POST',
    data
  })
}
// 新增领域
export const addLingyu = (data) => {
  return service({
    url: '/Jsfjglb/add',
    method: 'POST',
    data
  })
}
// 新增专题
export const addZhuanti = (data) => {
  return service({
    url: '/Jsfjglb/adds',
    method: 'POST',
    data
  })
}
// 新增技术
export const addJishu = (data) => {
  return service({
    url: '/Jsfjglb/addss',
    method: 'POST',
    data
  })
}
// 编辑领域
export const editLingyu = (idd, data) => {
  return service({
    url: `/Jsfjglb/${idd}`,
    method: 'POST',
    data
  })
}
// 技术编辑
export const editJishu = (idss, data) => {
  return service({
    url: `/Jsfjglb/${idss}`,
    method: 'POST',
    data
  })
}
// 获取关键技术列表
export const getgjjs = (data) => {
  return service({
    url: '/gjjsglb/queryGjjs',
    method: 'POST',
    data
  })
}
// 获取技术信息
export const getjsxinxi = (data) => {
  return service({
    url: '/Jsfjglb/queryTerritory',
    method: 'POST',
    data
  })
}
// 添加关键技术
export const addguanjianjs = (data) => {
  return service({
    url: '/gjjsglb/add',
    method: 'POST',
    data
  })
}
// 删除关键技术
export const deleteGuanjianjsjk = (idss, data) => {
  return service({
    url: `/gjjsglb/${idss}`,
    method: 'POST',
    data
  })
}
// 获取关键程度评估基本信息
export const getGuanjianjsxinxi = (id) => {
  return service({
    url: `/gjjsglb/queryGjjsPg/${id}`,
    method: 'POST',
    // data
  })
}
// 技术关键程度评估
export const getGuanjianjsAssess = (id, data) => {
  return service({
    url: `/gjjsglb/maturity/three/${id}`,
    method: 'POST',
    data
  })
}
