window.zoom = zoom;
function zoom(zoomValue) {
    switch (zoomValue) {
        case -1:
            controls.maxDistance = 20;
            controls.minDistance = 20;
            break;
        case 1:
            controls.maxDistance = 10;
            controls.minDistance = 10;
            break;
        default:
            break;
    }
}

.onComplete(function () {
    controls.target.copy(scene.position);
    console.log('success')
})