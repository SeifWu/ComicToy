import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Link } from 'umi';

interface Props {
  data: any;
}
interface State {

}

export default class index extends Component<Props, State> {
  state = {}

  render() {
    const { data = [] } = this.props;
    // console.log(data)
    return (
      <div style={{ padding: 16 }}>
        <Row gutter={[8, 8]}>
          {
            data.map((item: any, index: any) => {
              const prev = index - 1 < 0 ? undefined : data[index - 1].ID;
              const next = index + 1 > data.length - 1 ? undefined : data[index + 1].ID
              return <Col key={item.ID} span={8}>
                <Link
                  to={{
                    pathname: "/detail/content",
                    search: `?id=${item.ID}`
                  }}
                  style={{
                    display: "block",
                    width: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: 4,
                    border: "1px dashed #d9d9d9",
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                >
                  {item.num}
                </Link>
              </Col>
            })
          }

        </Row>

      </div>
    )
  }
}
