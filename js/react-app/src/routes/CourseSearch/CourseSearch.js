import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import {
  fetchCourses,
  fetchTools,
  fetchGoals
} from '../../common/services/training';
import styles from './CourseSearch.scss';
import Loader from '../../common/components/Loaders/Layout/LayoutLoader';
import CourseGridItem from '../../common/components/GridItems/Course/CourseGridItem';
import {
  TextBlueButton,
  TextDarkGreyButton,
  TextPinkButton,
  StyledRadio,
  StyledCheckbox
} from '../../common/customizedMaterialComponents';
import { camalizeKeys } from '../../common/helpers';

export default class CourseSearch extends Component {
  state = {
    loading: true,
    loadingMore: false,
    items: [],
    count: null,
    countPerPage: null,
    currentPage: null,
    canPaginate: false,
    fetchingFailed: false,
    tools: [],
    goals: [],
    name: '',
    selectedTools: [],
    selectedAge: '',
    selectedGoal: '',
    selectedOrder: ''
  };

  componentDidMount() {
    fetchCourses()
      .then(({ data }) => camalizeKeys(data))
      .then(({ data, total, perPage, nextPageUrl, currentPage }) =>
        this.setState({
          items: data,
          count: +total,
          countPerPage: +perPage,
          currentPage: +currentPage,
          canPaginate: !!nextPageUrl
        })
      )
      .then(fetchTools)
      .then(({ data: { tools } }) => this.setState({ tools, loading: false }))
      .then(fetchGoals)
      .then(({ data: { goals } }) => this.setState({ goals, loading: false }))
      .catch(error => {
        this.setState({ fetchingFailed: true, loading: false });
        console.error(error);
      });
  }

  set = name => ({ target: { value } }) => this.setState({ [name]: value });

  handleToolSelection = tool => {
    this.setState(({ selectedTools }) => ({
      selectedTools: selectedTools.includes(tool)
        ? selectedTools.filter(el => el !== tool)
        : selectedTools.concat(tool)
    }));
  };

  clearFilters = () => {
    this.setState({
      name: '',
      selectedTools: [],
      selectedAge: '',
      selectedGoal: '',
      selectedOrder: ''
    });
  };

  applyFilters = () => {
    this.setState({ loading: true });
    const {
      state: { name, selectedTools, selectedAge, selectedGoal, selectedOrder }
    } = this;
    fetchCourses(
      1,
      name,
      selectedTools,
      selectedAge,
      selectedGoal,
      selectedOrder
    )
      .then(({ data }) => camalizeKeys(data))
      .then(({ data, total, perPage, nextPageUrl }) =>
        this.setState({
          items: data,
          count: +total,
          currentPage: 1,
          countPerPage: +perPage,
          canPaginate: !!nextPageUrl,
          loading: false
        })
      )
      .catch(error => {
        this.setState({ fetchingFailed: true, loading: false });
        console.error(error);
      });
  };

  loadMoreItems = () => {
    this.setState({ loadingMore: true });
    const {
      state: {
        currentPage,
        name,
        selectedTools,
        selectedAge,
        selectedGoal,
        selectedOrder
      }
    } = this;
    fetchCourses(
      currentPage + 1,
      name,
      selectedTools,
      selectedAge,
      selectedGoal,
      selectedOrder
    )
      .then(({ data }) => camalizeKeys(data))
      .then(({ data, total, perPage, nextPageUrl }) =>
        this.setState(({ items: prevItems, currentPage: prevPage }) => ({
          items: prevItems.concat(data),
          count: +total,
          countPerPage: +perPage,
          canPaginate: !!nextPageUrl,
          currentPage: prevPage + 1,
          loadingMore: false,
          fetchingFailed: false
        }))
      )
      .catch(error => {
        this.setState({ fetchingFailed: true, loadingMore: false });
        console.error(error);
      });
  };

