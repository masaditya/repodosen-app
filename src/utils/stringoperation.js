export const stringToUppercase = (str) => {
    const log = str.split("_").map((word) => {
        const tmp = word.charAt(0).toUpperCase() + word.slice(1);
        return tmp;
    });
    return log.join(" ");
};

export const stringToLow = (str = "") => {
    return str.toLowerCase()
}