
entropy = (nums) => nums.reduce((total, num) => total - num*Math.log2(num));

/* Big Thanks to https://tinyurl.com/yafxtms8 for a detailed Decision Tree
 * Classifier walk-through which heavily influenced this project.
 */

class Question {

    constructor(column, value) {
        this.column = column;
        this.value = value;
    }

    check(data) {
        return data[this.column] > this.value;
    }
}

class Node {

    constructor(question, trueBranch, falseBranch) {
        this.question = question;
        this.trueBranch = trueBranch;
        this.falseBranch = falseBranch;
    }
}

class Leaf {

    constructor(rows) {
        this.predictions = hist(rows);
    }
}

function partition(rows, question) {
    var trueRows = [];
    var falseRows = [];

    rows.forEach((row) => {
        if (question.check(row))
            trueRows.push(row);
        else
            falseRows.push(row);
    });
    return [trueRows, falseRows];
}

function hist(arr) {
    counts = {};

    for (var i = 0; i < arr.length; i++)
        if (arr[i] in counts)
            counts[arr[i]]++;
        else
            counts[arr[i]] = 1;
    return counts;
}

function gini(rows) {
    /*
    information gain:
    gain(D, A) = entropy(D)- SUM ( |Di| / |D| * entropy(Di) )
    */
    const counts = hist(rows);
    const N = rows.length;
    var impurity = 1;

    Object.keys(counts).forEach((label) => {
        label_prob = counts[label] / N;
        impurity -= label_prob**2;
    });
    return impurity;
}

function infoGain(left, right, curUncertainty) {
    p = left.length / (left.length + right.length);
    return curUncertainty - p * gini(left) - (1 - p) * gini(right);
}

function bestSplit(rows) {
    var bestQuestion;
    var bestGain = 0;
    var curUncertainty = gini(rows);
    const featuresCount = rows[0].length - 1;

    for (var col = 0; col < featuresCount; col++) {
        const values = new Set(rows.map((row) => row[col]));

        values.forEach((val) => {
            const question = new Question(col, val);
            const [trueRows, falseRows] = partition(rows, question);

            if (trueRows.length != 0 && falseRows.length != 0) {
                const gain = infoGain(trueRows, falseRows, curUncertainty);

                if (gain > bestGain) {
                    bestGain = gain;
                    bestQuestion = question;
                }
            }
        });
    }
    return [bestGain, bestQuestion];
}

function fit(features, labels) {
    var data = features + labels;
    var [gain, question] = bestSplit(data);

    if (gain == 0)
        return new Leaf(data);
    var trueRows, falseRows = partition(data, question);
    trueBranch = fit(trueRows, labels);
    falseBranch = fit(falseRows, labels);
    return new Node(question, trueBranch, falseBranch);
}


const DataFrame = dfjs.DataFrame;
/*
class Node {
    constructor(X, y, indices, minLeaf=5) {
        this.X = X;
        this.y = y;
        this.indices = indices;
        this.minLeaf = minLeaf;
        this.rows = X.length;
        this.cols = X.listColumns().length;
        this.val = 0;

        for (var i = 0; i < indices.length; i++)
            this.val += y.select(indices[i]);
        this.val /= y.length;
        this.score = Infinity;
        this.findBestSplit()
    }

    findBestSplit() {
        for (var c = 0; c < this.cols; c++)
            this.findBetterSplit(c);
        if (this.isLeaf())
            return;
        var x = this.splitCol();
    }

    isLeaf() {
        return this.score == Infinity;
    }

    splitCol() {

    }


}

class DecisionTree {

    fit(X, y, minLeaf=5) {
        var indices = [];

        for (var i = 0; i < y.length; i++)
            indices.push(i);
        this.tree = Node(X, y, indices, minLeaf);
        return this;
    }

    predict(X) {
        return this.tree.predict(X);
    }
}
*/
