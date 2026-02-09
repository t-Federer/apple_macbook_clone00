import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
        if(!group) return;
        group.traverse((child) => {
                if(child.isMesh) {
                     child.material.transparent = true;
                     gsap.to(child.material, { opacity, duration: ANIMATION_DURATION })
                }
        })
} 

const moveGroup = (group, x) => {
        if(!group) return;

        gsap.to(group.position, { x, duratio: ANIMATION_DURATION })
}

const ModelSwitcher = ({ scale, visualScale}) => {
    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    // logic values
    const SCALE_SMALL = 0.06;
    const SCALE_LARGE = 0.07;

    const showLargeMacbook = scale === SCALE_LARGE;

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
                    <MacbookModel16 scale={visualScale} />
                </group>
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={visualScale} />
                </group>
            </PresentationControls>
        </>
    );
};

export default ModelSwitcher