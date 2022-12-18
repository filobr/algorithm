const filterArrays = (A: number[], B: number[]) => {                            //checking if A and B are arrays of numbers
  type memoType = {
    [key: number]: boolean;
  };

  const isPrimeMemo: memoType = {};                                             //object used for memoization of prime numbers

  const isPrime = (num: number) => {
    if (typeof isPrimeMemo[num] === "boolean") return isPrimeMemo[num];         //O(i)
    const sqrt = Math.sqrt(num);                                                //O(1)
    for (let i = 2; i <= sqrt; i++)                                             //O(sqrt(k))
      if (num % i === 0) {                                                      //O(1)                                    
        isPrimeMemo[num] = false;                                               //O(1)
        return false;                                                           //O(1)
      }

    isPrimeMemo[num] = num > 1;                                                 //O(1)
    return num > 1;                                                             //O(1)
  };

  const count = B.reduce(                                                       //O(m)
    (accumulator: { [key: number]: number }, value: number) => {
      return { ...accumulator, [value]: (accumulator[value] || 0) + 1 };        //O(1)
    },
    {}
  );

  const filterAMemo: memoType = {};                                             //object used for memoization of filtered elements

  return A.filter(element => {                                                  //O(n)
    if (typeof filterAMemo[element] === "boolean") return filterAMemo[element]; //O(j)
    const elementCount = count[element];                                        //O(1)
    if (elementCount) {                                                         //O(1)     
      const result = !isPrime(elementCount);                                    //O(sqrt(k))
      filterAMemo[element] = result;                                            //O(1)
      return result;                                                            //O(1)
    }
    filterAMemo[element] = true;                                                //O(1)
    return true;                                                                //O(1)
  });
};

const A = [2, 3, 9, 2, 5, 1, 3, 7, 10];
const B = [2, 1, 3, 4, 3, 10, 6, 6, 1, 7, 10, 10, 10];
console.log(filterArrays(A, B));


//n - size of A.
//m - size of B.
//k - size of number which is checked if is prime.
//j - number of elements in filterAMemo
//i - number of elements in isPrimeMemo

//Time complexity of iterating over array or object is O(n).
//Time complexity of function isPrime is sqrt(k).
//Time complexity of filterArrays function:
//T(n, m, k, j, i) = O(n) + O(m) + O(sqrt(k)) + O(j) + O(i),
//where we can skip the sqrt(k) factor because
//k is directly connected to m and sqrt(k) will
//always be much smaller then m.
//To fasten the execution of the filterArray function
//for very large arrays, two memoization functions
//are implemented. They can reduce the time of execution
//because we can assume that the memo objects are
//much smaller than A or B arrays, so the iteration
//over those will be much faster.
//Time complexity of each memo function is O(j) and O(i).
//We skip these factors according to the size of them,
//so according to Big O notation,
//the time complexity is O(n + m).
//