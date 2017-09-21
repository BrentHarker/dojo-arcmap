define(["require", "exports", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/widgets/Search", "esri/widgets/Home", "dojo/query", "dojo/touch", "dojo/on", "esri/widgets/Legend", "esri/widgets/LayerList"],
  function(require, exports, Map, MapView, FeatureLayer, Search, Home, query, touch, Legend, LayerList) {
    "use strict";
    var map, view, layerList, legend;
    var featureLayerIDSet = [];
    var app = {};
    app.init = function() {
      map = new Map({
        //  Unable to find basemap definition for: dark-grays. Try one of these: "streets", "satellite", "hybrid", "terrain", "topo", "gray", "dark-gray", "oceans", "national-geographic", "osm", "dark-gray-vector", "gray-vector", "streets-vector", "topo-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector"
        basemap: "topo"
      });
      view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-111.649278, 40.249251],
        zoom: 16,

      });
      view.then(function() {
          toggleBuildings();

          var template = {
            title: "{Name}",
            content: "{Description}",
            overwriteActions: true
          };
          var searchWidget = new Search({
            view: view,
            allPlaceholder: "Enter Name or Acronym",
            sources: [{
                featureLayer: new FeatureLayer({
                  url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Buildings_Edited/FeatureServer/0",
                  popupTemplate: template
                }),
                searchFields: ["Name", "BLDG_ABBR"],
                suggestionTemplate: "{Name} ({BLDG_ABBR})",
                displayField: "Name",
                exactMatch: false,
                outFields: ["Name", "BLDG_ABBR", "Description"],
                name: "Buildings",
                placeholder: "example: JSB",
              }, {
                featureLayer: new FeatureLayer({
                  url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Athletics/FeatureServer/0",
                  popupTemplate: template
                }),
                searchFields: ["Name", "BLDG_ABBR"],
                suggestionTemplate: "{Name}",
                exactMatch: false,
                outFields: ["*"],
                name: "Sports",
                placeholder: "example: Marriott Center",
              },
              {
                featureLayer: new FeatureLayer({
                  url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Services/FeatureServer/0",
                  popupTemplate: template
                }),
                searchFields: ["Name"],
                suggestionTemplate: "{Name}",
                exactMatch: false,
                outFields: ["*"],
                name: "Services",
                placeholder: "example: Admissions",
              }, {
                featureLayer: new FeatureLayer({
                  url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/StudentServices/FeatureServer/0",
                  popupTemplate: template
                }),
                searchFields: ["Name"],
                suggestionTemplate: "{Name}",
                exactMatch: false,
                outFields: ["*"],
                name: "Student Services",
                placeholder: "example: Title IX",
              }, {
                featureLayer: new FeatureLayer({
                  url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Entertainment_Museums/FeatureServer/0",
                  popupTemplate: template
                }),
                searchFields: ["Name"],
                suggestionTemplate: "{Name}",
                exactMatch: false,
                outFields: ["*"],
                name: "Entertainment and Museums",
                placeholder: "example: Planetarium",
              }
            ]
          });

          view.ui.add(searchWidget, {
            position: "top-left",
            index: 2
          });
          view.ui.move("zoom", "top-left");
          var homeWidget = new Home({
            view: view
          });
          view.ui.add(homeWidget, "top-left");
          view.popup.dockEnabled = false;
          searchWidget.then(function() {

          }, function(error) {
            console.log('search failed', error);
          });

        },
        function(error) {
          // Use the errback function to handle when the view doesn't load properly
          console.log('The view\'s resources failed to load: ', error);
        });
    }
    //event handling for the toggleLayers layers
    query('#Buildings_Edited').on(touch.press, function() {
      toggleLayers("Buildings_Edited");
    });
    query('#Dining').on(touch.press, function() {
      toggleLayers("Dining");
    });
    query('#Athletics').on(touch.press, function() {
      toggleLayers("Athletics");
    });
    query('#Services').on(touch.press, function() {
      toggleLayers("Services");
    });
    query('#StudentServices').on(touch.press, function() {
      toggleLayers("StudentServices");
    });
    query('#Web_Cams').on(touch.press, function() {
      toggleLayers("Web_Cams");
    });
    //event handling for legend layers
    query('#Transportation_Merge').on(touch.press, function() {
      toggleLegendLayers("Transportation_Merge");
    });
    query('#AccessibilityRoutes').on(touch.press, function() {
      toggleLegendLayers("AccessibilityRoutes");
    });
    query('#ComputerLabs_Merge').on(touch.press, function() {
      toggleLegendLayers("ComputerLabs_Merge");
    });
    //event handling for Parking Layer
    query('#ParkingLayers').on(touch.press, function() {
      toggleParkingLots();
    });

    function toggleBuildings() {
      if (map.findLayerById(featureLayerIDSet[0])) {
        removeLayers();
      }
      var template = {
        title: "{Name}",
        content: "{Description}"
      };
      var featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/Buildings_Edited/FeatureServer/0",
        outFields: ["Name", "Description"],
        popupTemplate: template,
        opacity: 0
      });
      //console.log(featureLayer.outfields);
      map.add(featureLayer);
      // console.log(featureLayer.layerId);
      featureLayerIDSet.push(featureLayer.id);

    }

    function removeLayers() {
      console.log("removing layers");
      document.getElementById("listNode").innerHTML = "";
      view.popup.close();
      //document.getElementsByClassName("panel-side")[0].style.zIndex = "-1";
      if (layerList != null) {
        layerList.destroy();
        layerList = null;
      }
      if (legend != null) {
        legend.destroy();
        legend = null;
      }
      map.removeAll();
      featureLayerIDSet = [];
      // map.removeMany(featureLayerIDSet);
      // for(i=0; i<featureLayerIDSet.length; i++){
      //   map.remove(featureLayerIDSet[i]);
      // }
    }

    function toggleLayers(id) {
      var id = id;
      if (map.findLayerById(featureLayerIDSet[0])) {
        removeLayers();
      }

      var template = {
        title: "{Name}",
        content: [{
          type: "text",
          text: "<img src='{ImageUrl}'><div class='popupText'>{Description}</div>   <a target='_blank' href='{url}'>{url}</a>"
        }]

      };
      var featureLayer = new FeatureLayer({
        url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/" + id + "/FeatureServer/0",
        //outFields: ["Name", "Description", "BLDG_ABBR", "BLDG_NAME"],
        outFields: ["*"],
        definitionExpression: "Name != ''",
        popupTemplate: template
      });
      map.add(featureLayer);
      featureLayer.then(function() {
        if (featureLayer.capabilities.queryRelated.supportsOrderBy) {
          console.log("order supported");
          //console.log(featureLayer);
        } else {
          console.log("order NOT supported");
        }
      });

      featureLayerIDSet.push(featureLayer.id);
      var graphics;
      var listNode = document.getElementById("listNode");
      view.whenLayerView(featureLayer).then(function(lyrView) {
        lyrView.watch("updating", function(val) {
          if (!val) { // wait for the layer view to finish updating
            //console.log(lyrView);
            //var queryParams = featureLayer.createQuery();
            //queryParams.orderByFields = (featureLayer.title == "BYUBuildings" || featureLayer.title == "Athletics") ? ["BLDG_NAME"] : ["Name"];
            // query all the features available for drawing.
            lyrView.queryFeatures().then(function(results) {
              //console.log(results);
              results.sort(function(a, b) {
                if (a.attributes.BLDG_NAME > b.attributes.BLDG_NAME) {
                  return 1;
                } else if (a.attributes.BLDG_NAME < b.attributes.BLDG_NAME) {
                  return -1;
                } else {
                  return 0;
                }
              });
              graphics = results;
              //document.getElementsByClassName("panel-side")[0].style.zIndex = "1";
              var fragment = document.createDocumentFragment();

              results.forEach(function(result, index) {
                var attributes = result.attributes;
                var name;
                if (attributes.BLDG_ABBR != null) {
                  name = attributes.Name + " (" + attributes.BLDG_ABBR + ")";
                } else {
                  name = attributes.Name;
                }
                var Description = attributes.Description;

                // Create a list zip codes in NY
                var li = document.createElement("li");
                li.classList.add("panel-result");
                li.tabIndex = 0;
                li.setAttribute("data-result-id", index);
                li.textContent = name;
                fragment.appendChild(li);
              });
              // Empty the current list
              listNode.innerHTML = "";
              listNode.appendChild(fragment);
            }, function(error) {
              console.log("something query messed up", error);
            });
          }
        });
      });
      listNode.addEventListener("click", onListClickHandler);

      function onListClickHandler(event) {
        var target = event.target;
        var resultId = target.getAttribute("data-result-id");

        // get the graphic corresponding to the clicked zip code
        var result = resultId && graphics && graphics[parseInt(resultId,
          10)];

        if (result) {
          var centerPoint = (featureLayer.title == "Buildings Edited" || featureLayer.title == "Athletics") ? result.geometry.centroid : {
            latitude: result.geometry.latitude,
            longitude: result.geometry.longitude
          };
          // open the popup at the centroid of zip code polygon
          // and set the popup's features which will populate popup content and title.
          view.popup.open({
            features: [result],
            location: centerPoint
          });
        }
      }

    }
    // var map = new Map({
    //     basemap: "streets"
    // });
    // var view = new MapView({
    //     map: map,
    //     container: "viewDiv",
    //     //locateByBuildingNumber: 350
    // });

    function toggleLegendLayers(id) {
      var id = id;
      if (map.findLayerById(featureLayerIDSet[0])) {
        removeLayers();
      }

      var template = {
        title: "{Name}",
        content: "{Description} {StopLocati}"
      };
      var featureLayer;
      if (id === "ComputerLabs_Merge" || id === "Transportaion_Merge") {
        featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/" + id + "/FeatureServer/0",
          outFields: ["Name", "Description", "StopLocati"],
          popupTemplate: template
        });
      } else {
        featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/" + id + "/FeatureServer/0"
        });
      }
      map.add(featureLayer);

      featureLayer.then(function() {
        featureLayerIDSet.push(featureLayer.id);
        console.log(featureLayer);
        legend = new Legend({
          view: view,
          layerInfos: [{
            layer: featureLayer
          }]
        });
        view.ui.add(legend, "bottom-left");
      });
    }


    function toggleParkingLots() {
      if (map.findLayerById(featureLayerIDSet[0])) {
        removeLayers();
      }
      //load ParkingLayers
      var template = {
        title: "{Lot}",
        content: "{Description}"
      };
      for (var i = 2; i < 12; i++) {
        var featureLayer = new FeatureLayer({
          url: "https://services.arcgis.com/FvF9MZKp3JWPrSkg/arcgis/rest/services/ParkingLayers/FeatureServer/" + i,
          outFields: ["Lot", "Description", "Map_Category"],
          popupTemplate: template
        });
        //console.log(featureLayer.title);
        map.add(featureLayer);
        // console.log(featureLayer.layerId);
        featureLayerIDSet.push(featureLayer.id);
      }
      layerList = new LayerList({
        view: view,
        // executes for each ListItem in the LayerList
        // listItemCreatedFunction: function(event) {
        //   //console.log(event);
        //   var item = event.item;
        //   item.title = item.title.substr(16);
        // }
      });
      view.ui.add(layerList, {
        position: "bottom-left"
      });
    }
    return app;
  });
