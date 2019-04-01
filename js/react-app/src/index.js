import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';

import LoadingComponent from './routes/Loading/LoadingComponent';
import rootReducer from './common/reducers';
import { setSidebarExpansionState } from './common/actions/layout';
import {
  getCurrentUser,
  getCommonData,
  getDashboardData,
  getMeasurements,
  getUnlockedAchievements,
  getFavoriteItems,
  getPreferences
} from './common/actions/user';
import {
  getFullCourses,
  getCurrentCourses,
  getDaySchedule,
  getAllTrainers,
  getCourseFilters
} from './common/actions/training';
import { getHealthPosts } from './common/actions/posts';
import {
  getMealCategoryInfo,
  getMealCategoryItems,
  getMeal,
  getMealPlan
} from './common/actions/meals';
import { getVideos } from './common/actions/videos';
import {
  PrimaryButton,
  SecondaryButton,
  BlueButton,
  WhiteButton,
  TextBlueButton,
  TextDarkGreyButton,
  TextLightGreyButton,
  TextPinkButton,
  TextWhiteButton,
  StyledCheckbox,
  StyledRadio
} from './common/customizedMaterialComponents';
import {
  StyledTableHead,
  StyledTableRow,
  StyledTableHeadDateCell,
  StyledTableCell
} from './routes/Measurements/customizedMaterialComponents';
import { toDateString } from './common/helpers';
import './assets/styles/main.scss';
import './assets/styles/lightbox.scss';


// Override webpack public path with dynamic path provided by site.twig
__webpack_public_path__ = document.getElementById('reactor').dataset.baseurl; // eslint-disable-line

// const loggerMiddleware = createLogger();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
      // loggerMiddleware,
    )
  )
);

(function() {
  window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    return false;
  };
})();

const find = id => document.getElementById(id);

const sidebar = find('app-sidebar');
const header = find('app-header');
const footer = find('app-footer');
const home = find('home-root');
const measurements = find('measurements-root');
const achievements = find('achievements-root');
const favorites = find('favorites-root');
const training = find('training-root');
const trainingPlans = find('training-plans-root');
const singleTrainingPlan = find('single-training-plan-root');
const trainingPlanSearch = find('training-plan-search-root');
const weekPlan = find('week-plan-root');
const trainers = find('trainers-root');
const video = find('video-root');
const videos = find('videos-root');
const videoDownloads = find('video-downloads-root');
const courseSearch = find('course-search-root');
const singleCourse = find('single-course-root');
const news = find('news-root');
const meals = find('meals-root');
const mealsSearch = find('meals-search-root');
const mealCategory = find('meal-category-root');
const mealPlan = find('meal-plan-root');
const singleMeal = find('single-meal-root');
const groceryList = find('grocery-list-root');
const advices = find('advices-root');
const fitBook = find('fit-book-root');
const register = find('register-root');
const publicStats = find('public-stats-root');
const friends = find('friends-root');
const chat = find('chat-root');
const apps = find('apps-root');
const books = find('books-root');
const shop = find('shop-root');
const help = find('help-root');
const profile = find('profile-root');
const settings = find('settings-root');
const goal = find('goal-root');
const pricing = find('pricing-root');
const upgrade = find('upgrade-root');
const searchResults = find('search-results-root');
const contact = find('contact-root');
const conditions = find('conditions-root');
const imprint = find('imprint-root');
const companies = find('companies-root');
const partner = find('partner-root');
const landing = find('landing-root');

