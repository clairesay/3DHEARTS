function startPreWorkshopModule() {
    let startButton = document.getElementById('start');
    startButton.className = 'text-button none';

    let intro = document.getElementById('intro');
    intro.className = 'content none';
    let healthyHeartModel = document.getElementById('healthy-heart-model');
    healthyHeartModel.className = 'content flex';
}

function exitModule() {
    Swal.fire({
        title: 'Leave Module?',
        text: 'You will be taken back to the Modules Homepage.',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Leave',
        reverseButtons: true
      }).then((result)=> {
          if (result.value) {
            console.log('noway');
            window.location.href = "index.html";
          }
      })
}