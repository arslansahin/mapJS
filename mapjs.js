/*
 * Arslan Şahin
 * arsann@gmail.com
 * 05-03-2019
 * Örnek Kullanım
   <div
   google-map="true"
   map-lat="40.188526"
   map-lon="29.060965"
   map-key="AIzaSyBgXKmCyRFI2-KXCu6vUGolzCW1h1oYzc8"
   map-title="Buradayız..."
   map-description="description"
   map-marker="">
   </div>
 */
'use strict'
NodeList.prototype.forEach = Array.prototype.forEach;
HTMLCollection.prototype.forEach = Array.prototype.forEach;
var elementArray = [
  'html','body','div','a','p','span','code','pre',
  'h1','h2','h3','h4','h5','h6','table','tbody',
  'thead','tr','td','th','ul','li','ol','hr'
];
window.addEventListener("load",function(event) {
  document.querySelectorAll('[google-map*=true]').forEach(function(x){
    //google map
    if(x.getAttribute('google-map') == 'true'){
      try {
        if(elementArray.indexOf(x.nodeName.toLowerCase()) < 0) throw new Error('You are using this feature incorrectly.');
        x.innerHTML = 'Yükleniyor...';
        var mapkey = x.getAttribute('map-key');
        var lat = x.getAttribute('map-lat');
        var lon = x.getAttribute('map-lon');
        if(!mapkey) throw new Error("map-key parameter not entered.");
        if(!lat) throw new Error("map-lat parameter not entered.");
        if(!lon) throw new Error("map-lon parameter not entered.");
        var defaultWidth = '400px';
        var defaultHeight= '300px';
        helperjs.loadJs('https://maps.googleapis.com/maps/api/js?key=' + mapkey + '&libraries=places&sensor=false', function () {

          if(x.getAttribute('style') == null){
            x.setAttribute('style','width:'+defaultWidth+';height:'+defaultHeight+';');
          }
          else if(x.getAttribute('style').indexOf('width') < 0 && x.getAttribute('style').indexOf('height') < 0){
            x.setAttribute('style','width:'+defaultWidth+';height:'+defaultHeight+';');
          }
          else if(x.getAttribute('style').indexOf('width') > -1 && x.getAttribute('style').indexOf('height') < 0){
            x.setAttribute('style','height:'+defaultHeight+';');
          }
          var zoom = x.getAttribute('map-zoom') ? parseFloat(x.getAttribute('map-zoom')):10;
          var title = x.getAttribute('map-title');
          var description = x.getAttribute('map-description');
          var map_marker = x.getAttribute('map-marker');
          var myLatlng = new google.maps.LatLng(lat, lon);
          var mapOptions = {
            center: myLatlng,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          var map = new google.maps.Map(x, mapOptions);
          var image = map_marker !== null ? map_marker : 'http://www.google.com/mapfiles/marker.png';
          var description = description?description:title;
          if(description){
            var contentString = decodeURIComponent(description);
            var infowindow = new google.maps.InfoWindow({
              content: contentString,
              maxWidth: 250
            });
          }
          var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: decodeURIComponent(title),
            icon: image
          });
          description ? infowindow.open(map, marker):'';
        },[].filter.call(document.getElementsByTagName('script'), (scpt) => scpt.src.indexOf('key='+mapkey+'') >= 1 ).length);
      } catch (e) {
        //console.log("helperjs:"+e);
      }
    }
  });
},false);
var helperjs = {
  //multiple js file load
  loadJs : function(js_path,callback,count) {
    if(typeof js_path == 'object'){
      if(js_path.length > 0){
        for(var js in js_path){
          var create = document.createElement('script');
          create.type = 'text/javascript';
          //create.async = true;
          create.src = js_path[js];
          var tag = document.getElementsByTagName('script')[0];
          tag.parentNode.insertBefore(create,tag);
        }
      }
    }
    else if(typeof js_path == 'string'){
      if(count < 1){
        var head=document.getElementsByTagName("head")[0];
        var script=document.createElement('script');
        script.src=js_path;
        script.type='text/javascript';
        script.onload=callback;
        script.onreadystatechange = function() {
          if (this.readyState == 'complete') {
            callback && callback();
          }
        }
        head.appendChild(script);
      }
      else {
        callback && callback();
      }
    }
  },

  //ismobile
  isMobile: function () {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  },

};
String.prototype.str_replace = function(find, replace) {
  var replaceString = this;
  var regex;
  for (var i = 0; i < find.length; i++) {
    regex = new RegExp(find[i], "g");
    replaceString = replaceString.replace(regex, replace[i]);
  }
  return replaceString;
};
//https://stackoverflow.com/questions/5683087/chaining-getelementbyid?answertab=active#tab-top
Element.prototype.getElementById = function(req) {
  var elem = this, children = elem.childNodes, i, len, id;

  for (i = 0, len = children.length; i < len; i++) {
      elem = children[i];

      //we only want real elements
      if (elem.nodeType !== 1 )
          continue;

      id = elem.id || elem.getAttribute('id');

      if (id === req) {
          return elem;
      }
      //recursion ftw
      //find the correct element (or nothing) within the child node
      id = elem.getElementById(req);

      if (id)
          return id;
  }
  //no match found, return null
  return null;
}
