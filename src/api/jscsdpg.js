import service from '../utils/request'
//评估任务管理接口
//获得数据
export const getPgrw = (num,size) => {
  return service({
    url: '/jscsdpg/maturity',
    method: 'GET',
  })
}
//删除
export const delPgrw = (id) => {
  return service({
    url: '/jscsdpg/maturity/' + id,
    method: 'DELETE',
  })
}


//下载
export const downfile = (id,type) => {
  return service({
    url: '/fjb/download/'+ id + '?type='+ type,
    method: 'GET',
    responseType:'arraybuffer',
    headers:{
      "Content-Type" : "application/ms-word"
    }
  })
}
//上传报告
export const scbg = (id,data) => {
  return service({
    url: '/fjb/upload/'+ id + '?type=6',
    method: 'POST',
    headers:{
      "Content-Type": "multipart/form-data",
    },
    data
  })
}
//上传评估
export const Uploadwjzz = (id,data) => {
  return service({
    url: '/fjb/upload/'+ id + '?type=5',
    method: 'POST',
    headers:{
      "Content-Type": "multipart/form-data",
    },
    data
  })
}
//第四部汇总
export const hz = (id) => {
  return service({
    url: '/jscsdpg/maturity/jg/'+id,
    method: 'GET',
  })
}
//输入专家意见，输入评估表
export const shuruPg = (id,data) => {
  return service({
    url: '/jscsdpg/maturity/three/'+id,
    method: 'POST',
    data
  })
}
//选择专家组
export const selectZjz = (id,data) => {
  return service({
    url: '/jscsdpg/maturity/two/'+id,
    method: 'POST',
    data
  })
}
// 获取技术度成熟度评估
export const getgjjs = (data) => {
  return service({
    url: '/gjjsglb/queryGjjs',
    method: 'POST',
    data
  })
}
export const getOnegjjs = (data) => {
  return service({
    url: '/jscsdpg/maturity/one',
    method: 'POST',
    data
  })
}
export const getAddzjz = (data) => {
  return service({
    url: '/Zjglb/queryTerritory',
    method: 'POST',
    data
  })
}

