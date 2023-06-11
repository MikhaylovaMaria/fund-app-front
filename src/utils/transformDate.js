export const transformFormDate = (date) => {
    return `${date.split("-")[2].split("T")[0]}.${date.split("-")[1]}.${
        date.split("-")[0]
    }`;
};
