const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
//var draft="https://ca.indeed.com/jobs?q=software&l=Canada"
var data=[]
//var li = 'https://ca.indeed.com/jobs?q=software&l=Canada&start=340';
var db = "indeed_data_try"
const storeData = (data, path) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}


const loadData = (path) => {
  try {
    return fs.readFileSync(path, 'utf8')
  } catch (err) {
    console.error(err)
    return false
  }
}


const insertData = (path,data) => {
  try {
    var original_data = fs.readFileSync(path, 'utf8');
        data=original_data+data;
        fs.writeFileSync(path, JSON.stringify(data))
  } catch (err) {
    console.error(err)
    return false
  }
}

const craw = (link,filename)=>{

	var all_data=[]
	var address
	var t
	var tem
	var restem=[]
	var resadd=[]
	var temp=""
	var res_add=[]
	var res_tem=[]
	var res_t=[]
			
	request(link, (err, res) => {
		if (err) {
	    	console.log(err.code)
		}
		else {
	    	let $ = cheerio.load(res.body)
	    	t= $('div .title a').text()

	    	address= $('.sjcl .company').text()
	    	//address= $('.sjcl span').text()
	    	tem= $('.summary').text()
	    	t=t.split("\n")
	    	t.splice(0,1)
	    	tem=tem.split("\n ")
	    	tem.splice(0,2)
	    	address=address.split("\n")
	 	for(var i=0,len=address.length;i<len;i++){
	 		if(address[i]!=''){
	 			resadd.push(address[i]);
	 		}
	 	}

	 	for (var i=0,len=tem.length;i<len;i++){
	 		if(tem[i]==""&& temp!=""){
	 			restem.push(temp);
	 			temp="";
	 		}
	 		else{
	 			temp+=tem[i];
	 		}
	 	}
	 	restem.push(temp);
	 //console.log(restem.length);
	 //console.log(resadd.length);
	 //console.log(t.length);
	 for (var i=0,len=t.length;i<len;i++){
	 	all_data.push({"job":t[i],"company": resadd[i],"description":restem[i]});
	 }
	 console.log(filename)
	 storeData(all_data,filename);
	
	}

	}

	)
	}
//get data from jobs' information from 'link'(e.g.indeed), and save those data in to 'file'

var web_list=['']
for (var i=1,end=35;i<end;i++){
    web_list.push("&start="+(i*10).toString())
}

var draft="https://ca.indeed.com/jobs?q=software&l=Canada"

for(var i=0,len = web_list.length; i <len;i++){
    var res_draft=draft+web_list[i];
    craw(res_draft,i.toString()+".json");
    //console.log(craw(res_draft));
}
