import { useRef } from "react";
import { performanceImages, performanceImgPositions } from "../constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

const Performance = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            ".content p",
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".content p",
                    start: isDesktop ? "top bottom" : "90% bottom",
                }
            }
        );

        // ── Desktop: percentage-based left/right/bottom positioning ────────
        if (isDesktop) {
            const tl = gsap.timeline({
                defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "center top",
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            performanceImgPositions.forEach((item) => {
                if (item.id === "p5") return;
                const selector = `.${item.id}`;
                const coords = item.desktop;
                const props = {};

                if (typeof coords.left   === "number") props.left   = `${coords.left}%`;
                if (typeof coords.right  === "number") props.right  = `${coords.right}%`;
                if (typeof coords.bottom === "number") props.bottom = `${coords.bottom}%`;
                if (coords.transform) props.transform = coords.transform;

                tl.to(selector, props, 0);
            });

            return;
        }

        // ── Mobile: images radiate outward from center ─────────────────────
        performanceImgPositions.forEach((item) => {
            if (item.id === "p5") return;
            gsap.set(`.${item.id}`, { x: 0, y: 0 });
        });

        const tl = gsap.timeline({
            defaults: { ease: "power1.inOut", overwrite: "auto" },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "center top",
                scrub: 1,
                invalidateOnRefresh: true,
            }
        });

        performanceImgPositions.forEach((item) => {
            if (item.id === "p5") return;
            const selector = `.${item.id}`;
            const { x, y } = item.mobile;
            tl.to(selector, { x, y }, 0);
        });

    }, { scope: sectionRef, dependencies: [isDesktop] });

    return (
        <section id="performance" ref={sectionRef}>
            <h2>Next-level graphics performance. Game on.</h2>
            <div className="wrapper">
                {performanceImages.map((item, index) => (
                    <img
                        key={index}
                        src={item.src}
                        className={item.id}
                        alt={item.id || `Performance Image #${index + 1}`}
                    />
                ))}
            </div>

            <div className="content">
                <p>
                    With the M4 chip{" "}
                    <span className="text-white">
                        gaming feels more immersive than ever.
                    </span>{" "}
                    Run graphics-intensive workflows with a responsiveness that keeps up
                    with{" "}
                    <span className="text-white">
                        your imagination
                    </span>.
                    <br />Dynamic Caching optimizes fast on-chip memory to dramatically
                    increase average GPU utilization — driving a huge{" "}
                    <span className="text-white">
                        performance boost
                    </span>{" "}
                    for the most demanding tasks.
                </p>
            </div>
        </section>
    );
}

export default Performance;
