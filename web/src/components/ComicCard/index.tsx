import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'umi';

interface ItemInterface {
  id: string;
  name: string;
  cover: string;
  introduce: string;
}

interface Props {
  data: Array<ItemInterface>;
}

export default class index extends PureComponent<Props> {
  render() {
    const { data = [] } = this.props;
    console.log(data)
    return (
      <Row gutter={32}>
        {
          data.map(item => {
            return <Col span={12} key={item.id}
              style={{
                display: "inline-block",
                width: "44%",
                marginLeft: "4%",
                marginTop: "0.75rem",
                verticalAlign: "top",
                overflow: "hidden",
                backgroundColor: "rgba(244, 244, 244, 0.5)",
                borderRadius: "0 0 0.3rem 0.3rem",
                paddingLeft: 0,
                paddingRight: 0,
              }}
            >
              <Link to={`/detail/${item.id}`}>
                <div
                  className="comic-cover"
                  style={{
                    display: "block",
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    marginBottom: "0.5rem",
                    borderRadius: "0.3rem 0.3rem 0 0",
                  }}
                >
                  <img
                    className="cover-image"
                    src={item.cover}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      borderRadius: "0.3rem 0.3rem 0 0",
                    }}
                  />
                </div>
                <div className="comic-content" style={{ padding: "0 0.6rem" }}>
                  <strong className="comic-title"
                    style={{
                      display: "block",
                      marginBottom: "0.2rem",
                      fontSize: "0.75rem",
                      color: "#333",
                      minHeight: "1.05rem",
                      paddingTop: "1px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >{item.name}</strong>
                  <small
                    className="comic-desc"
                    style={{
                      display: "block",
                      marginBottom: "0.7rem",
                      fontSize: "0.6rem",
                      color: "#0c1220",
                      minHeight: "0.8rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.introduce}
                  </small>
                </div>
              </Link>
            </Col>
          })
        }
      </Row >
    )
  }
}
