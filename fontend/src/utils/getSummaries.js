export function getSummaries(param) {
    const {
        columns,
        data
    } = param;
    const sums = [];
    columns.forEach((column, index) => {
        if (index === 0) {
            sums[index] = '总价';
            return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return (prev + curr).toFixed(2);
                } else {
                    return prev;
                }
            }, 0);
            sums[index] += ' 元';
        } else {
            sums[index] = 'N/A';
        }
    });
    return sums;
}