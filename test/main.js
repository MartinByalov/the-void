import * as THREE from "three";

import {
    OrbitControls
} from "three/addons/controls/OrbitControls.js";

import {
    createTerra
} from "./terra.js";

import {
    createElune
} from "./elune.js";

import {
    createVoidScene
} from "./cosmic-scene.js";


/* ==================================================
   STATE
================================================== */

const MODE = {

    VOID:
        "void",

    TERRA:
        "terra"

};


let mode =
    MODE.VOID;


let hoveredWorld =
    null;


/* ==================================================
   DOM
================================================== */

const worldContainer =
    document.querySelector(
        "#world"
    );


const header =
    document.querySelector(
        "#header"
    );


const navigation =
    document.querySelector(
        "#navigation"
    );


const terraLabel =
    document.querySelector(
        "#terra-label"
    );


const eluneLabel =
    document.querySelector(
        "#elune-label"
    );


const hoverCard =
    document.querySelector(
        "#hover-card"
    );


const hoverName =
    document.querySelector(
        "#hover-name"
    );


const hoverDescription =
    document.querySelector(
        "#hover-description"
    );


const backButton =
    document.querySelector(
        "#back-button"
    );


const terraInterface =
    document.querySelector(
        "#terra-interface"
    );


const controlHint =
    document.querySelector(
        "#control-hint"
    );


const transitionOverlay =
    document.querySelector(
        "#transition-overlay"
    );


/* ==================================================
   SCENE
================================================== */

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(
        0x101744
    );


scene.fog =
    new THREE.FogExp2(
        0x101744,
        .018
    );


/* ==================================================
   CAMERA
================================================== */

const camera =
    new THREE.PerspectiveCamera(

        42,

        window.innerWidth /
        window.innerHeight,

        .1,

        300

    );


camera.position.set(
    0,
    .8,
    14
);


/* ==================================================
   RENDERER
================================================== */

const renderer =
    new THREE.WebGLRenderer({

        antialias:
            true,

        alpha:
            false

    });


renderer.setPixelRatio(

    Math.min(
        window.devicePixelRatio,
        2
    )

);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


renderer.toneMapping =
    THREE.ACESFilmicToneMapping;


renderer.toneMappingExposure =
    1.25;


worldContainer.appendChild(
    renderer.domElement
);


/* ==================================================
   LIGHTS
================================================== */

scene.add(

    new THREE.HemisphereLight(
        0x9fc8ff,
        0x302057,
        1.7
    )

);


const sunlight =
    new THREE.DirectionalLight(
        0xffe0ae,
        4
    );


sunlight.position.set(
    -6,
    6,
    9
);


scene.add(
    sunlight
);


const purpleLight =
    new THREE.PointLight(
        0x9d4dff,
        18,
        25
    );


purpleLight.position.set(
    6,
    4,
    -3
);


scene.add(
    purpleLight
);


/* ==================================================
   VOID
================================================== */

const voidScene =
    createVoidScene(
        scene
    );


/* ==================================================
   TERRA
================================================== */

const terra =
    createTerra();


terra.position.set(
    .4,
    -.1,
    0
);


terra.rotation.z =
    -.12;


scene.add(
    terra
);


/* ==================================================
   ELUNE
================================================== */

const elune =
    createElune();


elune.position.set(
    5,
    .35,
    -.4
);


scene.add(
    elune
);


/* ==================================================
   CONTROLS
================================================== */

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );


controls.enabled =
    false;


controls.enableDamping =
    true;


controls.dampingFactor =
    .06;


controls.enablePan =
    false;


controls.minDistance =
    3.4;


controls.maxDistance =
    8;


/* ==================================================
   RAYCASTING
================================================== */

const raycaster =
    new THREE.Raycaster();


const mouse =
    new THREE.Vector2(
        10,
        10
    );


