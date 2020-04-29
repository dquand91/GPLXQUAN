import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RandomQuestion from '../screens/RandomQuestion/RandomQuestion';
import Exam from '../screens/ExamList/ExamList';
import Review from '../screens/Review/Review';
import WrongAnswer from '../screens/WrongAnswer/WrongAnswer';
import AllQuestion from '../screens/Review/AllQuestion/AllQuestion';
import PictureQuestion from '../screens/Review/PictureQuestion/PictureQuestion';
import ResultScreen from '../screens/ResultScreen/ResultScreen';
// import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

// import SignInScreen from '../screens/SignInScreen/SignInScreen';

const MyAppStack = createStackNavigator(
  // Những màn hình nào cùng 1 createStackNavigator thì mời navigator.goBack() được
  // Ở đây có 2 màn hình, nên goBack() được
  {
    Home: HomeScreen,
    RandomQuestion: RandomQuestion,
    Exam: Exam,
    Review: Review,
    WrongAnswer: WrongAnswer,
    AllQuestion: AllQuestion,
    PictureQuestion: PictureQuestion,
    ResultScreen: ResultScreen,
  },
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center',
    headerMode: 'none',
  },
);

// const MyAuthStack = createStackNavigator(
//   // Những màn hình nào cùng 1 createStackNavigator thì mời navigator.goBack() được
//   // Ở đây chỉ có 1 màn hình, nên không goBack() được
//   {
//     SignIn: SignInScreen,
//   },
//   {
//     initialRouteName: 'SignIn',
//     headerMode: 'none',
//     headerLayoutPreset: 'center',
//   },
// );

const MyAppNavigator = createSwitchNavigator(
  {
    // MyAuthLoading: AuthLoadingScreen,
    MyApp: MyAppStack,
    // MyAuth: MyAuthStack,
  },
  {
    initialRouteName: 'MyApp',
  },
);

export default createAppContainer(MyAppNavigator);
