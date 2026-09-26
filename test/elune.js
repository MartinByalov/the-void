import * as THREE from "three";


export function createElune() {

    const group =
        new THREE.Group();


    group.userData = {
        world: "elune",
        selectable: true
    };


    const geometry =
        new THREE.SphereGeometry(
            .82,
            96,
            96
        );


    const material =
        new THREE.MeshStandardMaterial({

            color:
                0xe5d9c7,

            roughness:
                .95,

            emissive:
                0x302844,

            emissiveIntensity:
                .08
        });


    const moon =
        new THREE.Mesh(
            geometry,
            material
        );


    moon.userData = {
        world: "elune"
    };


    group.add(
        moon
    );


    /* ==============================================
       GLOW
    ============================================== */

    const glow =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                .91,
                64,
                64
            ),

            new THREE.MeshBasicMaterial({

                color:
                    0xd6d8ff,

                transparent:
                    true,

                opacity:
                    .08,

                side:
                    THREE.BackSide
            })
        );


    group.add(
        glow
    );


    group.userData.moon =
        moon;

    group.userData.glow =
        glow;


    return group;
}