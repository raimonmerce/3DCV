
declare module '*.glb' {
    const src: string
    export default src
}
declare module '*.fbx' {
    const src: string;
    export default content;
}

declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}