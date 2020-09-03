import React, { Component } from 'react';
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
    const { match: { params: { id } }, location: { query: { next, prev } } } = this.props;
    console.log(this.props)
    console.log(next, prev)

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
    let prev = undefined
    let next = undefined
    const currentIndex = (comicData.ComicChapter || []).findIndex((item: any) => data.ID == item.ID)
    if ((comicData.ComicChapter || []).length > 0 && currentIndex > -1) {
      prev = currentIndex - 1 < 0 ? undefined : comicData.ComicChapter[currentIndex - 1].ID;
      next = currentIndex + 1 > comicData.ComicChapter.length - 1 ? undefined : comicData.ComicChapter[currentIndex + 1].ID
    }
    console.log(currentIndex)
    console.log(prev)
    console.log(next)
    console.log(data)
    console.log(comicData)
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
        <div>

          <Link
            to={{
              pathname: `/detail/${comicData.id}/${prev}`
            }}
            style={{
              margin: "12px auto",
              display: "block",
              width: "75%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: 4,
              border: "1px dashed #d9d9d9",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            上一话
          </Link>

          <Link
            to={{
              pathname: `/detail/${comicData.id}/${next}`
            }}
            style={{
              margin: "12px auto",
              display: "block",
              width: "75%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              padding: 4,
              border: "1px dashed #d9d9d9",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            下一话
          </Link>
        </div>
      </div>
    );
  }
}
