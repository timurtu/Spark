"use strict";

px.import("px:scene.1.js").then(function (scene) {

  var basePackageUri = px.getPackageBaseFilePath();

  var urls = ["http://www.sparkui.org/examples/gallery/images/apng/elephant.png", // apng
              "http://www.sparkui.org/examples/gallery/images/apng/cube.png", // apng
              "http://www.sparkui.org/examples/gallery/images/apng/spinfox.png", // apng
              "http://www.sparkui.org/examples/gallery/images/star.png", // supports plain old pngs
              "http://www.sparkui.org/examples/gallery/images/ajpeg.jpg"];

  var ready = urls.map(function (url) {
    return scene.create({ t: "imageA", url: url, parent: scene.root }).ready.catch(function (e) {
      return null;
    });
  });

  var images = [];
  var imageTargets = void 0;

  var layout = function layout() {
    var x = 0;var y = 0;var rowHeight = 0;
    for (var i in images) {
      var o = images[i];
      var t = imageTargets[i];
      if (!o) continue;
      if (x + (scene.capabilities.graphics.imageAResource >= 2 ? o.resource.w : o.w) > scene.getWidth()) {
        x = 0;
        y += rowHeight;
        rowHeight = 0;
      }
      // TODO should we have an option to not cancel
      // animations if targets haven't changed
      if (t.x != x || t.y != y) {
        o.animateTo({ x: x, y: y }, 1, scene.animation.TWEEN_STOP).catch(function () {});
        imageTargets[i].x = x;
        imageTargets[i].y = y;
      }
      x += scene.capabilities.graphics.imageAResource >= 2 ? o.resource.w : o.w;
      rowHeight = Math.max(rowHeight, scene.capabilities.graphics.imageAResource >= 2 ? o.resource.h : o.h);
    }
  };

  Promise.all(ready).then(function (values) {
    images = values;
    imageTargets = images.map(function (image) {
      return { x: -1, y: -1 };
    });
    layout();
  });

  scene.on("onResize", function (e) {
    layout();
  });
}).catch(function (e) {
  console.error("Import failed for apng1.js: " + e);
});