window.addEventListener(

    "pointermove",

    event => {

        mouse.x =
            (
                event.clientX /
                window.innerWidth
            ) *
            2 -
            1;


        mouse.y =
            -(
                event.clientY /
                window.innerHeight
            ) *
            2 +
            1;


        if (
            hoverCard.classList
                .contains(
                    "visible"
                )
        ) {

            hoverCard.style.left =
                `${event.clientX + 22}px`;


            hoverCard.style.top =
                `${event.clientY + 22}px`;

        }

    }

);


/* ==================================================
   CLICK
================================================== */

renderer.domElement
.addEventListener(

    "click",

    () => {

        if (
            mode !==
            MODE.VOID
        ) {
            return;
        }


        const world =
            detectWorld();


        if (
            world ===
            "terra"
        ) {

            enterTerra();

        }


        if (
            world ===
            "elune"
        ) {

            console.log(
                "Elune selected"
            );

        }

    }

);


/* ==================================================
   DETECT WORLD
================================================== */

function detectWorld() {

    raycaster.setFromCamera(
        mouse,
        camera
    );


    const hits =
        raycaster.intersectObjects(

            [
                terra,
                elune
            ],

            true

        );


    if (
        hits.length === 0
    ) {

        return null;

    }


    let object =
        hits[0].object;


    while (object) {

        if (
            object.userData.world
        ) {

            return object.userData.world;

        }


        object =
            object.parent;

    }


    return null;
}


/* ==================================================
   HOVER
================================================== */

function updateHover() {

    if (
        mode !==
        MODE.VOID
    ) {

        hoverCard
            .classList
            .remove(
                "visible"
            );

        return;
    }


    const world =
        detectWorld();


    if (
        world ===
        hoveredWorld
    ) {
        return;
    }


    hoveredWorld =
        world;


    if (!world) {

        document.body.style.cursor =
            "default";


        hoverCard
            .classList
            .remove(
                "visible"
            );


        terra.userData.glow
            .scale
            .setScalar(
                1
            );


        elune.userData.glow
            .scale
            .setScalar(
                1
            );


        return;
    }


    document.body.style.cursor =
        "pointer";


    if (
        world ===
        "terra"
    ) {

        hoverName.textContent =
            "Terra";


        hoverDescription.textContent =
            "The Living World";


        terra.userData.glow
            .scale
            .setScalar(
                1.08
            );

    }


    if (
        world ===
        "elune"
    ) {

        hoverName.textContent =
            "Elune";


        hoverDescription.textContent =
            "Moon of Terra";


        elune.userData.glow
            .scale
            .setScalar(
                1.1
            );

    }


    hoverCard
        .classList
        .add(
            "visible"
        );
}


/* ==================================================
   CAMERA TRANSITION
================================================== */

let cameraAnimation =
    null;


function moveCamera(
    destination,
    lookAt,
    duration,
    callback
) {

    const start =
        camera.position.clone();


    const startTime =
        performance.now();


    cameraAnimation =
        now => {


            let t =

                (
                    now -
                    startTime
                ) /
                duration;


            t =
                THREE.MathUtils.clamp(
                    t,
                    0,
                    1
                );


            const eased =

                t < .5

                    ?

                    4 *
                    t *
                    t *
                    t

                    :

                    1 -
                    Math.pow(
                        -2 * t + 2,
                        3
                    ) /
                    2;


            camera.position
                .lerpVectors(
                    start,
                    destination,
                    eased
                );


            camera.lookAt(
                lookAt
            );


            if (
                t >= 1
            ) {

                cameraAnimation =
                    null;


                callback?.();

            }

        };
}


/* ==================================================
   ENTER TERRA
================================================== */

