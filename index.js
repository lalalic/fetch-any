var fetch=require("isomorphic-fetch")

var supports=[]
module.exports=function(url,options){
	var fetcher=supports.find(function(a){
		return a.support(url,options)
	})
	
	if(!fetcher){
		fetcher=fetch
	}
	
	return fetcher.call(this,url,options)
}

module.exports.support=function(fetcher){
	var type
	if(!fetcher.support || (type=fetcher.support())){
		supports.push(fetcher)
		if(type){
			console.log("fetch["+type"] installed")
		}
	}else if(type){
		console.log("fetch["+type+"] discarded because of not supported environment")
	}
	return module.exports
}

global.fetch = module.exports;
if(!global.Response.prototype.arrayBuffer){
	global.Response.prototype.arrayBuffer=global.Response.prototype.buffer
}
