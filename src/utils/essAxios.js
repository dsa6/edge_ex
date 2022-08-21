import {localUrl} from "@/popup";
import axios from "axios";

export const addSeals=(seals)=>{
    let token=JSON.parse(localStorage.getItem('119.45.7.196'))['Admin-Token']
    let headers = {
        // "Accept": "application/json, text/plain, */*",
        // "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": 'Bearer ' + token
    }
     if(token!=null || token!=''){
         let headers = {
             // "Accept": "application/json, text/plain, */*",
             // "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
             "Content-Type": "application/json;charset=UTF-8",
             "Authorization": 'Bearer ' + token
         }
         for(let i in seals){
             axios({
                 url:'http://119.45.7.196:8080/ess-admin/apply/info',
                 method:'post',
                 headers:headers,
                 data:{
                     "applyInfoId": null,
                     "applyType": "0",
                     "unitId": seals[i].in,
                     "jbrCardData": seals[i].clientName,
                     "jbrCardType": null,
                     "jbrCardName": seals[i].clientDes,
                     "applyState": null,
                     "applyUserId": null,
                     "applyTime": null,
                     "reviewUserId": null,
                     "reviewTime": null,
                     "makeUserId": null,
                     "makeTime": null,
                     "tempFile": null,
                     "sealDetailId": null,
                     "sealName": seals[i].name
                 }
             }).then(res=>{
                 if(res.data.code==401){
                     alert('Error重新登录一下,再试试')
                     return
                 }
             }).
             catch(res=>{
                alert('Error重新登录一下,再试试')
                return
             })
         }
     }else {
        return 0
     }

}
export const subSealReq=(sealReq)=>{
    let token=JSON.parse(localStorage.getItem('119.45.7.196'))['Admin-Token']
    let headers = {
        // "Accept": "application/json, text/plain, */*",
        // "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": 'Bearer ' + token
    }
    if(sealReq!=null||sealReq!=''){
        for(let i in sealReq){
            console.log(sealReq[i]['in'])
            axios({
                url:'http://119.45.7.196:8080/ess-admin/apply/review/agree',
                method:'post',
                headers:headers,
                data:sealReq[i]['in']
            }).then(res=>{
                return 1
            }).
            catch(res=>{
                alert('Error重新登录一下,再试试')
                return 0
            })
        }
    }else{
        alert('没有需要审核的印章')
        return 0
    }

}
//查询所有申请
export const checkSealReq=()=>{
    let token=JSON.parse(localStorage.getItem('119.45.7.196'))['Admin-Token']
    let headers = {
        // "Accept": "application/json, text/plain, */*",
        // "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": 'Bearer ' + token
    }
    axios({
              url:'http://119.45.7.196:8080/ess-admin/apply/review/list?pageNum=1&pageSize=100',
              method:'get',
              headers:headers
          }).then(res=>{
        if(res.data.rows.length>0){
            let sealReq= [],temp={}
            for(let i in res.data.rows){
                let tmp={}
                tmp['sealReqId']=res.data.rows[i]['sealName']
                tmp['in']=res.data.rows[i]['applyInfoId']
                tmp['addTime']=res.data.rows[i]['applyTime']
                tmp['username']=res.data.rows[i]['applyUserName']
                sealReq.push(tmp)
            }
            localStorage.setItem('sealReq',JSON.stringify(temp['data']=sealReq))
        }else{
            localStorage.setItem('sealReq',0)
        }

    }).
    catch(res=>{
        alert('Error重新登录一下,再试试')
        console.log(res);
        return 0
    })
}