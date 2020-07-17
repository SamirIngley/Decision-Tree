const assert = function(condition, message) {
    if (!condition)
        throw Error('Assert failed: ' + (message || `${condition}`));
};

const arraysEqual = function (A, B) {
    assert(A.length == B.length);

    for (var i = 0; i < A.length; i++)
        if (A[i] != B[i])
            return false;
    return true;
}

/* Test Histogram Generator */
arr = ['A', 'B', 'C', 'C', 'B', 'C'];
counts = hist(arr);
actualKeys = Object.keys(counts);
actualKeys.sort();
assert(arraysEqual(actualKeys, ['A', 'B', 'C']));
assert(counts['A'] == 1);
assert(counts['B'] == 2);
assert(counts['C'] == 3);

/* Test Gini */
assert(gini(['A', 'B', 'A', 'B']) == 0.5);
assert(gini(['A', 'A', 'A']) == 0);

// dataset = {'Taste':['Salty','Spicy','Spicy','Spicy','Spicy','Sweet','Salty','Sweet','Spicy','Salty'],
//        'Temperature':['Hot','Hot','Hot','Cold','Hot','Cold','Cold','Hot','Cold','Hot'],
//        'Texture':['Soft','Soft','Hard','Hard','Hard','Soft','Soft','Soft','Soft','Hard'],
//        'Eat':[false, false, true, false, true, true, false, true, true, true]}

features = [['Salty','Spicy','Spicy','Spicy','Spicy','Sweet','Salty','Sweet','Spicy','Salty'],
            ['Hot','Hot','Hot','Cold','Hot','Cold','Cold','Hot','Cold','Hot'],
            ['Soft','Soft','Hard','Hard','Hard','Soft','Soft','Soft','Soft','Hard'],
            [false, false, true, false, true, true, false, true, true, true]];
labels = ['Taste', 'Temperature', 'Texture', 'Eat'];

var root = fit(features, labels);


console.log(root);
/* Test Node */
const X = new DataFrame({
    column1: [3, 6, 8],
    column2: [3, 4, 5, 6],
}, ['column1', 'column2']);
const y = new DataFrame({
    target: [3, 6, 8],
}, ['target']);
