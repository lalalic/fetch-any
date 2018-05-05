# fetch-any

Extendible fetch, you can write native fetch unsupported scheme, such as file|data|memory.... 
## install
```sh
> npm install fetch-any
```

## fetch-any API
> support(fetcher)
any fetcher implementation should call this function to register itself.

## fetcher API
> support([url,[option]])
global fetch calls this function to choose a correct fetcher.
if no arguments, it should test for environment, such as node, or browser


## example

```js
//file.js to support file:///c:/temp/a.txt
var isNode=require("is-node")

module.exports=function(url,options){
	let path=url.trim().substr("file://".length)
	return new Response(require("fs").createReadStream(path),options)
}

module.exports.support=function(url){
	if(arguments.length==0){
		return isNode
	}else if(/^file:\/\//i.test(url.trim())){
		return true
	}else{
		return false
	}
}

fetch.support(module.exports)
```
