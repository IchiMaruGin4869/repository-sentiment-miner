import Promise from 'bluebird';
import _ from 'lodash';
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import CommitMiner from '../../services/CommitMiner.js';
import AbstractComponent from './AbstractComponent.jsx';

import Util from './Util.js';
const { getPieChartData } = Util;

class OnceContributors extends AbstractComponent {
  constructor(props) {
    super(props);
    this.state = {
      onceContributors: {}
    };
  }
  loadData() {
    return this.service
      .getOnceContributors(this.props.project)
      .then(({ data }) => {
        this.setState({
          onceContributors: data
        });
      });
  }
  renderAfterLoad() {
    return (
      <div
        style={{
          'border-left': '1px solid gray',
          'border-top': '1px solid gray',
          width: '49%',
          float: 'left'
        }}
      >
        <h2> Contributors </h2>
        <Pie
          data={getPieChartData(
            [
              this.state.onceContributors.once,
              this.state.onceContributors.moreThanOnce
            ],
            ['Once', 'More than once'],
            ['gray', 'green']
          )}
          nredraw={true}
        />
      </div>
    );
  }
}

export default OnceContributors;
