// 
require.config({
    paths: {
        "index": "js/index",
        "scale": "js/scale",
        "drag": "js/drag"
    }
})
require(["index"], function(index) {
    index.init();
})