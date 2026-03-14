import React, { useEffect, useRef, useState, Fragment } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clsx } from "clsx";

gsap.registerPlugin(ScrollTrigger);

export type EffectType =
    | "char-variation-1"
    | "char-variation-2"
    | "char-variation-3"
    | "char-variation-4"
    | "char-variation-5"
    | "char-variation-6"
    | "word-variation-1"
    | "word-variation-2"
    | "word-variation-3";

export interface TextEffectProps {
    effect?: EffectType;
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
    speed?: number;
}

const wrapElements = (
    elems: NodeListOf<Element> | Element[],
    wrapType: keyof HTMLElementTagNameMap,
    wrapClass: string
): void => {
    Array.from(elems).forEach((elem) => {
        const wrapEl = document.createElement(wrapType);
        wrapEl.className = wrapClass;
        elem.parentNode?.insertBefore(wrapEl, elem);
        wrapEl.appendChild(elem);
    });
};

export const TextEffect: React.FC<TextEffectProps> = ({
    effect = "char-variation-1",
    children,
    className,
    speed = 1.5,
    as: Component = "h2",
}) => {
    const scope = useRef<any>(null);
    const [splitting, setSplitting] = useState<any>(null);

    useEffect(() => {
        // @ts-expect-error no modules for typescript
        import("splitting").then((Splitting) => {
            setSplitting(() => Splitting.default);
        });
    }, []);

    useGSAP(
        async () => {
            if (!splitting || !scope.current) return;
            await splitting({ target: scope.current });

            const chars = scope.current?.querySelectorAll(".char");
            const words = scope.current?.querySelectorAll(".word");

            if (!chars || !words || !chars?.length || !words?.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scope.current,
                    start: "top 85%",
                },
            });

            tl.timeScale(speed);

            switch (effect) {
                case "char-variation-1":
                    tl.fromTo(
                        chars,
                        {
                            opacity: 0,
                            filter: "blur(12px)",
                            willChange: "filter, opacity",
                        },
                        {
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 0.6,
                            stagger: 0.03,
                            ease: "power2.out",
                        }
                    );
                    break;
                case "char-variation-2":
                    tl.fromTo(
                        chars,
                        {
                            scaleY: 0.1,
                            scaleX: 1.8,
                            filter: "blur(10px) brightness(50%)",
                            willChange: "filter, transform",
                        },
                        {
                            scaleY: 1,
                            scaleX: 1,
                            filter: "blur(0px) brightness(100%)",
                            duration: 0.5,
                            stagger: 0.05,
                            ease: "none",
                        }
                    );
                    break;
                case "char-variation-3":
                    tl.fromTo(
                        chars,
                        {
                            willChange: "opacity, transform",
                            opacity: 0,
                            xPercent: () => gsap.utils.random(-200, 200),
                            yPercent: () => gsap.utils.random(-150, 150),
                        },
                        {
                            ease: "power1.inOut",
                            opacity: 1,
                            xPercent: 0,
                            yPercent: 0,
                            stagger: { each: 0.05, grid: "auto", from: "random" },
                        }
                    );
                    break;
                case "char-variation-4":
                    wrapElements(chars, "span", "char-wrap");
                    tl.fromTo(
                        chars,
                        {
                            willChange: "transform",
                            xPercent: -250,
                            rotationZ: 45,
                            scaleX: 6,
                            transformOrigin: "100% 50%",
                        },
                        {
                            duration: 1,
                            ease: "power2",
                            xPercent: 0,
                            rotationZ: 0,
                            scaleX: 1,
                            stagger: 0.06,
                        }
                    );
                    break;
                case "char-variation-5":
                    wrapElements(chars, "span", "char-wrap");
                    tl.fromTo(
                        chars,
                        {
                            willChange: "transform",
                            transformOrigin: "0% 50%",
                            xPercent: 105,
                        },
                        {
                            duration: 1,
                            ease: "expo",
                            xPercent: 0,
                            stagger: 0.05,
                        }
                    );
                    break;
                case "char-variation-6":
                    tl.fromTo(
                        chars,
                        {
                            willChange: "transform",
                            transformOrigin: "50% 100%",
                            scaleY: 0,
                        },
                        {
                            ease: "power3.in",
                            opacity: 1,
                            scaleY: 1,
                            stagger: 0.05,
                        }
                    );
                    break;
                case "word-variation-1":
                    tl.fromTo(
                        words,
                        {
                            willChange: "opacity, filter",
                            opacity: 0,
                            filter: "blur(12px)",
                        },
                        {
                            duration: 0.8,
                            ease: "power2.out",
                            opacity: 1,
                            filter: "blur(0px)",
                            stagger: 0.08,
                        }
                    );
                    break;
                case "word-variation-2":
                    tl.fromTo(
                        words,
                        {
                            willChange: "transform",
                            transformOrigin: "50% 0%",
                            scaleY: 0,
                            overflow: "hidden",
                        },
                        {
                            ease: "back.inOut",
                            opacity: 1,
                            scaleY: 1,
                            yPercent: 0,
                            stagger: 0.1,
                            duration: 1,
                        }
                    );
                    break;
                case "word-variation-3":
                    words.forEach((word: any) => gsap.set(word.parentNode, { perspective: 1000 }));
                    tl.fromTo(
                        words,
                        {
                            willChange: "opacity, transform",
                            z: () => gsap.utils.random(500, 950),
                            opacity: 0,
                            xPercent: () => gsap.utils.random(-100, 100),
                            yPercent: () => gsap.utils.random(-10, 10),
                            rotationX: () => gsap.utils.random(-90, 90),
                        },
                        {
                            ease: "expo",
                            opacity: 1,
                            rotationX: 0,
                            rotationY: 0,
                            xPercent: 0,
                            yPercent: 0,
                            duration: 2,
                            stagger: { each: 0.1, from: "random" },
                            z: 0,
                        }
                    );
                    break;
                default:
                    break;
            }
        },
        { scope, dependencies: [effect, splitting] }
    );

    const RenderComponent = Component as any;

    return (
        <RenderComponent
            ref={scope}
            data-splitting
            className={clsx(
                "[&_.char-wrap]:inline-flex [&_.char-wrap]:overflow-hidden [&_.char]:inline-block [&_.word]:inline-block [&_.word]:whitespace-nowrap",
                className
            )}
        >
            {children}
        </RenderComponent>
    );
};
