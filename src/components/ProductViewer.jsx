import clsx from "clsx";
import useMacbookStore from "../store";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import MacbookModel14 from "./models/Macbook-14";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
        const { color, scale, setColor, setScale } = useMacbookStore();
        // if the user is using a mobile device
        const isMobile = useMediaQuery({ query: "(max-width: 1024px)" })

        return (
                <section id="product-viewer">
                        <h2>Take a closer look.</h2>
                        <div className="controls">
                                <p className="info">Macbook Pro | Available in 14" & 16" in Space Grey & Charcoal Black</p>
                                <div className="flex-center gap-5 mt-5">
                                        <div className="color-control">
                                                <div 
                                                        onClick={() => setColor("#ADB5BD")} 
                                                        className={clsx("bg-neutral-300", color === "#ADB5BD" && "active")}
                                                />
                                                <div 
                                                        onClick={() => setColor("#5F5A59")} 
                                                        className={clsx("bg-neutral-900", color === "#5F5A59" && "active")}
                                                />
                                        </div>
                                        <div className="size-control">
                                                <div 
                                                        onClick={() => setScale(0.06)} 
                                                        className={clsx(scale === 0.06 ? "bg-white text-black" : "bg-transparent text-white")}
                                                >
                                                        <p>14"</p>
                                                </div>
                                                <div 
                                                        onClick={() => setScale(0.07)} 
                                                        className={clsx(scale === 0.07 ? "bg-white text-black" : "bg-transparent text-white")}
                                                >
                                                        <p>16"</p>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
                                <StudioLights />
                                <ModelSwitcher scale={isMobile ?  scale - 0.03 : scale} isMobile={isMobile}/>
                        </Canvas>
                </section>
        )
}

export default ProductViewer