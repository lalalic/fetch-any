var fetch=require("isomorphic-fetch")

var supports=[]
module.exports=function(url,options){
	let fetcher=supports.find(a=>a.support(url,options))||fetch
	return fetcher.call(this,url,options)
}

module.exports.support=function(fetcher){
	let type
	if(!fetcher.support || (type=fetcher.support())){
		supports.push(fetcher)
		if(type){
			console.log(`fetch[${type}] installed`)
		}
	}else if(type){
		console.log(`fetch[${type}] discarded because of not supported environment`)
	}
	return module.exports
}

module.exports.support(require("./file"))

global.fetch = module.exports;
if(!global.Response.prototype.arrayBuffer){
	global.Response.prototype.arrayBuffer=global.Response.prototype.buffer
}