  render() {
    const {
      state: {
        loading,
        loadingMore,
        items,
        count,
        countPerPage,
        currentPage,
        canPaginate,
        fetchingFailed,
        tools,
        goals,
        selectedTools,
        selectedAge,
        selectedGoal,
        selectedOrder
      },
      props: { baseDomain }
    } = this;

    if (loading) return <Loader />;

    if (fetchingFailed) {
      return (
        <p className="placeholder">
          Entschuldigung, etwas ist schief gelaufen. Bitte versuchen Sie es
          später erneut.
        </p>
      );
    }

    return (
      <div className={styles.pageWrapper}>
        <div className={styles.leftContent}>
          {!count && <p className="placeholder">Keine Kurse</p>}
          {!!count && (
            <>
              <div className="gridWrapper">
                {items.map(
                  ({
                    slug,
                    descriptions: { short: description },
                    kcal,
                    name: courseName,
                    banners: { default: thumbnailUrl },
                    videos
                  }) => (
                    <div className="gridItem" key={slug}>
                      <CourseGridItem
                        baseDomain={baseDomain}
                        slug={slug}
                        description={description}
                        kcal={kcal}
                        name={courseName}
                        thumbnailUrl={thumbnailUrl}
                        videosCount={videos}
                      />
                    </div>
                  )
                )}
              </div>
              {loadingMore && (
                <div className="loaderWrapper">
                  <Loader />
                </div>
              )}
              <div className="paginationWrapper">
                <div>
                  <p className="paginationCount">
                    Zeigt&nbsp;
                    {Math.min(count, countPerPage * currentPage)}
                    &nbsp;Kurse von&nbsp;
                    {count}
                  </p>
                  <TextBlueButton
                    variant="outlined"
                    onClick={this.loadMoreItems}
                    disabled={!canPaginate || loadingMore}
                  >
                    Laden Sie mehr Daten
                  </TextBlueButton>
                </div>
              </div>
            </>
          )}
        </div>
        <div className={styles.rightContent}>
          <div className={styles.filtersInnerWrapper}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Werkzeuge</FormLabel>
              {tools.map(tool => (
                <FormControlLabel
                  key={tool}
                  value={tool}
                  label={tool}
                  control={<StyledCheckbox />}
                  onChange={() => this.handleToolSelection(tool)}
                  checked={selectedTools.includes(tool)}
                />
              ))}
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Alter</FormLabel>
              <RadioGroup
                value={selectedAge}
                onChange={this.set('selectedAge')}
              >
                <FormControlLabel
                  value="20"
                  label="20-29"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="30"
                  label="30-39"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="40"
                  label="40-49"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="50"
                  label="50-59"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="60"
                  label="60+"
                  control={<StyledRadio />}
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Ziel</FormLabel>
              <RadioGroup
                value={String(selectedGoal)}
                onChange={this.set('selectedGoal')}
              >
                {goals.map(({ id, name: goalName }) => (
                  <FormControlLabel
                    key={id}
                    value={String(id)}
                    label={goalName}
                    control={<StyledRadio />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Auftrag</FormLabel>
              <RadioGroup
                value={selectedOrder}
                onChange={this.set('selectedOrder')}
              >
                <FormControlLabel
                  value="nameASC"
                  label="Kursname, A - Z"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="nameDESC"
                  label="Kursname, Z - A"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="videosASC"
                  label="Anzahl der Videos, aufsteigend"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="videosDESC"
                  label="Anzahl der Videos, absteigend"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="kcalASC"
                  label="Gebrannte kcal pro Minute, aufsteigend"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="kcalDESC"
                  label="Verbrannte kcal pro Minute, absteigend"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="likesDESC"
                  label="Anzahl der Likes, absteigend"
                  control={<StyledRadio />}
                />
                <FormControlLabel
                  value="commentsDESC"
                  label="Anzahl der Kommentare, absteigend"
                  control={<StyledRadio />}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.filterButtonsWrapper}>
            <TextDarkGreyButton onClick={this.clearFilters} disabled={loading}>
              ABSCHAFFEN
            </TextDarkGreyButton>
            <TextPinkButton onClick={this.applyFilters} disabled={loading}>
              FILTERN
            </TextPinkButton>
          </div>
        </div>
      </div>
    );
  }
}

CourseSearch.propTypes = {
  baseDomain: PropTypes.string.isRequired
};
