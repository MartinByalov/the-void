import * as THREE from "three";


export function createTerra() {

    const group =
        new THREE.Group();


    group.userData = {
        world: "terra",
        selectable: true
    };


    /* ==============================================
       PLANET
    ============================================== */

    const geometry =
        new THREE.SphereGeometry(
            2.35,
            128,
            128
        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0x1598d0,

            roughness:
                0.75,

            metalness:
                0,

            emissive:
                0x052b5b,

            emissiveIntensity:
                0.15
        });


    const planet =
        new THREE.Mesh(
            geometry,
            material
        );


    planet.userData = {
        world: "terra"
    };


    group.add(
        planet
    );


    /* ==============================================
       LAND
    ============================================== */

    const landMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0x62a843,

            roughness:
                0.9
        });


    const landPieces = [

        {
            lat: 35,
            lon: -25,
            sx: 1.25,
            sy: .75
        },

        {
            lat: 5,
            lon: 20,
            sx: .75,
            sy: 1.2
        },

        {
            lat: 35,
            lon: 80,
            sx: 1.35,
            sy: .8
        },

        {
            lat: -25,
            lon: 115,
            sx: .75,
            sy: .55
        },

        {
            lat: 40,
            lon: -105,
            sx: 1.1,
            sy: .8
        }

    ];


    for (
        const land of landPieces
    ) {

        addLand(
            planet,
            landMaterial,
            land
        );

    }


    /* ==============================================
       CLOUDS
    ============================================== */

    const cloudMaterial =
        new THREE.MeshStandardMaterial({

            color:
                0xffffff,

            transparent:
                true,

            opacity:
                .7,

            roughness:
                1
        });


    const cloudGeometry =
        new THREE.SphereGeometry(
            2.39,
            96,
            96
        );


    const clouds =
        new THREE.Mesh(
            cloudGeometry,
            cloudMaterial
        );


    clouds.material.transparent =
        true;

    clouds.material.opacity =
        .08;


    group.add(
        clouds
    );


    /* ==============================================
       ATMOSPHERE
    ============================================== */

    const atmosphere =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                2.48,
                96,
                96
            ),

            new THREE.MeshBasicMaterial({

                color:
                    0x62c8ff,

                transparent:
                    true,

                opacity:
                    .1,

                side:
                    THREE.BackSide
            })
        );


    group.add(
        atmosphere
    );


    /* ==============================================
       GLOW
    ============================================== */

    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                2.62,
                64,
                64
            ),

            new THREE.MeshBasicMaterial({

                color:
                    0x398cff,

                transparent:
                    true,

                opacity:
                    .055,

                side:
                    THREE.BackSide
            })
        );


    group.add(
        glow
    );


    /* ==============================================
       PUBLIC
    ============================================== */

    group.userData.planet =
        planet;

    group.userData.clouds =
        clouds;

    group.userData.glow =
        glow;


    return group;
}


/* ==================================================
   LAND HELPER
================================================== */

function addLand(
    planet,
    material,
    config
) {

    const geometry =
        new THREE.CircleGeometry(
            .5,
            14
        );


    geometry.scale(
        config.sx,
        config.sy,
        1
    );


    const land =
        new THREE.Mesh(
            geometry,
            material
        );


    const radius =
        2.365;


    const phi =
        THREE.MathUtils.degToRad(
            90 - config.lat
        );


    const theta =
        THREE.MathUtils.degToRad(
            config.lon + 180
        );


    land.position.set(

        -radius *
        Math.sin(phi) *
        Math.cos(theta),

        radius *
        Math.cos(phi),

        radius *
        Math.sin(phi) *
        Math.sin(theta)

    );


    land.lookAt(
        0,
        0,
        0
    );


    land.rotateY(
        Math.PI
    );


    planet.add(
        land
    );

}