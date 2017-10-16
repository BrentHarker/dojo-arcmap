//>>built
define(["require","esri/Map","esri/views/MapView","esri/layers/FeatureLayer"],function(q,u,v,h){function w(){f.findLayerById(l[0])&&r();var a=new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Buildings_Edited/FeatureServer/0",outFields:["Name","Description"],popupTemplate:{title:"{Name}",content:"{Description}"},opacity:0});f.add(a);l.push(a.id)}function r(){document.getElementById("listNode").innerHTML="";d.popup.close();null!=m&&(m.destroy(),m=null);null!=p&&(p.destroy(),
p=null);f.removeAll();l=[]}function k(a){f.findLayerById(l[0])&&r();var b=new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/"+a+"/FeatureServer/0",outFields:["*"],definitionExpression:"Name !\x3d ''",popupTemplate:{title:"{Name}",content:[{type:"text",text:"\x3cimg src\x3d'{ImageUrl}'\x3e\x3cdiv class\x3d'popupText'\x3e{Description}\x3c/div\x3e   \x3ca target\x3d'_blank' href\x3d{url}\x3e{url}\x3c/a\x3e"}]}});f.add(b);b.then(function(){});l.push(b.id);var e,g=document.getElementById("listNode");
d.whenLayerView(b).then(function(a){a.watch("updating",function(b){b||a.queryFeatures().then(function(a){a.sort(function(a,b){return a.attributes.BLDG_NAME>b.attributes.BLDG_NAME?1:a.attributes.BLDG_NAME<b.attributes.BLDG_NAME?-1:0});e=a;var b=document.createDocumentFragment();a.forEach(function(a,c){a=a.attributes;a=null!=a.BLDG_ABBR?a.Name+" ("+a.BLDG_ABBR+")":a.Name;var d=document.createElement("li");d.classList.add("panel-result");d.tabIndex=0;d.setAttribute("data-result-id",c);d.textContent=
a;b.appendChild(d)});g.innerHTML="";g.appendChild(b)},function(a){})})});g.addEventListener("click",function(a){(a=(a=a.target.getAttribute("data-result-id"))&&e&&e[parseInt(a,10)])&&d.popup.open({features:[a],location:"Buildings Edited"==b.title||"Athletics"==b.title?a.geometry.centroid:{latitude:a.geometry.latitude,longitude:a.geometry.longitude}})})}function t(a){f.findLayerById(l[0])&&r();q(["esri/widgets/Legend"],function(b){var e={title:"{Name}",content:"{Description} {StopLocati}"},g;g="AccessibilityRoutes"===
a?new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/"+a+"/FeatureServer/0"}):new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/"+a+"/FeatureServer/0",outFields:["*"],popupTemplate:e});f.add(g);g.then(function(){l.push(g.id);p=new b({layerInfos:[{layer:g}],view:d});d.ui.add(p,"bottom-left")})})}function x(){f.findLayerById(l[0])&&r();q(["esri/widgets/LayerList","dojo/query"],function(a,b){for(var e={title:"{Lot}",content:"{Description}"},g="MotorcycleParking Students RestrictedVisitor Construction StudentHousing FreeParking VisitorParking TimedParking GraduateStudents FacultyandStaff".split(" "),
k=[],n=0;10>n;n++)k[n]=new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/"+g[n]+"/FeatureServer/0",outFields:["Lot","Description","Map_Category"],popupTemplate:e}),f.add(k[n]),l.push(k[n].id);m=new a({view:d,listItemCreatedFunction:function(a){var c=a.item;setTimeout(function(){var a=b('[aria-labelledby\x3d"'+(m.id+"_"+c.uid+"__title")+'"]')[0];a&&a.children[0]&&c.layer.renderer&&c.layer.renderer.symbol&&(a.children[0].style.backgroundColor=c.layer.renderer.symbol.color,
"FacultyandStaff"===c.title?c.title="Faculty and Staff":"FreeParking"===c.title?c.title="Free Parking":"MotorcycleParking"===c.title?c.title="Motorcycle Parking":"RestrictedVisitor"===c.title?c.title="Restricted Visitor":"StudentHousing"===c.title?c.title="Student Housing":"TimedParking"===c.title?c.title="Timed Parking":"VisitorParking"===c.title?c.title="Visitor Parking":"GraduateStudents"===c.title?c.title="Graduate Students":"Students"===c.title&&(a.children[0].children[0].children[1].style.color=
"unset"))},50)}});d.ui.add(m,{position:"bottom-left"})})}var f,d,m,p,l=[];q(["dojo/query","dojo/touch","dojo/on"],function(a,b){a("#Buildings_Edited").on(b.press,function(){k("Buildings_Edited")});a("#Dining").on(b.press,function(){k("Dining")});a("#Athletics").on(b.press,function(){k("Athletics")});a("#Services").on(b.press,function(){k("Services")});a("#StudentServices").on(b.press,function(){k("StudentServices")});a("#Web_Cams").on(b.press,function(){k("Web_Cams")});a("#Transportation_Merge").on(b.press,
function(){t("Transportation_Merge")});a("#Emergency_Phones").on(b.press,function(){t("Emergency_Phones")});a("#AccessibilityRoutes").on(b.press,function(){t("AccessibilityRoutes")});a("#ComputerLabs_Merge").on(b.press,function(){t("ComputerLabs_Merge")});a("#ParkingLayers").on(b.press,function(){x()})});return{init:function(){f=new u({basemap:"topo"});d=new v({container:"viewDiv",map:f,center:[-111.649278,40.249251],zoom:16});d.then(function(){w();q(["esri/widgets/Search","esri/widgets/Home"],function(a,
b){var e={title:"{Name}",content:"{Description}",overwriteActions:!0};a=new a({view:d,allPlaceholder:"Enter Name or Acronym",sources:[{featureLayer:new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Buildings_Edited/FeatureServer/0",popupTemplate:e}),searchFields:["Name","BLDG_ABBR"],suggestionTemplate:"{Name} ({BLDG_ABBR})",displayField:"Name",exactMatch:!1,outFields:["Name","BLDG_ABBR","Description"],name:"Buildings",placeholder:"example: JSB"},{featureLayer:new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Athletics/FeatureServer/0",
popupTemplate:e}),searchFields:["Name","BLDG_ABBR"],suggestionTemplate:"{Name}",exactMatch:!1,outFields:["*"],name:"Sports",placeholder:"example: Marriott Center"},{featureLayer:new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Services/FeatureServer/0",popupTemplate:e}),searchFields:["Name"],suggestionTemplate:"{Name}",exactMatch:!1,outFields:["*"],name:"Services",placeholder:"example: Admissions"},{featureLayer:new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/StudentServices/FeatureServer/0",
popupTemplate:e}),searchFields:["Name"],suggestionTemplate:"{Name}",exactMatch:!1,outFields:["*"],name:"Student Services",placeholder:"example: Title IX"},{featureLayer:new h({url:"https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Entertainment_Museums/FeatureServer/0",popupTemplate:e}),searchFields:["Name"],suggestionTemplate:"{Name}",exactMatch:!1,outFields:["*"],name:"Entertainment and Museums",placeholder:"example: Planetarium"}]});d.ui.add(a,{position:"top-left",index:2});d.ui.move("zoom",
"top-left");b=new b({view:d});d.ui.add(b,"top-left");d.popup.dockEnabled=!1})},function(a){})}}});