function enterTerra() {

    mode =
        MODE.TERRA;


    hoverCard.classList
        .remove(
            "visible"
        );


    terraLabel.classList
        .remove(
            "visible"
        );


    eluneLabel.classList
        .remove(
            "visible"
        );


    header.style.opacity =
        0;


    navigation.style.opacity =
        0;


    transitionOverlay.classList
        .add(
            "active"
        );


    const terraPosition =
        terra.position.clone();


    const destination =
        terraPosition.clone()
        .add(
            new THREE.Vector3(
                0,
                .2,
                6
            )
        );


    setTimeout(
        () => {

            transitionOverlay.classList
                .remove(
                    "active"
                );

        },
        400
    );


    moveCamera(

        destination,

        terraPosition,

        1700,

        () => {

            /* hide Void map */

            elune.visible =
                false;


            voidScene.orbitGroup.visible =
                false;


            voidScene.vortex.visible =
                false;


            controls.target.copy(
                terraPosition
            );


            controls.enabled =
                true;


            controls.update();


            backButton.style.display =
                "flex";


            terraInterface.style.display =
                "block";


            controlHint.style.display =
                "block";

        }

    );
}


/* ==================================================
   BACK TO VOID
================================================== */

backButton.addEventListener(

    "click",

    () => {

        controls.enabled =
            false;


        backButton.style.display =
            "none";


        terraInterface.style.display =
            "none";


        controlHint.style.display =
            "none";


        elune.visible =
            true;


        voidScene.orbitGroup.visible =
            true;


        voidScene.vortex.visible =
            true;


        const destination =
            new THREE.Vector3(
                0,
                .8,
                14
            );


        moveCamera(

            destination,

            new THREE.Vector3(
                0,
                0,
                0
            ),

            1500,

            () => {

                mode =
                    MODE.VOID;


                header.style.opacity =
                    1;


                navigation.style.opacity =
                    1;

            }

        );

    }

);


/* ==================================================
   HTML LABEL POSITION
================================================== */

function positionLabel(
    object,
    element,
    offsetY
) {

    if (
        mode !==
        MODE.VOID
    ) {

        element.classList
            .remove(
                "visible"
            );

        return;
    }


    const position =
        new THREE.Vector3();


    object.getWorldPosition(
        position
    );


    position.y +=
        offsetY;


    position.project(
        camera
    );


    const x =
        (
            position.x *
            .5 +
            .5
        ) *
        window.innerWidth;


    const y =
        (
            -position.y *
            .5 +
            .5
        ) *
        window.innerHeight;


    element.style.left =
        `${x}px`;


    element.style.top =
        `${y}px`;


    element.classList
        .add(
            "visible"
        );
}


/* ==================================================
   RESIZE
================================================== */

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            window.innerWidth /
            window.innerHeight;


        camera
            .updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

);


/* ==================================================
   LOOP
================================================== */

const clock =
    new THREE.Clock();


function animate(
    time
) {

    requestAnimationFrame(
        animate
    );


    const delta =
        clock.getDelta();


    /* ----------------------------------------------
       camera
    ---------------------------------------------- */

    if (
        cameraAnimation
    ) {

        cameraAnimation(
            time
        );

    }


    /* ----------------------------------------------
       VOID MODE
    ---------------------------------------------- */

    if (
        mode ===
        MODE.VOID
    ) {

        terra.rotation.y +=
            delta *
            .045;


        terra.userData.clouds
            .rotation.y +=
            delta *
            .06;


        elune.rotation.y +=
            delta *
            .025;


        voidScene.stars
            .rotation.y +=
            delta *
            .0015;


        voidScene.vortex
            .rotation.z -=
            delta *
            .025;


        voidScene.rocks.children
            .forEach(
                rock => {

                    rock.rotation.y +=
                        rock.userData
                            .rotationSpeed;

                }
            );


        updateHover();

    }


    /* ----------------------------------------------
       TERRA
    ---------------------------------------------- */

    if (
        mode ===
        MODE.TERRA
    ) {

        controls.update();


        terra.userData.clouds
            .rotation.y +=
            delta *
            .025;

    }


    /* ----------------------------------------------
       labels
    ---------------------------------------------- */

    positionLabel(
        terra,
        terraLabel,
        -3.1
    );


    positionLabel(
        elune,
        eluneLabel,
        -1.35
    );


    /* ----------------------------------------------
       render
    ---------------------------------------------- */

    renderer.render(
        scene,
        camera
    );

}


requestAnimationFrame(
    animate
);