export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateRandomArray(inputArray, numberOfItems) {
  if (inputArray.length < numberOfItems) {
    return inputArray;
  }
  let result = [];
  for (let i = 0; i < numberOfItems; i++) {
    let item = inputArray[randomInRange(0, inputArray.length - 1)];
    if (result.indexOf(item) < 0) {
      result.push(item);
    } else {
      i--;
    }
  }
  // console.log('generateRandomArray', result);
  return result;
}

export function randomInRange(min, max) {
  // return parseInt(min + Math.random() * (max - min));
  // Max + 1: vì nếu ko + 1 thì rất khó để random ra được Max.
  var result = parseInt(min + Math.random() * (max + 1 - min));
  if (result >= max) {
    result = max;
  }
  return result;
}

export function randomIndexFor8GroupOfExam() {
  const array70 = [...Array(70).keys()];
  console.log('=======================================');
  console.log('QUAN random30 array70', array70);

  const array30 = [...Array(30).keys()].map(i => i + 70);
  console.log('=======================================');
  console.log('QUAN random30 array30', array30);

  // vvvvvvvvvvvvvv Random Picture vvvvvvvvvvvvvvvvvv
  var result = [];
  var tempArray30 = array30;
  var x = 0;
  while (result.length < 8) {
    const resultWhile = [];
    const numOfPictureQuestion1 = randomInRange(5, 10);
    console.log('numOfPictureQuestion1', numOfPictureQuestion1);
    for (var i = 0; i < numOfPictureQuestion1; i++) {
      if (typeof tempArray30[0] === 'undefined') {
        tempArray30 = array30;
      }
      resultWhile.push(tempArray30[0]);
      tempArray30 = tempArray30.slice(1, tempArray30.length);
    }
    var itemResult = {indexQuestionList: resultWhile};
    result.push(itemResult);
  }
  console.log('------------END 11111---------------');
  console.log('END result 111111', result);
  // ^^^^^^^^^^ Xong phần random Picture ^^^^^^^^^^

  // vvvvvvvvvvvvv Random Text vvvvvvvvvvvvvvvv
  console.log('START 333333333333333333333333333333333333333333333');
  var tempArray70 = array70;
  for (var i = 0; i < result.length; i++) {
    const resultWhile = [];
    const numOfTextQuestion = 30 - result[i].indexQuestionList.length;
    console.log('numOfTextQuestion', numOfTextQuestion);
    for (var x = 0; x < numOfTextQuestion; x++) {
      if (typeof tempArray70[0] === 'undefined') {
        tempArray70 = array70;
      }
      resultWhile.push(tempArray70[0]);
      tempArray70 = tempArray70.slice(1, tempArray70.length);
    }
    var itemResultAti = result[i].indexQuestionList;
    itemResultAti.push(...resultWhile);
    result = result.map((obj, index) => {
      if (index === i) {
        return Object.assign(obj, {
          id: i,
          title: `Đề thi số ${i + 1}`,
          indexQuestionList: itemResultAti,
          correctList: [],
          isFinish: false,
        });
      } else {
        return obj;
      }
    });
  }
  console.log('------------END 33333333333---------------');
  console.log('END result 33333333333', result);

  return result;

  // return result.map(item => {
  //   var mang = shuffleArray(item.indexQuestionList);
  //   return {...item, indexQuestionList: mang};
  // });
}
