/* Ver 1.5.0
   Created by NGY
*/
"use strict";
//Ajax 통신
var _Ajax = function(url, param, async){
  this.url = url; 
  this.param = param; 
  this.async = async;
}
_Ajax.prototype =  {
    result: null,
    Call: function() {
        var req = new XMLHttpRequest();
        var param_str = "&";
            for(var key in this.param)
            {
              if(typeof(this.param[key]) === 'object')
              {param_str +=  key + "=" + JSON.stringify(this.param[key]) + "&";} 
              else
              {param_str +=  key + "=" + this.param[key].toString() + "&";}
            }
            param_str = param_str.substring(0, param_str.length - 1);
            console.log(param_str);
            req.open('GET', this.url + param_str, this.async);
            req.setRequestHeader('Content-type', 'application/json');
                console.log('%c<url address>: ' + this.url, 'background: #000000; color: #ffcc66');
                console.log('%c<-----input data----->', 'background: #000000; color: #ff3333');
                console.log(this.param);
            req.send();
            if (req.status === 200) {
                 this.result = this.Parse(req.responseText);
                 console.log('%c<-----output data----->', 'background: #000000; color: #33ccff');
                 console.log(this.result);
            }           
            req.onload = function (e) {
             if (req.readyState === XMLHttpRequest.DONE) {
               if(req.status === 200) {
                 this.result = this.Parse(req.responseText);
                 console.log('%c<-----output data----->', 'background: #000000; color: #33ccff');
                 console.log(this.result);
               } 
               else {
                console.log(e);
               }
             }
            }.bind(this);
      return req;      
    },
    Parse: function(json_str) {  
        var Exp, arr, parsedata;
            Exp =/,[a-z]/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, ',"' + value[1]);
              });
            }
            Exp =/,[0-9]/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, ',"' + value[1]);
              });
            }   
            Exp =/[a-z]: "/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, value[0] + '": "');
              });
            }
            Exp =/[a-z]:\[/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, value[0] + '":[');
              });
            }
            Exp =/[a-z]:"/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, value[0] + '":"');
              });
            }
            Exp =/[0-9]: "/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, value[0] + '": "');
              });
            }
            Exp =/[0-9]:\[/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, value[0] + '":[');
              });
            }
            Exp =/[0-9]:"/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                json_str = json_str.replace(value, value[0] + '":"');
              });
            }
            Exp =/{[a-z]/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                 json_str = json_str.replace(value, '{"' + value[1]);
              });
            }
            Exp =/{[0-9]/gi;
            arr = json_str.match(Exp);
            if(!!arr){
              arr.forEach(function(value, index){
                 json_str = json_str.replace(value, '{"' + value[1]);
              });
            }
            return JSON.parse(json_str);
    }
}
var Ajax = Object.create(_Ajax.prototype, {
  url:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  }, 
  param:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  }, 
  async:{
      value: true,
      configurable: false,
      enumerable: false,
      writable: true
  } 
});


//LOADER 생성
var _Loader = function(url, param, async){

}
_Loader.prototype =  {
  Pop: function(){
    var node1 = document.createElement("div");
        node1.setAttribute("id", "background");
        node1.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.75);"); 
        document.body.appendChild(node1);   
    var $background = document.getElementById("background");
    var node2 = document.createElement("div");
        node2.setAttribute("id", "loader");
        node2.setAttribute("class", "loader");
        node2.setAttribute("style", "position: fixed; top: 50vh; left: 50vw; border: 2px solid white;");
        $background.appendChild(node2);
    var node3 = document.createElement("div");
        node3.setAttribute("id", "loading");
        node3.innerText = "LOADING";
        node3.setAttribute("style", "position:fixed; left:50vw; top:50vh; margin-top: 60px; margin-left: -25px; color: white; font-weight: bold;");
        $background.appendChild(node3);
  },
  Close: function(){
        document.getElementById("background").outerHTML='';
  }
}
var Loader = Object.create(_Loader.prototype);


//데이터 정렬
var _Sort =  function(array, val){
    this.array = array;
    this.val = val;
}
_Sort.prototype = {
  Ascend: function(){
    this.array.sort(function (a, b) {
      if((typeof(a[this.val])==="number")&&(typeof(b[this.val])==="number"))
      {
        return a[this.val] - b[this.val];
      }
      else if((typeof(a[this.val])==="string")&&(typeof(b[this.val])==="string"))
      {
        return String(a[this.val]).localeCompare(String(b[this.val]));
      }
    }.bind(this));
    return this.array;
  },
  Descend: function(){
    this.array.sort(function (a, b) {
      if((typeof(a[this.val])==="number")&&(typeof(b[this.val])==="number"))
      {
        return b[this.val] - a[this.val];
      }
      else if((typeof(a[this.val])==="string")&&(typeof(b[this.val])==="string"))
      {
       return String(b[this.val]).localeCompare(String(a[this.val]));
      }
    }.bind(this));
    return this.array;
  },
  Reverse: function(){
    return this.array.reverse();
  },
  Max: function(){
    return this.Descend()[0];
  },
  Min: function(){
    return this.Ascend()[0];
  },
  Sum: function(){
    var sum = 0;
    var num = 0;
    this.array.forEach(function(v, i){
    num = parseInt(String(v[this.val]));
    if(typeof(num) === 'number'){
      sum += num;
    }else{
      return false;
    }
    }.bind(this));
    return sum;
  }
}
var Sort = Object.create(_Sort.prototype, {
  array:{
      value: [],
      configurable: false,
      enumerable: false,
      writable: true
  }, 
  val:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  }
});

