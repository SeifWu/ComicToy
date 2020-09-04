import React, { PureComponent } from 'react'
import request from 'umi-request';
import ComicChapterList from '../components/ComicChapterList';

interface ComicChapter {
  num: string;
  ID: string;
}

interface Data {
  id?: string;
  name?: string;
  introduce?: string;
  author?: string;
  cover?: string;
  ComicChapter?: Array<ComicChapter>
}

interface State {
  data: Data;
  loading: boolean;
}

interface Props {
  id: any;
  location: any;
}

class index extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      data: {},
      loading: false
    }
  }

  componentDidMount() {
    const { location: { query: { id } } } = this.props;
    // console.log(this.props)
    this.setState({
      loading: true,
    });
    const that = this
    request
      .get(`/api/v1/public/comic/${id}`)
      .then(function (response) {
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
    const { data } = this.state;
    return (
      <div>
        <div className="lay-head"
          style={{
            margin: 0,
            padding: 0,
            border: 0,
            outline: 0,
            fontSize: "100%",
            verticalAlign: "baseline",
            background: "transparent",
          }}>
          <section className="mod-head" style={{
            height: "13.45rem",
            width: "100%",
            position: "relative",
            display: "block",

          }}>
            <div className="head-banner"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}>
              <img style={{ width: "100%", height: "100%", objectFit: "cover", }} src={data.cover} className="head-cover" alt="" />
            </div>
          </section>
        </div>
        <div className="lay-content" style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 4,
        }}
        >
          <section className="head-info"
            style={{
              margin: "8.2rem 0.9rem 0",
              backgroundColor: "#fff",
              border: "1px solid #fff",
              borderRadius: "0 0 0.3rem 0.3rem",
              boxShadow: "0 5px 30px 0px #cccccc",
              paddingBottom: " 0.7rem",
            }}
          >
            <div className="head-info-detail"
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "1rem",
                paddingBottom: "0.75rem",
              }}
            >
              <div className="head-title-tags" style={{ paddingLeft: "0.975rem", flex: 1, }}>
                <h1 style={{
                  fontSize: "1.2rem",
                  color: "#25262b",
                  textShadow: "0 0 0.075rem rgba(9, 2, 4, 0.1)",
                  maxWidth: "10rem",
                  marginBottom: "0.6rem",
                  paddingTop: "0.2rem",
                }}>
                  {data.name}
                </h1>
              </div>
            </div>
            <div className="head-info-desc" style={{
              color: "#666666",
              fontSize: "0.6rem",
              lineHeight: "0.9rem",
              marginBottom: "0.5rem",
              padding: "0 1.2rem",
            }}>
              {data.introduce}
            </div>
            <div className="head-info-author" style={{ padding: "0 1.2rem" }}>
              作者: {data.author}
            </div>
          </section>

          <ComicChapterList data={data.ComicChapter} />
        </div>

      </div >
    )
  }
}

export default index
