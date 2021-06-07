 class Global{
/**
 * @param {String} regData 信息校验
 * @author haoyang shi
 * @example
 * username('123')
*/
    username(regData) {
          if (!new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$/).test(regData)) {
     
               return "用户名不能有特殊字符"
          }
          else if (/(^\_)|(\__)|(\_+$)/.test(regData)) {
               //    console.log("")
               return '用户名首尾不能出现下划线'
          }
          else if (/^\d+\d+\d$/.test(regData)) {
     
               //    console.log("")
               return '用户名不能全为数字'
          } else {
               return true
          }
     }
   pass(regData) {
          if (/^[\S]{6,12}$/.test(regData)) {
               return '密码必须6到12位，且不能出现空格'
          } else {
               return true
          }
     }
     str(regData) {
          if (/^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$/.test(regData)) {
               return '不能有特殊字符'
          } else {
               return true
          }
     }
     /**
      * 获取时分秒
      * @param {String} data 
      * @returns {String}
      */
 getDate(data) {
          const NewData = data;
              switch(data){
                   case'时分秒':
                   return   new Date().getHours() + ':' + new Date().getMinutes()+':'+new Date().getSeconds()
                   break;
                   case'年月日':
                   return   new Date().getFullYear() + ':' + new Date().getMonth()+':'+new Date().getDate()
                   break;
                   default:
                        return new RegExp()
              }

     }
    TestReg(data, regData) {
          const Datas = data;
          switch (Datas) {
               case 'username': return this.username(regData); break;
               case 'pass': return this.pass(regData); break;
               case 'str': return this.str(regData); break;
               default: return '厉害了我的哥'
     
          }
     }
     /**
      * 创建cookie
      * @param {String} key 
      * @param {String} value 
      * @param {String} t 失效 不传默认为空
      * @return {String}
      */
     Setcookie(key,value,t){
          let Da = new Date();
          Da.setTime(Da.getTime()+t*24*3600*1000);
          // document.cookie = key+'='+value+'
          /* expires=${Da.toGMTString() */
          document.cookie =`${key}=${value};}`
            console.log(document.cookie)
     }
       /**
      * 获取cookie
      * @param {String} key 
      */
     Getcookie(key){
         let arr = document.cookie.split(';');
         for(var  i = 0;i<arr.length;i++){
             var arr2 =arr[i].split('=');
             if(arr2[0] ==key){
                  return decodeURI(arr2[1])
             }
         }
     }
};
export default new Global()

