export const getRandomColor = (n) => {
    const colors = [];
    for (let i = 0; i < n; i++) {
        const r = Math.floor(Math.random() * 156) + 100;
        const g = Math.floor(Math.random() * 156) + 100;
        const b = Math.floor(Math.random() * 156) + 100;
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }
    return colors;
};
