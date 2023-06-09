import { upperToHyphen } from "../utils/index";

export const MenuList = [
    {
        title: "Design Patterns",
        items: [
            "Introduction",
            "Singleton Pattern",
            "Proxy Pattern",
            "Provider Pattern",
            "Prototype Pattern",
            "Container/Presentational Pattern",
            "Observer Pattern",
            "Module Pattern",
            "Mixin Pattern",
            "Mediator/Middleware Pattern",
            "HOC Pattern",
            "Render Props Pattern",
            "Hooks Pattern",
            "Flyweight Pattern",
            "Factory Pattern",
            "Compound Pattern",
            "Command Pattern",
        ],
    },
    {
        title: "Rendering Patterns",
        items: [
            "Rendering Patterns Introduction",
            "Overview of React.js",
            "Client-side Rendering",
            "Server-side Rendering",
            "Static Rendering",
            "Incremental Static Generation",
            "Progressive Hydration",
            "Streaming Server-Side Rendering",
            "React Server Components",
            "Selective Hydration",
            "Islands Architecture",
            "Animating View Transitions",
        ],
    },
    {
        title: "Performance Patterns",
        items: [
            "Optimize your loading sequence",
            "Static Import",
            "Dynamic Import",
            "Import On Visibility",
            "Import On Interaction",
            "Route Based Splitting",
            "Bundle Splitting",
            "PRPL Pattern",
            "Tree Shaking",
            "Preload",
            "Prefetch",
            "Optimize loading third-parties",
            "List Virtualization",
            "Compressing JavaScript",
        ],
    },
];



export const getNextAndPrev = (path : string)=>{
    const allItems = MenuList.reduce((res,cur)=>{ return [...res,...cur.items] },[]).map(upperToHyphen);
    const nowItemIndex = allItems.findIndex(i=>path.includes(i));

    if(nowItemIndex === -1){
        return { next : `/posts/${allItems[0]}`, prev : `/posts/${allItems[2]}` };
    }

    const getLegalIndex = (index : number)=>{
        if(index < 0) return allItems.length - 1;
        if(index > allItems.length - 1) return 0;
        return index;
    };

    const prevIndex = getLegalIndex(nowItemIndex - 1);
    const nextIndex = getLegalIndex(nowItemIndex + 1);
    return { next : `/posts/${allItems[nextIndex]}`, prev : `/posts/${allItems[prevIndex]}` };
};