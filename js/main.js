
entropy = (nums) => nums.reduce((total, num) => total - num*Math.log2(num));


function getData() {

}

function uniqueVals() {

}

function partition(rows, column) {
    var true_rows = []
    var false_rows = []

    for (row in rows){
        if (column.match(row)) {
            true_rows.append(row)
        } else {
            false_rows.append(row)
        }
    }
}

function findBestSplit(rows) {

    var best_gain = 0 // best Infoormation Gain

    for (col in range(n_features)) {

        var values

        for (val in values) {
            var question = new Question(col, val, example)
            

            
        }
    }
}
