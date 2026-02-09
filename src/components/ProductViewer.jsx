import clsx from "clsx";
import useMacbookStore from "../store";
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls } from "@react-three/drei";
import MacbookModel14 from "./models/Macbook-14";
import StudioLights from "./StudioLights";

const ProductViewer = () => {
        const { color, scale, setColor, setScale } = useMacbookStore();

        return (
                <section id="product-viewer">
                        <h2>Take a closer look.</h2>
                        <div className="controls">
                                <p className="info">Macbook Pro {scale} in {color}</p>
                                <div className="flex-center gap-5 mt-5">
                                        <div className="color-control">
                                                <div 
                                                        onClick={() => setColor("#ADB5BD")} 
                                                        className={clsx("bg-neutral-300", color === "#ADB5BD" && "active")}
                                                />
                                                <div 
                                                        onClick={() => setColor("#2E2C2E")} 
                                                        className={clsx("bg-neutral-900", color === "#2E2C2E" && "active")}
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
                                                        onClick={() => setScale(0.08)} 
                                                        className={clsx(scale === 0.08 ? "bg-white text-black" : "bg-transparent text-white")}
                                                >
                                                        <p>16"</p>
                                                </div>
                                        </div>
                                </div>
                        </div>

                        <Canvas id="canvas" camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100}}>
                                <StudioLights />
                                <MacbookModel14 scale={0.06} position={[0, 0, 0]} />
                                <OrbitControls enableZoom={false} />
                        </Canvas>
                </section>
        )
}

export default ProductViewer