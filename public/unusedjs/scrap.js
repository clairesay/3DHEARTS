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

////////////////////////////////////////////////////////////////////////////////////////////////////////
<body class="common-structure">
    <header>
        <button id="returnToMenu" onclick="exitModule();"> <svg width="24" height="24"
                xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                <path
                    d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
            </svg> </button>
        <div id="module-name">
            <h1>{{name}}'s Story</h1>
            <h3>Interaction</h3>
            <button onclick="tweenExample();">HEY NOW</button>
        </div>

        <section id="modal-blackout" class="no-modal"> </section>
        <section id="modal" class="no-modal">

            <h3 id="on-examination-review">On Examination</h3>
            <h3 id="chest-xr-review">Chest XR</h3>
            <article id="on-examination-review-content">
                <p>
                <ul>
                    {{#each preliminary_information}}
                    {{review this}}
                    {{/each}}
                </ul>

                <h4>Background History</h4>
                <ul>
                    {{#each background_history}}
                    {{review this}}
                    {{/each}}
                </ul>
                <h4>On Examination</h4>
                <ul>
                    {{#each on_examination}}
                    {{review this}}
                    {{/each}}
                </ul>
                </p>
            </article>
            <article id="chest-xr-review-content">
                <img class="chest-xr" src={{xray}}>
            </article>
        </section>
        <button id="case-content-button" onclick="showReviewModal();"><img src="images/case-content.svg"></button>
    </header>
    <section class="content module-slide">
        <h1>Interact</h1>
        <p class="case-content">
            For this stage of the module, you will be using a physical model of the paediatric heart case #{{heartId}} and a
            digital interactive model.
        </p>
        <p id="interaction-case-content-button-explanation" class="case-content">
            All the case content you reviewed will be available to you in the case button.
        </p>
        <p class="case-content">
            It will be helpful as you interact with the models as the module progresses.
        </p>
    </section>
    <section class="activity module-slide">
        <article id="toggles">
            <form id="model-toggles">
                <input type="radio" name="render-type" id="clear" value="clear" checked>
                <label for="clear" onclick="zoom(-1);">Zoom Out</label>
                <input type="radio" name="render-type" id="segments" value="segments">
                <label for="segments" onclick="zoom(1);">Zoom In</label>
                {{!-- <input type="radio" name="render-type" id="realistic" value="realistic" checked>
                <label for="realistic">Realistic</label> --}}
            </form>
            <h5>Labels
                <form id="model-toggles">
                    <input type="radio" name="part-labels" id="on" value="labels-on" checked>
                    <label for="on" onclick="showLabel(1);">On</label>
                    <input type="radio" name="part-labels" id="off" value="labels-off">
                    <label for="off" onclick="showLabel(-1);">Off</label>
                </form>
            </h5>
        </article>
        <p class="step">Refer to Specimen {{heartId}}
        </p>

        <p class="step"><strong>1. Orient the heart so that you are looking at the posterior aspect.</strong>
            Can you identify the two atrial appendages?
        </p>
        <p class="step"><strong>2. Identify the right atrium and follow it down into its corresponding
                ventricle</strong>
            Can you identify the features differentiating right from left ventricles?
        </p>
        <p class="step"><strong>3. Identify the right ventricular outflow tract</strong>
        </p>
        <p class="step"><strong>4. Identify the left atrium and follow it down into its corresponding ventricle</strong>
            Does this have the features of a left ventricle?
        </p>
        <p class="step"><strong>5. Identify the left ventricular outflow tract</strong></p>
        <p class="step"><strong>6. Identify any inter-atrial communications.</strong>
            Can you pass a pipe-cleaner through the defect?
        </p>
        <p class="step"><strong>7. Identify any inter-ventricular communications.</strong>
            Can you pass a pipe-cleaner through the defect?
        </p>
        <p class="step"><strong>8. Follow the left ventricular outflow tract into the aortic arch.</strong>
            Can you identify the remnant ligamentum arteriosum or a patent ductus arteriosus?
        </p>
        <div id="heart-model">

        </div>
    </section>
    <section class="activity module-slide">
        <h1>How would you summarise the cardiac defects you have identified?</h1>

        <p class="case-content">
            Think carefully about your answer before you proceed to the next page.
        </p>
    </section>
    <section class="activity module-slide">
        <h1>How would you summarise the cardiac defects you have identified?</h1>
        <h3>
            Cardiac Specimen Explanation:
        </h3>
        {{#each cardiac_explanation}}
        {{list this}}
        {{/each}}
        {{!-- <p class="case-content">
            This heart demonstrates atrio-ventricular and ventriculo-arterial concordance. There is a small patent
            foramen ovale (PFO) and a large sub-pulmonary ventricular septal defect. There is right ventricular
            hypertrophy. There is a suggestion of aortic hypoplasia. Note the classic relationship of the great vessels
            – they spiral around each other as they leave the heart, with the aorta located posteriorly.
        </p> --}}
    </section>
    <section class="activity module-slide">
        <p class="case-content">
            Well done on the heart interaction! Proceed to the Explanation Section!
        </p>
    </section>
    <button id="previous" class="nav-button" onclick="nextSlide(-1)"> <svg width="24" height="24"
            xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z" /></svg>
    </button>
    <button id="next-module" class="text-button" onclick="nextModule()">Explanation</button>
    <button id="next" class="nav-button" onclick="nextSlide(1);"><svg width="24" height="24"
            xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
        </svg></button>
    <section id="navigation-tab">
        <a onclick="jumpSection('{{heartId}}' + '-oe.html', 'Case Examination');">Case Examination</a>
        <a onclick="jumpSection('{{heartId}}' + '-interaction.html', 'Interaction');">Interaction</a>
        <a onclick="jumpSection('{{heartId}}' + '-explanation.html', 'Explanation');">Explanation</a>
    </section>
</body>
<script type="module">
    //importing js modules
    import * as THREE from './js/three.module.js';
    import { OBJLoader } from './js/OBJLoader.js';
    import { OrbitControls } from './js/OrbitControls.js';
    import { CSS2DRenderer, CSS2DObject } from './js/CSS2DRenderer.js';
    import TWEEN from 'https://cdnjs.cloudflare.com/ajax/libs/tween.js/18.3.2/Tween.js';

    //Because the module doesn't work otherwise.
    window.camera = camera;
    window.tweenExample = tweenExample;
    //Declaring some variables for the labels
    var testDiv, testLabel, labelRenderer;
    //Declaring variable for the model
    var heart;

    ///////////////////////// SETTING UP THE SCENE /////////////////////////////   
    //establishing the scebe abd background color
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("rgb(0, 0, 0)");
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);

    //rendering the window and everything in it
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 1.5));

    //Insert inside 'heart-model' div in interaction template
    var container = document.getElementById('heart-model');
    container.appendChild(renderer.domElement);

    //Generating Labels for the Model
    testDiv = document.createElement('div');
    testDiv.className = 'model-label';
    testDiv.textContent = 'Moon';
    testLabel = new CSS2DObject(testDiv);




    //Setting up the Label Renderer and positioning it over the 3D container only.
    labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.appendChild(labelRenderer.domElement);

    //Setting the position of the camera
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 20;

    var light = new THREE.PointLight(0xfffdd0, 1.1, 100);
    light.position.set(camera.position.x, camera.position.y, camera.position.z);
    scene.add(camera);
    camera.add(light);

    //Adding Orbit Controls
    var controls = new OrbitControls(camera, container);
    controls.enableDamping = true;
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    //Zoom in and out buttons controlling max and min camera zoom

    //Show Labels function
    window.showLabel = showLabel;
    function showLabel(showValue) {
        switch (showValue) {
            case 1:
                testDiv.style.visibility = "visible";
                break;
            case -1:
                testDiv.style.visibility = "hidden";
                break;
            default:
                break;
        }
    }  

    // Declare variables to manipulate heart object rotation
    var heartObj;
    var xRotation, yRotation, zRotation;

    ///////////////////////// MODEL LOADER /////////////////////////////
    // Loading STL model
    var loader = new OBJLoader()

    loader.load("{{ model }}", function (heart) {

        //material of model
        var material = new THREE.MeshStandardMaterial({
            color: 0xfffeea,
            
            metalness: 0.1,
            roughness: 0.75,
            shadowSide: THREE.DoubleSide,
        });

        heart.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                child.geometry.center();
                child.material = material;

            }
        })

        //adding labels to heart, and heart to the scene
        heart.name = 'heart';
        heart.add(testLabel);
        scene.add(heart);

        //positioning the heart for optimal scale and visibility
        heart.scale.set(0.1, 0.1, 0.1);
        console.log(heart.rotation.x, heart.rotation.y, heart.rotation.z)
        heart.rotation.x = 0;
        heart.rotation.y = 3;
        heart.rotation.z = 0;

        // get heart object to rotate
        heartObj = scene.getObjectByName('heart', true);
    })

    /////////////////////////////////////////////////

    function tweenExample() {
        var from = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };
        var to = {
            x: 0,
            y: 0,
            z: 30
        };
        console.log('happening')
        var tween = new TWEEN.Tween(camera.position)
            .to(to, 1000)
            .easing( TWEEN.Easing.Quadratic.InOut).start();
    }

    var animatic = function () {
                requestAnimationFrame(animate);
            TWEEN.update();
    }
    /////////////////////////////////////////////////

    //Animate and Render
    var animate = function () {
        requestAnimationFrame(animate);
        controls.update();
            TWEEN.update();
        // console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
        renderer.render(scene, camera);
        labelRenderer.render(scene, camera);
    };

    // resize window on event onWindowResize
    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize((window.innerWidth / 1.5), (window.innerHeight / 1.5));
    }

    animate();

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PREVIOUSLY THIS WAS THE MAIN INTERACTION JS FILE //

    //Because the module doesn't work otherwise.
    window.nextPoint = nextPoint;
    window.nextModule = nextModule;
    window.nextSlide = nextSlide;
    window.nextStep = nextStep;
    window.exitModule = exitModule;
    window.jumpSection = jumpSection;
    window.showReviewModal = showReviewModal;
    window.changeView = changeView;
    ////////////////// TOP LEFT EXIT MODULE ////////////////////
    //Warning to prevent user from accidentally leaving the module
    function exitModule() {
        Swal.fire({
            title: 'Leave Module?',
            text: 'You will be taken back to the Modules Homepage.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Leave',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                window.location.href = "index.html";
            }
        })
    }

    //////////////////////////////////////// NAVIGATION TAB  //////////////////////////////////////
    //checking for the path name
    var path = window.location.pathname;
    var page = path.split("/").pop();

    //highlighting the text to show the current page displayed
    if (page.includes('oe')) {
        document.querySelectorAll('#navigation-tab a')[0].style.color = "black";
        document.querySelectorAll('#navigation-tab a')[0].style.fontWeight = "500";
        document.querySelectorAll('#navigation-tab a')[0].style.cursor = "default";
    } else if (page.includes('interaction')) {
        document.querySelectorAll('#navigation-tab a')[1].style.color = "black";
        document.querySelectorAll('#navigation-tab a')[1].style.fontWeight = "500";
        document.querySelectorAll('#navigation-tab a')[1].style.cursor = "default";
    } else if (page.includes('explanation')) {
        document.querySelectorAll('#navigation-tab a')[2].style.color = "black";
        document.querySelectorAll('#navigation-tab a')[2].style.fontWeight = "500";
        document.querySelectorAll('#navigation-tab a')[2].style.cursor = "default";
    }

    //If the user clicks on a different section to jump to, warn them before they jump to it
    function jumpSection(destination, sectionName) {
        if (destination == page) {
        } else {
            Swal.fire({
                title: 'Start the ' + sectionName + ' section?',
                text: 'You will leave this module.',
                icon: 'warning',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Start',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    window.location.href = destination;
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                }
            })
        }
    }

    ///////////////////////////////// AT THE END OF A MODULE ///////////////////////////
    //at the end of the module, automatically forward user to the next section
    function nextModule() {
        window.location.href = "" + "{{heartId}}" + "-explanation.html";
    }

    ////////// USING LOCAL STORAGE TO OFFSET IF USER NAVIGATES TO PREVIOUS SLIDE FIXING/////////////
    document.getElementById('previous').addEventListener('click', function pointViewCount() {
        localStorage.setItem('prevCurrentPoint', currentPoint);
    })

    /////////////////////////////////// PROGRESSION THROUGH SLIDES ///////////////////////////////
    let pointIncrement = 0;
    //function to show current slide
    function showSlide(currentSlide) {
        //if the current slide is the first one, hide the previous button and show the next button only
        if (currentSlide == 0) {
            document.getElementById('previous').style.visibility = "hidden"
            document.getElementById('next').style.visibility = "visible"
            //if the current slide is the second last one, show the next-module button, hide the next button and show the previous button
        } else if (currentSlide == (document.querySelectorAll('.module-slide').length - 1)) {
            document.getElementById('previous').style.visibility = "visible"
            document.getElementById('next-module').style.visibility = "visible"
            document.getElementById('next').style.visibility = "hidden"
            //show both the previous and next buttons and hide the next-module button at all other times
        } else {
            document.getElementById('previous').style.visibility = "visible"
            document.getElementById('next').style.visibility = "visible"
            document.getElementById('next-module').style.visibility = "hidden"
        }

        //show this slide a.k.a current slide
        var thisSlide = document.getElementsByClassName('module-slide')[currentSlide];
        thisSlide.style.display = "flex";
        var caseContent = document.querySelectorAll('.case-content');
        //if this slide contains a class called 'case-content' a.k.a a point in a slide
        for (var i = 0; i < caseContent.length; i++) {
            if ((thisSlide.contains(caseContent[i])) && (true)) {
                //change the next button to show the next point
                document.getElementById('next').setAttribute("onclick", "nextPoint(1);")
            }
        }

        //instead if the current slide has steps i.e. the actual interaction stage
        var stepContent = document.querySelectorAll('.step');
        //check for steps
        for (var i = 0; i < stepContent.length; i++) {
            if ((thisSlide.contains(stepContent[i])) && (true)) {
                //change the next and previous buttons to move through steps
                document.getElementById('next').setAttribute("onclick", "nextStep(1);")
                document.getElementById('previous').setAttribute("onclick", "nextStep(-1);")
                //if the current step is the first step, display it (it doesn't work when this isn't there for some reason)
                if (currentStep == 0) {
                    var firstStep = document.querySelectorAll('.step')[currentStep];
                    firstStep.style.display = "flex"
                }
            }
        }
    }

    //Progression through slides
    var currentSlide = 0;
    function nextSlide(n) {
        //hide the previous slide
        var previousSlide = document.getElementsByClassName('module-slide')[currentSlide];
        previousSlide.style.display = "none";
        //add or minus 1 to current slide, depending on previous or next button click
        currentSlide += n;
        //display the slide
        showSlide(currentSlide);
    }
    showSlide(currentSlide);

    /////////////////////////////////// PROGRESSION THROUGH POINT CONTENT /////////////////////////////

    //This both a progression and display function for showing each point in the module
    var currentPoint = 0;
    function nextPoint(n) {
        //x is the number of elements with the class case-content within the current slide
        var x = document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content').length;
        //Add or minus 1 to the current point, depending on previous or next button click
        currentPoint += n;
        pointIncrement++;
        var thisPoint = document.getElementsByClassName('case-content')[currentPoint];

        //if the current point is less than the number existing in this slide
        if (currentPoint < x) {
            //show it
            thisPoint.style.visibility = "visible";
            //if the points on this slide have already been displayed, add on the number to the current point count so that the it skips to the next slide
        } else if (localStorage.hasOwnProperty('prevCurrentPoint') == true) {
            currentPoint == (parseInt(localStorage.getItem('prevCurrentPoint')));
            document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
            document.getElementById('next').click();
            localStorage.clear();
            currentPoint--;
            //if the current point is the maximum number of points in this slide, clear the class name, move on
        } else if (currentPoint == x) {
            for (let i = 0; i < currentPoint; i++) {
                document.getElementsByClassName('module-slide')[currentSlide].querySelectorAll('.case-content')[0].classList = "";
            }
            document.getElementById('next').click();
            document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
            document.getElementById('next').click();
        } else {
            document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
            document.getElementById('next').click();
            currentPoint = 0;
        }
    }

    ////////////////////////////////// PROGRESSION THROUGH STEPS OF INTERACTION /////////////////////////////
    //Progress through the Steps
    var currentStep = 0;
    function nextStep(m) {
        //Increment the steps by either -1 or 1 depending upon previous or next buttons clicked
        currentStep += m;
        //If the current step exists
        if (currentStep > 0) {
            //Hide the previous step
            var previousStep = document.querySelectorAll('.step')[currentStep - 1];
            previousStep.style.display = "none";
        }
        //Show the current step
        showStep();
    }

    //Display the Step
    function showStep() {
        //Number of Steps
        var steps = document.querySelectorAll('.step').length;

        //If the first step hasn't been accessed yet, progress to changing slides
        if (currentStep < 0) {
            document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
            document.getElementById('previous').setAttribute("onclick", "nextSlide(-1);");
            document.getElementById('previous').click();
            currentStep = 0;

            //If the current step is less than the number of steps that exist but greater than 0
        } else if ((currentStep < steps) && (currentStep >= 0)) {
            var thisStep = document.querySelectorAll('.step')[currentStep];
            for (let l = 0; l < steps; l++) {
                //And if step[l] doesn't equal to the current step that is being displayed
                if (l != currentStep) {
                    document.querySelectorAll('.step')[l].style.display = "none";
                }
            }
            //show this step
            thisStep.style.display = "flex";
            // Switch View in Three
            changeView(currentStep)

            //If the current step has reached the number of existing steps, progress to changing slides
        } else if (currentStep == (steps)) {
            document.getElementById('next').setAttribute("onclick", "nextSlide(1);");
            document.getElementById('previous').setAttribute("onclick", "nextSlide(-1);");
            document.getElementById('next').click();
        }
    }

    ////////////////////////////////////// CHANGING VIEWS IN THREE JS /////////////////////////////////////////////

    function changeView(step) {
        //Setting the container size of the label renderer
        var canvas = document.getElementsByTagName('canvas')[0]
        labelRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
        switch (step) {
            case 1:
                //camera.position.x = 7.96
                //camera.position.y = 5.83
                //camera.position.z = 17.4
                //camera.rotation.x = -0.32;
                //camera.rotation.y = 0.41;
                //camera.rotation.z = 0.13;
                //Setting Labels
                testDiv.textContent = 'Moon';
                testLabel.position.set(0, -20, 0);
                break;
            case 2:
                camera.position.x = 17.26
                camera.position.y = 4.45
                camera.position.z = 9.07
                camera.rotation.x = -0.46
                camera.rotation.y = 1.04
                camera.rotation.z = 0.4
                testDiv.textContent = 'Earth';
                testLabel.position.set(0, 20, 0);
                break;
            case 3:
                camera.position.x = 1.84
                camera.position.y = -17.93
                camera.position.z = -8.67
                camera.rotation.x = 2.02
                camera.rotation.y = 0.09
                camera.rotation.z = -2.95
                testDiv.textContent = 'Sun';
                break;
            case 4:
                camera.position.x = 0.7
                camera.position.y = 5.24
                camera.position.z = 19.29
                camera.rotation.x = -0.27
                camera.rotation.y = 0.04
                camera.rotation.z = 0.01
                break;
            case 5:
                camera.position.x = -6.19
                camera.position.y = -14
                camera.position.z = 12.87
                camera.rotation.x = 0.83
                camera.rotation.y = -0.31
                camera.rotation.z = 0.32
                break;
            case 6:
                camera.position.x = 17.21
                camera.position.y = -10.12
                camera.position.z = 1.24
                camera.rotation.x = 1.45
                camera.rotation.y = 1.04
                camera.rotation.z = -1.43
                break;
            case 7:
                camera.position.x = 0.37
                camera.position.y = -11.82
                camera.position.z = -16.13
                camera.rotation.x = 2.51
                camera.rotation.y = 0.02
                camera.rotation.z = -3.13
                break;
            case 8:
                camera.position.x = -0.4
                camera.position.y = -2.64
                camera.position.z = -19.82
                camera.rotation.x = 3.01
                camera.rotation.y = -0.02
                camera.rotation.z = 3.14
                break;
            default:
                break;
        }
    }

    /////////////////////////////////////// MODAL REVIEW INFORMATION /////////////////////////////////////////////

    //Toggling display of review information in modal
    function showReviewModal() {
        //Modal Background
        var modalBlackout = document.getElementById('modal-blackout');
        modalBlackout.classList.toggle('show-modal');
        //Actual Modal
        var modal = document.getElementById('modal');
        modal.classList.toggle('show-modal');
    }

    //Selecting onexamination and chest xr review titles and content
    var OEReviewHeading = document.getElementById('on-examination-review');
    var chestXRReviewHeading = document.getElementById('chest-xr-review');
    var OEReviewContent = document.getElementById('on-examination-review-content');
    var chestXRReviewContent = document.getElementById('chest-xr-review-content');

    //On Examination
    //Check if OE heading is clicked to show OE review content
    OEReviewHeading.addEventListener('click', function showOEReview() {
        OEReviewHeading.style.backgroundColor = "black";
        chestXRReviewHeading.style.backgroundColor = "gray";
        OEReviewContent.style.display = "flex";
        chestXRReviewContent.style.display = "none";
    })

    //Chest XR
    //Check if Chest XR heading is clicked to show Chest XR review content
    chestXRReviewHeading.addEventListener('click', function showChestXRReview() {
        chestXRReviewHeading.style.backgroundColor = "black";
        OEReviewHeading.style.backgroundColor = "gray";
        OEReviewContent.style.display = "none";
        chestXRReviewContent.style.display = "flex";
    })

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