if (sidebar) {
  const { innerWidth: screenWidth } = window;
  const isTabletOrMobile = screenWidth < 1025;
  store.dispatch(setSidebarExpansionState(!isTabletOrMobile));
  store.dispatch(getCurrentUser());
  store.dispatch(getCommonData());

  const Sidebar = Loadable({
    loader: () => import('./common/components/Sidebar/SidebarContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Sidebar {...sidebar.dataset} />
    </Provider>,
    sidebar
  );
}

if (header) {
  const Header = Loadable({
    loader: () => import('./common/components/Header/HeaderContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Header {...header.dataset} />
    </Provider>,
    header
  );
}

if (footer) {
  const Footer = Loadable({
    loader: () => import('./common/components/Footer/Footer'),
    loading: LoadingComponent
  });

  render(<Footer {...footer.dataset} />, footer);
}

if (home) {
  store.dispatch(getDashboardData());

  const Home = Loadable({
    loader: () => import('./routes/Home/HomeContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Home {...home.dataset} />
    </Provider>,
    home
  );
}

if (measurements) {
  const now = new Date();
  const weekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDay() - 7);

  store.dispatch(getMeasurements(1, toDateString(weekAgo), toDateString(now)));

  const Measurements = Loadable({
    loader: () => import('./routes/Measurements/MeasurementsContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Measurements {...measurements.dataset} />
    </Provider>,
    measurements
  );
}

if (achievements) {
  store.dispatch(getUnlockedAchievements());

  const Achievements = Loadable({
    loader: () => import('./routes/Achievements/AchievementsContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Achievements {...achievements.dataset} />
    </Provider>,
    achievements
  );
}

if (favorites) {
  store.dispatch(getFavoriteItems('video'));
  store.dispatch(getAllTrainers());
  store.dispatch(getCourseFilters());

  const Favorites = Loadable({
    loader: () => import('./routes/Favorites/FavoritesContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Favorites {...favorites.dataset} />
    </Provider>,
    favorites
  );
}

if (training) {
  store.dispatch(getCurrentCourses());
  store.dispatch(getDaySchedule());
  store.dispatch(getVideos()());
  store.dispatch(getFullCourses());

  const Training = Loadable({
    loader: () => import('./routes/Training/TrainingContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Training {...training.dataset} />
    </Provider>,
    training
  );
}

if (register) {
  const Register = Loadable({
    loader: () => import('./routes/Register/RegisterContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Register {...register.dataset} />
    </Provider>,
    register
  );
}

if (trainingPlans) {
  const TrainingPlans = Loadable({
    loader: () => import('./routes/TrainingPlans/TrainingPlans'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <TrainingPlans {...trainingPlans.dataset} />
    </Provider>,
    trainingPlans
  );
}

if (singleTrainingPlan) {
  const paths = singleTrainingPlan.dataset.currentPath.split('/');
  const id = +paths[paths.length - 1];

  const SingleTrainingPlan = Loadable({
    loader: () => import('./routes/SingleTrainingPlan/SingleTrainingPlan'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <SingleTrainingPlan id={id} {...singleTrainingPlan.dataset} />
    </Provider>,
    singleTrainingPlan
  );
}

if (trainingPlanSearch) {
  store.dispatch(getPreferences());

  const TrainingPlanSearch = Loadable({
    loader: () =>
      import('./routes/TrainingPlanSearch/TrainingPlanSearchContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <TrainingPlanSearch {...trainingPlanSearch.dataset} />
    </Provider>,
    trainingPlanSearch
  );
}

if (weekPlan) {
  const WeekPlan = Loadable({
    loader: () => import('./routes/WeekPlan/WeekPlanContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <WeekPlan {...weekPlan.dataset} />
    </Provider>,
    weekPlan
  );
}

if (trainers) {
  const Trainers = Loadable({
    loader: () => import('./routes/Trainers/TrainersContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Trainers {...trainers.dataset} />
    </Provider>,
    trainers
  );
}

if (video) {
  const paths = video.dataset.currentPath.split('/');
  const id = +paths[paths.length - 1];

  const Video = Loadable({
    loader: () => import('./routes/Video/VideoContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Video {...video.dataset} id={id} />
    </Provider>,
    video
  );
}

if (videos) {
  const Videos = Loadable({
    loader: () => import('./routes/Videos/VideosContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Videos {...videos.dataset} />
    </Provider>,
    videos
  );
}

if (videoDownloads) {
  const VideoDownloads = Loadable({
    loader: () => import('./routes/VideoDownloads/VideoDownloads'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <VideoDownloads {...videoDownloads.dataset} />
    </Provider>,
    videoDownloads
  );
}

if (courseSearch) {
  const CourseSearch = Loadable({
    loader: () => import('./routes/CourseSearch/CourseSearch'),
    loading: LoadingComponent
  });

  render(<CourseSearch {...courseSearch.dataset} />, courseSearch);
}

if (singleCourse) {
  const SingleCourse = Loadable({
    loader: () => import('./routes/SingleCourse/SingleCourse'),
    loading: LoadingComponent
  });

  render(<SingleCourse {...singleCourse.dataset} />, singleCourse);
}
if (news) {
  store.dispatch(getHealthPosts());

  const News = Loadable({
    loader: () => import('./routes/News/NewsContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <News {...news.dataset} />
    </Provider>,
    news
  );
}

if (meals) {
  const Meals = Loadable({
    loader: () => import('./routes/Meals/Meals'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Meals {...meals.dataset} />
    </Provider>,
    meals
  );
}

if (mealsSearch) {
  const MealsSearch = Loadable({
    loader: () => import('./routes/MealsSearch/MealsSearchContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <MealsSearch {...mealsSearch.dataset} />
    </Provider>,
    mealsSearch
  );
}

if (mealCategory) {
  const paths = mealCategory.dataset.currentPath.split('/');
  const id = +paths[paths.length - 1];

  store.dispatch(getMealCategoryInfo(id));
  store.dispatch(getMealCategoryItems(id));

  const MealCategory = Loadable({
    loader: () => import('./routes/MealCategory/MealCategory'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <MealCategory id={id} {...mealCategory.dataset} />
    </Provider>,
    mealCategory
  );
}

if (mealPlan) {
  store.dispatch(getMealPlan());

  const MealPlan = Loadable({
    loader: () => import('./routes/MealPlan/MealPlanContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <MealPlan {...mealPlan.dataset} />
    </Provider>,
    mealPlan
  );
}

if (singleMeal) {
  const paths = singleMeal.dataset.currentPath.split('/');
  const id = +paths[paths.length - 1];

  store.dispatch(getMeal(id));

  const SingleMeal = Loadable({
    loader: () => import('./routes/SingleMeal/SingleMealContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <SingleMeal {...singleMeal.dataset} />
    </Provider>,
    singleMeal
  );
}

if (groceryList) {
  const GroceryList = Loadable({
    loader: () => import('./routes/GroceryList/GroceryList'),
    loading: LoadingComponent
  });

  render(<GroceryList {...groceryList.dataset} />, groceryList);
}

if (advices) {
  const Advices = Loadable({
    loader: () => import('./routes/Advices/Advices'),
    loading: LoadingComponent
  });

  render(<Advices {...advices.dataset} />, advices);
}

if (fitBook) {
  const FitBook = Loadable({
    loader: () => import('./routes/FitBook/FitBookContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <FitBook {...fitBook.dataset} />
    </Provider>,
    fitBook
  );
}

if (publicStats) {
  const PublicStats = Loadable({
    loader: () => import('./routes/PublicStatistics/PublicStatisticsContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <PublicStats {...publicStats.dataset} />
    </Provider>,
    publicStats
  );
}

if (friends) {
  const Friends = Loadable({
    loader: () => import('./routes/Friends/Friends'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Friends {...friends.dataset} />
    </Provider>,
    friends
  );
}

if (chat) {
  const Chat = Loadable({
    loader: () => import('./routes/Chat/ChatContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Chat {...chat.dataset} />
    </Provider>,
    chat
  );
}

if (apps) {
  const Apps = Loadable({
    loader: () => import('./routes/Apps/Apps'),
    loading: LoadingComponent
  });

  render(<Apps {...apps.dataset} />, apps);
}

if (books) {
  const Books = Loadable({
    loader: () => import('./routes/Books/Books'),
    loading: LoadingComponent
  });

  render(<Books {...books.dataset} />, books);
}

if (shop) {
  const Shop = Loadable({
    loader: () => import('./routes/Shop/Shop'),
    loading: LoadingComponent
  });

  render(<Shop {...shop.dataset} />, shop);
}

if (help) {
  const Help = Loadable({
    loader: () => import('./routes/Help/Help'),
    loading: LoadingComponent
  });

  render(<Help {...help.dataset} />, help);
}

if (profile) {
  const Profile = Loadable({
    loader: () => import('./routes/Profile/ProfileContainer'),
    loading: LoadingComponent
  });

  const paths = profile.dataset.currentPath.split('/');
  const userId = paths[paths.length - 1];

  if (userId === 'me') {
    store.subscribe(() => {
      const currentUserId = store.getState().user.currentUser.id;
      if (currentUserId) {
        render(
          <Provider store={store}>
            <Profile
              userId={currentUserId}
              isCurrentUserProfile
              {...profile.dataset}
            />
          </Provider>,
          profile
        );
      }
    });
  } else {
    render(
      <Provider store={store}>
        <Profile userId={userId} {...profile.dataset} />
      </Provider>,
      profile
    );
  }
}

if (settings) {
  const Settings = Loadable({
    loader: () => import('./routes/Settings/Settings'),
    loading: LoadingComponent
  });

  render(<Settings {...settings.dataset} />, settings);
}

if (goal) {
  const Goal = Loadable({
    loader: () => import('./routes/Goal/GoalContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Goal {...goal.dataset} />
    </Provider>,
    goal
  );
}

if (pricing) {
  const Pricing = Loadable({
    loader: () => import('./routes/Pricing/Pricing'),
    loading: LoadingComponent
  });

  render(<Pricing {...pricing.dataset} />, pricing);
}

if (upgrade) {
  const Pricing = Loadable({
    loader: () => import('./routes/Upgrade/UpgradeContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Pricing {...upgrade.dataset} />
    </Provider>,
    upgrade
  );
}

if (searchResults) {
  const SearchResults = Loadable({
    loader: () => import('./routes/SearchResults/SearchResults'),
    loading: LoadingComponent
  });

  render(<SearchResults {...searchResults.dataset} />, searchResults);
}

if (contact) {
  const Contact = Loadable({
    loader: () => import('./routes/Contact/Contact'),
    loading: LoadingComponent
  });

  render(<Contact {...contact.dataset} />, contact);
}

if (conditions) {
  const Conditions = Loadable({
    loader: () => import('./routes/Conditions/Conditions'),
    loading: LoadingComponent
  });

  render(<Conditions {...conditions.dataset} />, conditions);
}

if (imprint) {
  const Imprint = Loadable({
    loader: () => import('./routes/Imprint/Imprint'),
    loading: LoadingComponent
  });

  render(<Imprint {...imprint.dataset} />, imprint);
}

if (companies) {
  const Companies = Loadable({
    loader: () => import('./routes/Companies/Companies'),
    loading: LoadingComponent
  });

  render(<Companies {...companies.dataset} />, companies);
}

if (partner) {
  const Partner = Loadable({
    // loader: () => import('./routes/Partner/Partner'),
    loader: () => import('./routes/SinglePost/SinglePostContainer'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <Partner {...partner.dataset} />
    </Provider>,
    partner
  );
}

if (landing) {
  const Landing = Loadable({
    loader: () => import('./routes/Landing/Landing'),
    loading: LoadingComponent
  });

  render(<Landing {...landing.dataset} />, landing);
}

const findElements = className => document.getElementsByClassName(className);

const videoElements = findElements('video-card');
const courseElements = findElements('course-card');
const postElements = findElements('post-card');
const primaryButtons = findElements('primary-btn');
const secondaryButtons = findElements('secondary-btn');
const blueButtons = findElements('blue-btn');
const whiteButtons = findElements('white-btn');
const textWhiteButtons = findElements('text-white-btn');
const textBlueButtons = findElements('text-blue-btn');
const textLightGreyButtons = findElements('text-light-grey-btn');
const textDarkGreyButtons = findElements('text-dark-grey-btn');
const textPinkButtons = findElements('text-pink-btn');
const inputs = findElements('input');
const checkboxes = findElements('checkbox');
const radios = findElements('radio');
const tables = findElements('table');

if (videoElements.length) {
  for (const videoElement of videoElements) {
    // eslint-disable-line no-restricted-syntax
    const Video = Loadable({
      loader: () => import('./common/components/GridItems/Video/VideoGridItem'),
      loading: LoadingComponent
    });

    render(
      <Video
        baseDomain={videoElement.dataset.baseDomain}
        {...JSON.parse(videoElement.dataset.video)}
      />,
      videoElement
    );
  }
}

if (courseElements.length) {
  for (const courseElement of courseElements) {
    // eslint-disable-line no-restricted-syntax
    const Course = Loadable({
      loader: () =>
        import('./common/components/GridItems/Course/CourseGridItem'),
      loading: LoadingComponent
    });

    render(
      <Course
        baseDomain={courseElement.dataset.baseDomain}
        {...JSON.parse(courseElement.dataset.course)}
      />,
      courseElement
    );
  }
}

if (postElements.length) {
  for (const postElement of postElements) {
    // eslint-disable-line no-restricted-syntax
    const Post = Loadable({
      loader: () => import('./common/components/GridItems/Post/PostGridItem'),
      loading: LoadingComponent
    });

    render(
      <Post
        baseDomain={postElement.dataset.baseDomain}
        {...JSON.parse(postElement.dataset.post)}
      />,
      postElement
    );
  }
}

if (primaryButtons.length) {
  for (const primaryButton of primaryButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <PrimaryButton href={primaryButton.dataset.href}>
        {primaryButton.dataset.label}
      </PrimaryButton>,
      primaryButton
    );
  }
}

if (secondaryButtons.length) {
  for (const secondaryButton of secondaryButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <SecondaryButton href={secondaryButton.dataset.href}>
        {secondaryButton.dataset.label}
      </SecondaryButton>,
      secondaryButton
    );
  }
}

if (blueButtons.length) {
  for (const blueButton of blueButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <BlueButton href={blueButton.dataset.href}>
        {blueButton.dataset.label}
      </BlueButton>,
      blueButton
    );
  }
}

if (whiteButtons.length) {
  for (const whiteButton of whiteButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <WhiteButton href={whiteButton.dataset.href}>
        {whiteButton.dataset.label}
      </WhiteButton>,
      whiteButton
    );
  }
}

if (textWhiteButtons.length) {
  for (const textWhiteButton of textWhiteButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <TextWhiteButton href={textWhiteButton.dataset.href}>
        {textWhiteButton.dataset.label}
      </TextWhiteButton>,
      textWhiteButton
    );
  }
}

if (textBlueButtons.length) {
  for (const textBlueButton of textBlueButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <TextBlueButton href={textBlueButton.dataset.href}>
        {textBlueButton.dataset.label}
      </TextBlueButton>,
      textBlueButton
    );
  }
}

if (textLightGreyButtons.length) {
  for (const textLightGreyButton of textLightGreyButtons) {
    // eslint-disable-line
    render(
      <TextLightGreyButton href={textLightGreyButton.dataset.href}>
        {textLightGreyButton.dataset.label}
      </TextLightGreyButton>,
      textLightGreyButton
    );
  }
}

if (textDarkGreyButtons.length) {
  for (const textDarkGreyButton of textDarkGreyButtons) {
    // eslint-disable-line
    render(
      <TextDarkGreyButton href={textDarkGreyButton.dataset.href}>
        {textDarkGreyButton.dataset.label}
      </TextDarkGreyButton>,
      textDarkGreyButton
    );
  }
}

if (textPinkButtons.length) {
  for (const textPinkButton of textPinkButtons) {
    // eslint-disable-line no-restricted-syntax
    render(
      <TextPinkButton href={textPinkButton.dataset.href}>
        {textPinkButton.dataset.label}
      </TextPinkButton>,
      textPinkButton
    );
  }
}

if (inputs.length) {
  for (const input of inputs) {
    // eslint-disable-line no-restricted-syntax
    render(
      <TextField
        fullWidth
        multiline={!!input.dataset.multiline}
        label={input.dataset.label}
        variant={input.dataset.variant}
        rows={input.dataset.rows}
      />,
      input
    );
  }
}

if (checkboxes.length) {
  for (const checkbox of checkboxes) {
    // eslint-disable-line no-restricted-syntax
    render(
      <FormControlLabel
        label={checkbox.dataset.label}
        control={<StyledCheckbox />}
      />,
      checkbox
    );
  }
}

if (radios.length) {
  for (const radio of radios) {
    // eslint-disable-line no-restricted-syntax
    render(
      <FormControlLabel
        label={radio.dataset.label}
        control={<StyledRadio />}
      />,
      radio
    );
  }
}

if (tables.length) {
  /* eslint-disable */
  for (const table of tables) {
    const { keys, labels, rows } = JSON.parse(table.dataset.table);
    render(
      <Table>
        <StyledTableHead>
          <TableRow>
            {keys.map(key => (
              <StyledTableHeadDateCell key={Math.random()}>
                {labels[key]}
              </StyledTableHeadDateCell>
            ))}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={Math.random()}>
              {keys.map(key => (
                <StyledTableCell key={Math.random()}>
                  {row[key]}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>,
      table
    );
  }
}

if (footer) {
  const zendesk = document.createElement('div');

  zendesk.setAttribute('id', 'zendesk');
  footer.insertAdjacentElement('afterend', zendesk);

  const ZenDesk = Loadable({
    loader: () => import('./common/components/ZenDesk/ZenDesk'),
    loading: LoadingComponent
  });

  render(
    <Provider store={store}>
      <ZenDesk />
    </Provider>,
    zendesk
  );
}
