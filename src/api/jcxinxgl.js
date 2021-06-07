import service from '../utils/request'

// 获取专家列表
export const getzhuanjia = () => {
    return service({
      url: '/Zjglb/queryTerritory',
      method: 'POST',
    //   data
    })
}
// 新增专家
export const addZhuanjia = (data) => {
    return service({
      url: '/Zjglb/add',
      method: 'POST',
      data
    })
}
// 编辑专家
export const editZhuanjia = (id, data) => {
    return service({
      url: `/Zjglb/${id}`,
      method: 'POST',
      data
    })
}
