'use strict';

(() => {

  const ctx     = document.querySelector('#algorithm-benchmark').getContext('2d');
  const SIZES   = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
  const SIZES_2 = [2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000];

  function renderGraph(chart, avgTimes, worstTimes, size) {
    const data = {
      xLabels: size,
      datasets: [
        {
          label: 'Average Complexity',
          fill: false,
          borderColor: '#222',
          data: avgTimes
        },
        {
          label: 'Worst Case Complexity',
          fill: false,
          borderColor: '#ED4E82',
          data: worstTimes
        }
      ]
    };
    const options = {
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Time (ms)'
          }
        }],
        xAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Collection Size'
          }
        }]
      }
    }
    const myWeatherChart = new Chart(chart, {
      type: 'line',
      options,
      data,
    });
  }

  function getRandomArray(n) {
    const arr = [];
    for(let i = 0; i < n; i++) {
      arr.push(Math.round(Math.random() * 100));
    }
    return arr;
  }

  function getBackwardsArr(n) {
    const arr = [];
    for(let i = n; i > 0; i--) {
      arr.push(i);
    }
    return arr;
  }

  function getAvgComplexity(fun, sizes) {
    const times = [];
    for(let i = 0; i < sizes.length; i++) {
      let sizeTime = 0;
      for(let j = 0; j < 10; j++) {
        let tempArr = getRandomArray(sizes[i]);
        let totalTime = 0;
        for(let k = 0; k < 3; k++) {
          let t1 = performance.now();
          fun(tempArr);
          let t2 = performance.now();
          totalTime += (t2 - t1);
        }
        sizeTime += (totalTime / 3);
      }
      times.push(sizeTime/10);
    }
    return times;
  }

  function getWorstComplexity(fun, sizes) {
    const times = [];
    for(let i = 0; i < sizes.length; i++) {
      let sizeTime = 0;
      for(let j = 0; j < 10; j++) {
        let tempArr = getBackwardsArr(sizes[i]);
        let totalTime = 0;
        for(let k = 0; k < 3; k++) {
          let t1 = performance.now();
          fun(tempArr);
          let t2 = performance.now();
          totalTime += (t2 - t1);
        }
        sizeTime += (totalTime / 3);
      }
      times.push(sizeTime/10);
    }
    return times;
  }

  function swapFirstAndLast(arr) {
    let temp = arr[0];
    arr[0] = arr[arr.length - 1];
    arr[arr.length - 1] = temp;
  }

  function arrToString(arr) {
    let str = '';
    for(let i = 0; i < arr.length; i++) {
      str += `${i+1}: ${arr[i]}\n`;
    }
    return str
  }

  function bubbleSort(arr) {
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j+1]) {
          let temp = arr[j];
          arr[j]   = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
  }

  function bubbleSortOptimized(arr) {
    for(let i = 0; i < arr.length; i++) {
      for(let j = 0; j < arr.length - 1 - i; j++) {
        if (arr[j] > arr[j+1]) {
          let temp = arr[j];
          arr[j]   = arr[j+1];
          arr[j+1] = temp;
        }
      }
    }
  }

  function insertionSort(arr) {
    for(let i = 1; i < arr.length; i++) {
      let temp = arr[i];
      let j = i - 1;
      while(j >= 0 && arr[j] > temp) {
        arr[j+1] = arr[j];
        j -= 1;
      }
      arr[j+1] = temp;
    }
  }

  //***** Uncomment these out one at a time *****
  
  // Constant time example
  // renderGraph(ctx, getAvgComplexity(swapFirstAndLast, SIZES_2), SIZES_2);
  
  // Linear example
  // renderGraph(ctx, getAvgComplexity(arrToString, SIZES_2), SIZES_2);
  
  // Quadratic Examples
  // Bubble Sort:
  // Avg case:
  // renderGraph(ctx, getAvgComplexity(bubbleSort, SIZES), SIZES);
  // Worst case: 
  // renderGraph(ctx, getWorstComplexity(bubbleSort, SIZES), SIZES);
  
  // Bubble Sort Optimized:
  // Avg case:
  // renderGraph(ctx, getAvgComplexity(bubbleSortOptimized, SIZES), SIZES);
  // Worst case: 
  // renderGraph(ctx, getWorstComplexity(bubbleSortOptimized, SIZES), SIZES);

  // Insertion sort:
  // Avg case:
  // renderGraph(ctx, getAvgComplexity(insertionSort, SIZES), SIZES);
  // Worst case:
  renderGraph(ctx, getAvgComplexity(insertionSort, SIZES), getWorstComplexity(insertionSort, SIZES), SIZES);
})();