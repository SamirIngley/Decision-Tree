
entropy = (nums) => nums.reduce((total, num) => total - num*Math.log2(num));
