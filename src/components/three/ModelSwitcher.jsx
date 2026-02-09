import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
        if (!group) return;
        group.traverse((child) => {
                if (child.isMesh) {
                        child.material.transparent = true;
                        gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
                }
        });
};

const moveGroup = (group, x) => {
        if (!group) return;
        gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

const ModelSwitcher = ({ scale, visualScale }) => {
        const smallMacbookRef = useRef();
        const largeMacbookRef = useRef();

        const SCALE_SMALL = 0.06;
        const SCALE_LARGE = 0.07;

        const showLargeMacbook = scale === SCALE_LARGE;

        // -------------------------------
        // Starting point
        // -------------------------------
        useGSAP(() => {
                if (smallMacbookRef.current && largeMacbookRef.current) {

                        // small model
                        smallMacbookRef.current.position.x = showLargeMacbook ? -OFFSET_DISTANCE : 0;
                        smallMacbookRef.current.scale.set(visualScale, visualScale, visualScale);
                        smallMacbookRef.current.traverse(child => {
                                if (child.isMesh) {
                                        child.material.transparent = true;
                                        child.material.opacity = 0; // always visible from the start
                                }
                        });

                        // large model
                        largeMacbookRef.current.position.x = showLargeMacbook ? 0 : OFFSET_DISTANCE;
                        largeMacbookRef.current.scale.set(visualScale, visualScale, visualScale);
                        largeMacbookRef.current.traverse(child => {
                                if (child.isMesh) {
                                        child.material.transparent = true;
                                        child.material.opacity = 0; // always invisible at the start
                                }
                        });
                }
        }, []);

        // -------------------------------
        // Fade-in (active model)
        // -------------------------------
        useGSAP(() => {
                const activeGroup = showLargeMacbook ? largeMacbookRef.current : smallMacbookRef.current;

                if (activeGroup) {
                        activeGroup.traverse(child => {
                                if (child.isMesh) {
                                        gsap.to(child.material, {
                                                opacity: 1,
                                                duration: 1.2,
                                                ease: "power2.out"
                                        });
                                }
                        });
                }
        }, []);

        // -------------------------------
        // Switch 14" / 16"
        // -------------------------------
        useGSAP(() => {
                if (showLargeMacbook) {
                        moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
                        moveGroup(largeMacbookRef.current, 0);

                        fadeMeshes(smallMacbookRef.current, 0);
                        fadeMeshes(largeMacbookRef.current, 1);
                } else {
                        moveGroup(smallMacbookRef.current, 0);
                        moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

                        fadeMeshes(smallMacbookRef.current, 1);
                        fadeMeshes(largeMacbookRef.current, 0);
                }
        }, [scale]);

        // -------------------------------
        // Scale transition animation
        // -------------------------------
        useGSAP(() => {
                const activeGroup = showLargeMacbook ? largeMacbookRef.current : smallMacbookRef.current;

                if (activeGroup) {
                        gsap.to(activeGroup.scale, {
                                x: visualScale,
                                y: visualScale,
                                z: visualScale,
                                duration: 0.8,
                                ease: "power2.out"
                        });
                }
        }, [visualScale]);

        const controlsConfig = {
                snap: true,
                speed: 1,
                zoom: 1,
                azimuth: [-Infinity, Infinity],
                config: { mass: 1, tension: 0, friction: 26 }
        };

        return (
                <>
                        <PresentationControls {...controlsConfig}>
                                <group ref={largeMacbookRef}>
                                        <MacbookModel16 />
                                </group>
                        </PresentationControls>

                        <PresentationControls {...controlsConfig}>
                                <group ref={smallMacbookRef}>
                                        <MacbookModel14 />
                                </group>
                        </PresentationControls>
                </>
        );
};

export default ModelSwitcher;