
declare module '*.glb' {
    const src: string
    export default src
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}