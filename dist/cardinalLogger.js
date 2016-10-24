(function() {
    this.cardinalLogger=function(project,xuser,xtoken){
      var project_id=project;
      var user=xuser;
      var token=xtoken;
      window.onerror=function(msg, src, line, col, error){
        var params={
          msg:msg,
          project:project_id,
          programming:"js",
          url:src,
          lines:line,
          column:col,
          stack:error
        };
        if (msg.indexOf('Script error.') != -1) {
            return;
        }else{
          var xhr = null;
          if(window.XMLHttpRequest){
          	xhr = new XMLHttpRequest();
          }
          else if(window.ActiveXObject){
          	try{
          		xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
          	} catch(e){
          		try{
          			xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0");
          		}
          		catch(e){}
          	}
          }
          if(xhr==null){
            console.log("CardinalLogger does not work in this browser");
          }else{
            xhr.open("POST","https://app.cardinallab.com/api/logs");
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.setRequestHeader("X-User-Id",user);
            xhr.setRequestHeader("X-Auth-Token",token);
            xhr.send(JSON.stringify(params));
          }
        }
      };
      var logger={};
      var log=function(error){
        var params;
        if(typeof error.stack!= typeof undefined){
          params={
            msg:error.message,
            project:project_id,
            programming:"js",
            url:error.fileName,
            lines:error.lineNumber,
            column:error.columnNumber,
            stack:error.stack
          };
        }else{
          params={
            msg:error.message,
            project:project_id,
            programming:"js",
            url:error.fileName,
            lines:error.lineNumber,
            column:error.columnNumber
          };
        }
        if(typeof params.lines!= typeof undefined){

        }else{
          params.lines=error.stack.split("\n")[1];
          var index = params.lines.split(":");
          if(index.length==2){
            params.lines=index[0];
            params.column=index[1].substring(0, index[1].length - 1);
          }
          if(index.length==3){
            params.lines=index[1];
            params.column=index[2].substring(0, index[2].length - 1);
          }
          if(index.length==4){
            params.lines=index[2];
            params.column=index[3].substring(0, index[3].length - 1);
          }
        }
        if(typeof params.url!= typeof undefined){

        }else{
          params.url=error.stack.split("\n")[1];
          var index = params.url.split("http");
          index=index[1];
          var cache=index.split(":")[0];
          if(cache==""){
            index=index.split(":")[1];
          }else{
            index=cache;
          }
          params.url="http:"+index;
        }
        var xhr = null;
        if(window.XMLHttpRequest){
          xhr = new XMLHttpRequest();
        }
        else if(window.ActiveXObject){
          try{
            xhr = new ActiveXObject("Msxml2.XMLHTTP.6.0");
          } catch(e){
            try{
              xhr = new ActiveXObject("Msxml2.XMLHTTP.3.0");
            }
            catch(e){}
          }
        }
        if(xhr==null){
          console.log("CardinalLogger does not work in this browser");
        }else{
          xhr.open("POST","https://app.cardinallab.com/api/logs");
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
          xhr.setRequestHeader("X-User-Id",user);
          xhr.setRequestHeader("X-Auth-Token",token);
          xhr.send(JSON.stringify(params));
        }
      };
      logger.log=log;
      logger.project=project;
      logger.user=user;
      logger.token=token;
      return logger;
    };
    //var logger=new cardinalLogger();
}());
