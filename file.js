module.exports=function(url,options={}){
	var path=url.trim().substr("file://".length)
	var fs=require("fs")
	return new Promise(function(resolve, reject){
		let opt=Object.assign({},options,{url})
		fs.access(path, fs.constants.R_OK, function(e){
			if(!e){
				resolve(new Response(fs.createReadStream(path),opt))
			}else{
				opt.status=400
				opt.statusText=e.message
				resolve(new Response("",opt))
			}
		})
	})
}

module.exports.support=function(url){
	if(arguments.length==0){
		return "file://"
	}else if(/^file:\/\//i.test(url.trim())){
		return true
	}else{
		return false
	}
}

require(".").support(module.exports)
