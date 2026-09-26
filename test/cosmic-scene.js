import * as THREE from "three";


export function createVoidScene(
    scene
) {

    /* ==============================================
       STARS
    ============================================== */

    const stars =
        createStars(
            3000
        );


    scene.add(
        stars
    );


    /* ==============================================
       FLOATING ROCKS
    ============================================== */

    const rocks =
        new THREE.Group();


    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const size =
            .08 +
            Math.random() *
            .25;


        const geometry =
            new THREE.DodecahedronGeometry(
                size,
                0
            );


        const material =
            new THREE.MeshStandardMaterial({

                color:
                    Math.random() > .75
                        ? 0x70439b
                        : 0x373154,

                roughness:
                    .9
            });


        const rock =
            new THREE.Mesh(
                geometry,
                material
            );


        const angle =
            Math.random() *
            Math.PI *
            2;


        const radius =
            5 +
            Math.random() *
            7;


        rock.position.set(

            Math.cos(angle) *
            radius,

            (
                Math.random() -
                .5
            ) * 8,

            -3 -
            Math.random() *
            7
        );


        rock.rotation.set(

            Math.random() *
            Math.PI,

            Math.random() *
            Math.PI,

            Math.random() *
            Math.PI

        );


        rock.userData.rotationSpeed =

            (
                Math.random() -
                .5
            ) *
            .003;


        rocks.add(
            rock
        );

    }


    scene.add(
        rocks
    );


    /* ==============================================
       VOID VORTEX
    ============================================== */

    const vortex =
        createVortex();


    vortex.position.set(
        5.8,
        4,
        -8
    );


    vortex.rotation.x =
        -.25;


    scene.add(
        vortex
    );


    /* ==============================================
       ORBIT LINES
    ============================================== */

    const orbitGroup =
        new THREE.Group();


    orbitGroup.add(
        createOrbit(
            5.4,
            3.5
        )
    );


    orbitGroup.add(
        createOrbit(
            7.5,
            4.5
        )
    );


    scene.add(
        orbitGroup
    );


    return {

        stars,
        rocks,
        vortex,
        orbitGroup

    };
}


/* ==================================================
   STARS
================================================== */

function createStars(
    count
) {

    const positions =
        new Float32Array(
            count * 3
        );


    for (
        let i = 0;
        i < count;
        i++
    ) {

        positions[
            i * 3
        ] =
            (
                Math.random() -
                .5
            ) * 70;


        positions[
            i * 3 + 1
        ] =
            (
                Math.random() -
                .5
            ) * 40;


        positions[
            i * 3 + 2
        ] =
            -5 -
            Math.random() *
            50;

    }


    const geometry =
        new THREE.BufferGeometry();


    geometry.setAttribute(

        "position",

        new THREE.BufferAttribute(
            positions,
            3
        )

    );


    return new THREE.Points(

        geometry,

        new THREE.PointsMaterial({

            color:
                0xdbe5ff,

            size:
                .055,

            transparent:
                true,

            opacity:
                .85

        })

    );
}


/* ==================================================
   VORTEX
================================================== */

function createVortex() {

    const group =
        new THREE.Group();


    const colors = [

        0x4b2a96,
        0x693bc5,
        0xa74fe5,
        0xd77cff

    ];


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const radius =
            1.1 +
            i * .17;


        const geometry =
            new THREE.TorusGeometry(
                radius,
                .06 + i * .004,
                10,
                80
            );


        const material =
            new THREE.MeshBasicMaterial({

                color:
                    colors[
                        i %
                        colors.length
                    ],

                transparent:
                    true,

                opacity:
                    .12
            });


        const ring =
            new THREE.Mesh(
                geometry,
                material
            );


        ring.rotation.z =
            i * .22;


        ring.scale.y =
            .72;


        group.add(
            ring
        );

    }


    const center =
        new THREE.Mesh(

            new THREE.CircleGeometry(
                1.05,
                64
            ),

            new THREE.MeshBasicMaterial({
                color:
                    0x050516
            })
        );


    group.add(
        center
    );


    return group;
}


/* ==================================================
   ORBIT
================================================== */

function createOrbit(
    x,
    y
) {

    const curve =
        new THREE.EllipseCurve(
            0,
            0,
            x,
            y,
            0,
            Math.PI * 2
        );


    const points =
        curve.getPoints(
            180
        );


    const geometry =
        new THREE.BufferGeometry()
        .setFromPoints(
            points
        );


    const material =
        new THREE.LineBasicMaterial({

            color:
                0xf4d596,

            transparent:
                true,

            opacity:
                .22

        });


    const line =
        new THREE.LineLoop(
            geometry,
            material
        );


    line.rotation.x =
        THREE.MathUtils.degToRad(
            68
        );


    return line;
}