//모달창 생성
var _Modal = function(title, content, footer){
    this.title = title;
    this.content = content;
    this.footer = footer;
    this.newNode;
};
_Modal.prototype = {	
	Create: function(){
        this.newNode = document.createElement('div');
        this.newNode.setAttribute("class", "modal");
        this.newNode.innerHTML = "<div class='modalhead'>" + this.title + "</div>";
        this.newNode.innerHTML += "<div class='modalbody'>" + this.content + "</div>"; 
        this.newNode.innerHTML += "<div class='modalfooter'>" + this.footer + "</div>"; 
        this.body[0].appendChild(this.newNode); 
	},
	Pop: function(){
    var node1 = document.createElement("div");
        node1.setAttribute("id", "background");
        node1.setAttribute("style", "position: fixed; top: 0px; left: 0px; width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.75);"); 
        document.body.appendChild(node1);  
    var $background = document.getElementById("background");
        $background.appendChild(this.newNode);
	},
  Close: function(){
        document.getElementById("background").outerHTML='';
  }
}
var Modal = Object.create(_Modal.prototype, {
  title:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  }, 
  content:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  },
  footer:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  },
  newNode:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  },
  body:{
      value: document.getElementsByTagName("body"),
      configurable: false,
      enumerable: false,
      writable: false
  },

});

//검색 관련 함수
var _SearchList =  function(nval, array){
    this.nval = nval; 
    this.array = array; 
  }
  _SearchList.prototype = {
   Match: function(){
       var result = [];
       if(!!this.nval.length)
       { 
        if(typeof(this.array) === 'object'){
          var filtered_array = this.arr.filter(function(obj){return JSON.stringify(obj).match(this.nval)}.bind(this));
              filtered_array.forEach(function(v, i){
                if(typeof(v) === 'object')
                {
                  for(var entry in v){
                    if(!!String(entry).match(this.nval)){ result.push(v[entry]) }
                  }
                }
                else
                {
                    result.push(v);
                } 
              }.bind(this));
        }
      }
      return result;
   }
  }
var SearchList = Object.create(_SearchList.prototype, {
  nval:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  }, 
  array:{
      value: [],
      configurable: false,
      enumerable: false,
      writable: true
  }
});

