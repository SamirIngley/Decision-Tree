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
