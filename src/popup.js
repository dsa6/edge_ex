/*global chrome*/
// 获取当前选项卡url
const  localUrl = async()  => {
    const tabs=await chrome.tabs.query({
        'active': true,
        'windowId': chrome.windows.WINDOW_ID_CURRENT})
    return tabs[0].url
 }
 //读取cookie
 const readCookies=async(url) => {
   let cookies=await chrome.cookies.getAll({
       // 设置要访问的网站
       url:url
   })
   return cookies
 }
 //输出cookie
 function consoleCookies(cookies) {
   //按k-v存储cookie
   // for(let index in cookies){
   //     cookieList[cookies[index].name]=cookies[index].value
   // }
   for (let i in cookies){
       alert(cookies[i].name+'='+cookies[i].value)
   }
 }
 //获取当前选项卡ID
 // function getCurrentTabId(callback)
 // {
 //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
 //     {
 //         if(callback) callback(tabs.length ? tabs[0].id: null);
 //     });
 // }
 //发送消息
 // function sendMessageToContentScript(message, callback)
 // {
 //     getCurrentTabId((tabId) => {
 //         chrome.tabs.sendMessage(tabId, message, res=>{
 //             if(callback){
 //                 callback(res);
 //             }
 //         });
 //     });
 // }

//写入cookie
function init(){
    localStorage.setItem('sealReq',0)
    localUrl().then(res =>{
        let url='http://'+res.split('//')[1].split('/')[0].replace(':8080','')
        readCookies(url).then(res =>{
            url=url.replace('http://','')
            let cookies={}
            //写到本地localStorage
            for (let i in res){
                cookies[res[i].name]=res[i].value
            }
            localStorage.setItem(url,JSON.stringify(cookies))
        })
    })
}
export {init,localUrl}














