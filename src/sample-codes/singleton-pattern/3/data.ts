const allFiles = await import.meta.glob("./**/*", { eager: true, as: "raw" });
const files = {};
Object.keys(allFiles).forEach(key => {
    if(key.includes("data.ts")) return;
    files[key.replace(`./`, "")] = allFiles[key];
});
export default files;