//문자열 관련 함수
String.prototype.Currency = function(){
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
String.prototype.unCurrency = function(){
    return this.replace(/,/g, "");
}
String.prototype.unSpecial = function(){
    var Exp =/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
    return this.replace(Exp, "");
}

//날짜 관련 함수
Date.prototype.OnedayToSeconds = 86400000;
Date.prototype.Today = function(){
    var mm = this.getMonth() + 1; 
    var dd = this.getDate();
    return [this.getFullYear(),(mm>9 ? '' : '0') + mm,(dd>9 ? '' : '0') + dd].join('');
}
Date.prototype.diffDate = function(date1, date2){  
    var diff;
    var d1= date1.substr(0,4) + '/' +date1.substr(4,2) + '/' +date1.substr(6,2);
    var d2= date2.substr(0,4) + '/' +date2.substr(4,2) + '/' +date2.substr(6,2);
    var ndate1 = new Date(d1);
    var ndate2 = new Date(d2);
    diff = (ndate2 - ndate1 ) / this.OnedayToSeconds ;
    return diff;
}
Date.prototype.beforeDate = function(diff){
    var date = new Date();
    var last = new Date(date.getTime() - diff * this.OnedayToSeconds);
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
      if(String(day).length === 1){day = "0"+String(day);}
      if(String(month).length === 1){var month = "0"+String(month);}
    return String(year) + String(month) + String(day);
}
Date.prototype.afterDate = function(diff){
    var date = new Date();
    var last = new Date(date.getTime() + diff * this.OnedayToSeconds);
    var day =last.getDate();
    var month=last.getMonth()+1;
    var year=last.getFullYear();
      if(String(day).length === 1){day = "0"+String(day);}
      if(String(month).length === 1){var month = "0"+String(month);}
    return String(year) + String(month) + String(day);
}

//색상 관련 함수
 var _Color = function(image, light, croma){
   this.image = image;
   this.light = light;
   this.croma = croma;
   this.dots;
 }
 _Color.prototype = {
  Distance: function(array){
    if((typeof(array) === 'object')&&(array.length >= 3)){
       return Math.floor(Math.sqrt(array[0]*array[0] + array[1]*array[1] + array[2]*array[2]));
    }
    else{console.log("Type or length error!")}
  },
  Cromatic: function(array){
    if((typeof(array) === 'object')&&(array.length >= 3)){
      var avg = (array[0] + array[1] + array[2])/3;
      var dev = Math.sqrt((avg - array[0])*(avg - array[0]) + (avg - array[1])*(avg - array[1]) + (avg - array[2])*(avg - array[2]));
      return Math.floor(dev);
    }
    else{console.log("Type or length error!")}      
  },
  getImgRGBA: function(){
    if(!this.image){return false;}
    var pixelData = [0,0,0,0];
    var colorData = [0,0,0,0];
    var img = this.image;
    var cromax, cromin, lightmax, lightmin, diffcro, difflight;
    var imgarr = [];
    var croarr = [];
    var lightarr = [];
    var cnt = 0;
    var canvas = document.createElement('canvas');
        canvas.width = img.width || img.naturalWidth;;
        canvas.height = img.height || img.naturalHeight;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    var offsetX, offsetY;      
        for(var i=1; i<=this.dots; i++){
          offsetX = Math.floor(canvas.width/i);
          for(var j=1; j<=this.dots; j++){
            offsetY = Math.floor(canvas.height/j);
             colorData.forEach(function(v, k) {
               colorData[k] = canvas.getContext('2d').getImageData(offsetX, offsetY, canvas.width, canvas.height).data[k];
             });      
             imgarr.push(colorData.join(','));
             croarr.push(this.Cromatic(colorData)); 
             lightarr.push(this.Distance(colorData));   

          }
        } 
        croarr = croarr.filter(function(n){ return n !== 0 }); 
         if(croarr.length !== 0){     
         cromax = croarr.reduce(function(a, b) { return Math.max(a, b) });
         cromin = croarr.reduce(function(a, b) { return Math.min(a, b) });
         if(this.croma <= 0){ diffcro = 0;}
         else if(this.croma === 10){ diffcro = cromin + Math.floor((cromax-cromin)/10) * (this.croma); }
         else{ diffcro = cromin + Math.floor((cromax-cromin)/10) * (this.croma-1); }
         }
        lightarr = lightarr.filter(function(n){ return n !== 0 }); 
         if(lightarr.length !== 0){   
         lightmax = lightarr.reduce(function(a, b) { return Math.max(a, b) });
         lightmin = lightarr.reduce(function(a, b) { return Math.min(a, b) });
         if(this.light <= 0){ difflight = 0;}
         else if(this.light === 10){ difflight = lightmin + Math.floor((lightmax-lightmin)/10) * (this.light); }
         else{ difflight = lightmin + Math.floor((lightmax-lightmin)/10) * (this.light-1); }
         }
        imgarr.forEach(function(str){
          var obj = str.split(',').map(Number);
          if( (this.Distance(obj) >= difflight) && (this.Cromatic(obj) >= diffcro) )
          {
            pixelData[0] += obj[0];
            pixelData[1] += obj[1];
            pixelData[2] += obj[2];
            pixelData[3] += obj[3]; 
            cnt += 1; 
          }
        }.bind(this));
        pixelData.forEach(function(v, k) {
          pixelData[k] = Math.floor(pixelData[k]/cnt);
        });  
        return pixelData;
  }
 }
 var Color = Object.create(_Color.prototype, {
  image:{
      value: null,
      configurable: false,
      enumerable: false,
      writable: true
  },
  light:{
      value: 1,
      configurable: false,
      enumerable: false,
      writable: true
  },
  croma:{
      value: 1,
      configurable: false,
      enumerable: false,
      writable: true
  },
  dots:{
      value: 4,
      configurable: false,
      enumerable: false,
      writable: false
  }
});

//URL 파라미터 가져오기
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//쿠키 설정
var _Cookie = function(){

}
_Cookie.prototype = {
  setCookie: function(name, val){
    document.cookie = name + "=" + val + ";";
  },
  getCookie: function(name){
    var decodedCookie = decodeURIComponent(document.cookie);
    var split = decodedCookie.split(';');
    name = name + "=";
    for(var i = 0; i <split.length; i++) {
        var content = split[i];
        while (content.charAt(0) == ' ') {
            content = content.substring(1);
        }
        if (content.indexOf(name) == 0) {
            return content.substring(name.length, content.length);
        }
    }
    return "";
  },
  delCookie: function(name){
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
var Cookie = Object.create(_Cookie.prototype);

//값 검증
var _Validation = function(val){

}
_Validation.prototype = {
  Text: function(tval){
    var Exp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/gi;
    return !tval.match(Exp);
  },
  Number: function(nval){
    var Exp = /[^0-9]/;
    return !nval.match(Exp);
  }
}
 var Validation = Object.create(_Validation.prototype);