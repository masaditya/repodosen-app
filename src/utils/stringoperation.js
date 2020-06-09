export const stringToUppercase = (str) => {
    const log = str.split("_").map((word) => {
        const tmp = word.charAt(0).toUpperCase() + word.slice(1);
        return tmp;
    });
    return log.join(" ");
};

export const stringSplitSlash = (str) => {
    const tmp = str.split("/")
    return tmp[tmp.length - 1]
}

export const stringToLow = (str = "") => {
    return str.toLowerCase()
}