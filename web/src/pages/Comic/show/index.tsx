import React, { PureComponent } from 'react'
import request from 'umi-request';


interface Props {
  id: any;
  match: any;
}

class index extends PureComponent<Props> {
  componentDidMount() {
    console.log(this.props)
    const { match: { params: { id } } } = this.props;
    this.setState({
      loading: true,
    });
    console.log(id)
    const that = this
    request
      .get(`/api/v1/public/comic/${id}`)
      .then(function (response) {
        console.log(response.data);
        that.setState({
          loading: false,
          data: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        ???
      </div>
    )
  }
}

export default index
