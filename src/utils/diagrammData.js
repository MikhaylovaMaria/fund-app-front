export const diagrammData = (operations, operationCategories, type) => {
    const temp = operations.filter((e) => e.type === type);
    const labelsId = temp.map((o) => o.category);
    const uniqueIdLabels = [...new Set(labelsId)];
    const labels = uniqueIdLabels.map((id) =>
        operationCategories.find((c) => c._id === id)
    );
    const data = [];
    for (const i of labels) {
        const currentOperations = temp.filter((o) => o.category === i._id);
        const summaCat = currentOperations.reduce(
            (ac, curVal) => ac + curVal.summa,
            0
        );
        data.push({ _id: i._id, name: i.name, summa: summaCat });
    }
    return data;
};
