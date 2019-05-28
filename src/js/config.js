//Ajax 통신
var _PARAMS = function(url, key, cx, q, cr, num, sort, fiedls){
  this.url = url;
  this.key = key; 
  this.cx = cx; 
  this.q = q;
  this.cr = cr;
  this.num = num;
  this.sort = sort;
  this.fields = fields;
}
_PARAMS.prototype = {};
var PARAMS = Object.create(_PARAMS.prototype, {
    url:{
        value: "https://www.googleapis.com/customsearch/v1",
        configurable: false,
        enumerable: false,
        writable: false
    },
    key:{
        value: "AIzaSyAF1i5Nq5IWIlzllht_5uBAgfD-iEmBYXA",
        configurable: false,
        enumerable: false,
        writable: false
    }, 
    cx:{
        value: "018043718028321663594:c-zfff9e0ue",
        configurable: false,
        enumerable: false,
        writable: false
    }, 
    q:{
        value: "",
        configurable: false,
        enumerable: false,
        writable: true
    }, 
    cr:{
        value: "countryKR",
        configurable: false,
        enumerable: false,
        writable: true
    }, 
    lr:{
        value: "lang_ko",
        configurable: false,
        enumerable: false,
        writable: true
    }, 
    num:{
        value: "10",
        configurable: false,
        enumerable: false,
        writable: false
    }, 
    sort:{
        value: "",
        configurable: false,
        enumerable: false,
        writable: true
    },
    fields:{
        value: "items(title,displayLink,snippet,link,pagemap/cse_thumbnail)",
        configurable: false,
        enumerable: false,
        writable: false
    }
  });