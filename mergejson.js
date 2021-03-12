const fs = require('fs')
dic=[]

const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}

const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}


chart=[]
for(var i=0;i<35;i++){
	chart.push(i.toString()+".json");
}
//for (var i=0,len=chart.length;i<len;i++){
//	for(var j=0,lenj=eval(loadData(chart[i])).length;j<lenj;j++){
//
//	var temp=loadData(chart[i]).split("[")[0];
//	console.log(temp)
//}}
const str_dic = (file)=>{
	var temp=loadData(file);
	var res=[]
	var final_res=[]
	temp=temp.split('[')[1].split(']')[0]
	res=temp.split("},{")
	res[0]=res[0].substring(1);
	res[res.length-1]=res[res.length-1].substring(0,res[res.length-1].length-1);
	for(var i = 0,len=res.length;i<len;i++){
		var temp=res[i].split("\",\"");
		var temp_stage_2=[]
		for (var j=0,lenj=temp.length;j<lenj;j++){
			temp_stage_2.push(temp[j].split("\":\""));
		}
		for (var j=0,lenj=temp.length;j<lenj;j++){
			if (j==0){
				temp_stage_2[j][0]=temp_stage_2[j][0].substring(1)
			}
			if(j==2){
				temp_stage_2[j][1]=temp_stage_2[j][1].substring(0,temp_stage_2[j][1].length-1)
			}
		}
		var dic={};
		for (var j=0,lenj=temp_stage_2.length;j<lenj;j++ ){
			dic[temp_stage_2[j][0]] = temp_stage_2[j][1];
			//console.log(dic)
		}
		final_res.push(dic);
		
	}

	return(final_res)
}
var db_0=(str_dic("0.json"))
var db_1=(str_dic('1.json'))
var db_t=[]
var li=[db_0,db_1]
var li=[]
const input_files=(files)=>{
var res=[]
for(var i=0,len=files.length;i<len;i++){
	var list_temp=str_dic(files[i]);
	for(var j=0,lenj=list_temp.length;j<lenj;j++){
		res.push(list_temp[j]);
	}
}
console.log(res);
return res;
}
for (var i=0;i<35;i++){
	li.push(i.toString()+".json")
}
storeData(input_files(li),"total.json")
//console.log(db_t)
//var temp= loadData("1.json");
//console.log(typeof temp.split('['))
//temp = temp.split('[')[1].split(']')[0]
//res=res[0]
//res=(res.split('{')[1]).split("\",\"")
//for(var i = 0;i<3;i++){
//	res[i]=res[i].split("\":\"");
//	if(i==0){
//		res[i][0]=res[i][0].substring(1)
//	}
//	if(i==2){
//		res[i][1]=res[i][1].substring(0,res[i][1].length-1)
//	}
//}

//var resdic={"job":res[0][1],"company":res[1][1],"intro":res[2][1]}
//console.log(resdic)
