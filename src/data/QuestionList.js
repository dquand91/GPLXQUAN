const customData = require('./QuestionData.json');
var myData = customData;
// console.log(customData);
var allKey = Object.keys(myData);
// console.log(allKey);
var listQuestion = allKey.map((entry, index) => {
  return {id: entry, value: Object.values(myData)[index]};
});
// console.log(listKey);

export {listQuestion};
