export const initDataValue=(dataValue) =>{
    let sealList=[],tmpList={};
    tmpList=dataValue.value.split(/[\s\n]/)
    for(let i in tmpList){
        let seal={}
        if(tmpList[i]!=null && tmpList[i]!=''){
            let tmp;
            //将其拆分放入sealList
            tmp=tmpList[i].split('-').splice('——')
            if(tmpList[i].includes('-')){
                tmp=tmpList[i].split('-')
            }else if(tmpList[i].includes('——')){
                tmp=tmpList[i].split('——')
            }else{
                return 'error'
            }
            seal['name']=tmp[0]
            seal['in']=tmp[1]
            seal['clientName']='管理员'
            seal['clientDes']='管理员'
            sealList.push(seal)
        }
    }
    return sealList
}
