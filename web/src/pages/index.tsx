
import React from 'react';
import styles from './index.css';
import background from '@/assets/yay.jpg';
import ComicCard from '@/components/ComicCard';
import request from 'umi-request';


export interface IAppProps {
}

export default class App extends React.Component<IAppProps> {
  state = {
    loading: false,
    data: [],
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    const that = this
    request
      .get('/api/v1/public/comic')
      .then(function (response) {
        that.setState({
          loading: false,
          data: response.data
        });
      })
      .catch(function (error) {
      });
  }

  render() {
    const { loading, data } = this.state;
    return (
      <>
        <div style={{ padding: 12 }}>
          <ComicCard data={data} />
        </div>
      </>
    );
  }
}