</script>
{{!-- I didn't know how to link in the following --}}
{{!-- <script type="module" src="js/main-workshop-interaction.js"></script> --}}

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>

/////////////////////////////////////////////////////////////////////////////////////////////////////////</section></section>
///////////////////////////////////////////////////////////////////////////////////////////////////////////</header>
/////////////////////////////////////// TESTING WHICH LABELS ARE IN VIEW OF CAMERA ////////////////////////////////////
const tempV = new THREE.Vector3();
const cameraToPoint = new THREE.Vector3();
const cameraPosition = new THREE.Vector3();
const normalMatrix = new THREE.Matrix3();

const minVisibleDot = 0.2;
// get a matrix that represents a relative orientation of the camera
normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
// get the camera's position
camera.getWorldPosition(cameraPosition);

 // Orient the position based on the camera's orientation.
// Since the sphere is at the origin and the sphere is a unit sphere
// this gives us a camera relative direction vector for the position.
tempV.copy(posit);
tempV.applyMatrix3(normalMatrix);

// compute the direction to this position from the camera
cameraToPoint.copy(posit);
cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();

// get the dot product of camera relative direction to this position
// on the globe with the direction from the camera to that point.
// 1 = facing directly towards the camera
// 0 = exactly on tangent of the sphere from the camera
// < 0 = facing away
const dot = tempV.dot(cameraToPoint);

// if the orientation is not facing us hide it.
if (dot < minVisibleDot) {
  console.log('kale')
}

// restore the element to its default display style
console.log('leftbracket')
}


///////////////////////////////////////////////////////////////////////////////////////////////

for (var j = 0; j < labelName.length; j ++) {
    labelDiv = document.createElement('div');
    labelDiv.className = 'model-label';
    labelDiv.textContent = labelName[j];
    setLabel = new CSS2DObject(labelDiv);
    setLabel.position.set(labelPosX[j], labelPosY[j], labelPosZ[j]);
    posit.x = setLabel.position.x
    posit.y = setLabel.position.y
    posit.z = setLabel.position.z;
            heart.add(setLabel);
}


////////////////////////////////////////////////////////////
function bear() {
    normalMatrix.getNormalMatrix(camera.matrixWorldInverse);
    camera.getWorldPosition(cameraPosition);
  
      tempV.applyMatrix3(normalMatrix);
      
      cameraToPoint.applyMatrix4(camera.matrixWorldInverse).normalize();
      const dot = tempV.dot(cameraToPoint);
  
      // if the orientation is not facing us hide it
      if (dot < minVisibleDot) {
          console.log('neigh');
      } else {
      }
      // restore the element to its default display style
  }

//   //////////////////////// lighting fixing ///////////////////

    //var light = new THREE.SpotLight();
    //var light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    //var light = new THREE.PointLight(0xfffdd0, 1.1, 100);
    //light.castShadow = true;
    //light.position.set(camera.position.x, camera.position.y, camera.position.z);
    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.castShadow = true;

    scene.add( dirLight );
scene.add(camera);
camera.add(dirLight);

// //////////////

,
  {
    "name": "Left Atrium",
    "xPosition": -30,
    "yPosition": -20,
    "zPosition": 2.1,
    "viewNumber": 4
  },
  {
    "name": "Left Ventricle",
    "xPosition": -20,
    "yPosition": -70,
    "zPosition": 2.1,
    "viewNumber": 4
  },
  {
    "name": "Left Ventricular Outflow Tract",
    "xPosition": -10,
    "yPosition": -60,
    "zPosition": 2.1,
    "viewNumber": 5
  }