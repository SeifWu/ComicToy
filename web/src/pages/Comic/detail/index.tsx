import React, { Component } from 'react';
import { Button, Row, Col } from 'antd';
import request from 'umi-request';
import { Link } from 'umi';

interface Props {
  match: any;
  location: any;
}
interface ComicChapterDetail {
  ID?: string;
  img: string;
}

interface Data {
  ID?: string;
  num?: string;
  ComicChapterDetail?: Array<ComicChapterDetail>
}

interface State {
  data: Data;
  comicData: any;
  loading: boolean;
}

export default class index extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: {},
      comicData: {},
      loading: false
    }
  }

  componentDidMount() {
    const { location: { query: { id } } } = this.props;
    this.loadData(id)
  }

  loadData = (id: any) => {
    this.setState({
      loading: true,
    });
    const that = this

    request
      .get(`/api/v1/public/comic_chapter/${id}`)
      .then(function (response) {
        that.setState({
          loading: false,
          data: response.data
        });

        request
          .get(`/api/v1/public/comic/${response.data.ComicID}`)
          .then(function (response) {
            that.setState({
              comicData: response.data
            });
          })
          .catch(function (error) {
            console.log(error);
          });

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { data, comicData } = this.state;
    let prev = 0
    let next = 0
    const currentIndex = (comicData.ComicChapter || []).findIndex((item: any) => data.ID == item.ID)
    if ((comicData.ComicChapter || []).length > 0 && currentIndex > -1) {
      prev = currentIndex - 1 < 0 ? undefined : comicData.ComicChapter[currentIndex - 1].ID;
      next = currentIndex + 1 > comicData.ComicChapter.length - 1 ? undefined : comicData.ComicChapter[currentIndex + 1].ID
    }
    return (
      <div>
        <div style={{ height: "100vh" }}>
          <h1 style={{ textAlign: "center", lineHeight: "100vh" }} >{data.num}</h1>
        </div>
        <div>
          {
            (data.ComicChapterDetail || []).map(item => {
              return <div key={item.ID}>
                <img style={{ width: "100%" }} src={item.img} />
              </div>
            })
          }
        </div>
        <div style={{ margin: "32px 0", padding: 12 }}>
          <Row gutter={12}>
            {
              !prev ? null :
                <Col span={12}>
                  <Button onClick={() => this.loadData(prev)} type="dashed" block>上一话 </Button>
                </Col>
            }
            {
              !next ? null :
                <Col span={12}>
                  <Button onClick={() => this.loadData(next)} type="dashed" block>下一话 </Button>
                </Col>
            }
          </Row>
        </div>


      </div>
    );
  }
}
