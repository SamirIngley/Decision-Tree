const DataFrame = dfjs.DataFrame;
var treemap = d3.treemap();

dataset = {'Taste':['Salty','Spicy','Spicy','Spicy','Spicy','Sweet','Salty','Sweet','Spicy','Salty'],
       'Temperature':['Hot','Hot','Hot','Cold','Hot','Cold','Cold','Hot','Cold','Hot'],
       'Texture':['Soft','Soft','Hard','Hard','Hard','Soft','Soft','Soft','Soft','Hard'],
       'Eat':['No','No','Yes','No','Yes','Yes','No','Yes','Yes','Yes']};

const df = new DataFrame(dataset, ['Taste','Temperature','Texture','Eat']);

function entropy(df, targetClass) {
    var entropy = 0;
    const values = df.unique(targetClass).toArray(targetClass);

    values.forEach((value) => {
        const fraction = df.countValue(value, targetClass) / df.count();
        entropy += -fraction*Math.log2(fraction);
    });
    return entropy;
}

function attributeEntropy(df, attribute, targetClass) {
    const targetVariables = df.unique(targetClass).toArray(targetClass);
    const variables = df.unique(attribute).toArray(attribute);
    var entropy = 0;

    variables.forEach((variable) => {
        const denom = df
                        .filter(row => row.get(attribute) == variable)
                        .count();
        const fraction = denom / df.count();
        var _entropy = 0;

        targetVariables.forEach((targetVariable) => {
            const num = df
                        .filter(row => row.get(attribute) == variable)
                        .filter(row => row.get(targetClass) == targetVariable)
                        .count();
            const _fraction = num / (denom + Number.EPSILON);
            _entropy += -_fraction * Math.log(_fraction + Number.EPSILON);
        });
        entropy += -fraction*_entropy;
    });
    return Math.abs(entropy);
}

function bestSplit(df, targetClass) {
    const totalEntropy = entropy(df, targetClass);
    var best = [-Infinity, undefined];

    df.listColumns().forEach((column) => {

        if (column != targetClass) {
            const cur = totalEntropy - attributeEntropy(df, column, targetClass);

            if (cur > best[0])
                best = [cur, column];
        }
    });
    return best[1];
}

function fit(df, targetClass) {
    const node = bestSplit(df, targetClass);
    const values = df.unique(node).toArray(node);
    var tree = {};
    tree[node] = {};

    values.forEach((value) => {
        var subDf = df.filter(row => row.get(node) == value);
        var unique = subDf.unique(targetClass);

        if (tree[node] == undefined){
            console.log(tree);
        }

        if (unique.count() == 1)
            tree[node][value] = unique.toArray(targetClass)[0];
        else
            tree[node][value] = fit(subDf, targetClass);
    });
    return tree;
}

const tree = {'Taste': {'Salty': {'Texture': {'Hard': 'Yes', 'Soft': 'No'}},
  'Spicy': {'Temperature': {'Cold': {'Texture': {'Hard': 'No', 'Soft': 'Yes'}},
    'Hot': {'Texture': {'Hard': 'Yes', 'Soft': 'No'}}}},
  'Sweet': 'Yes'}};
