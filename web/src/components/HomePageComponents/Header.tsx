import React from 'react';
import { Input } from 'antd';
import styles from './Header.css';
export interface IAppProps {
  onSearch: Function;
  searching: boolean;
}

const { Search } = Input;

export default class Header extends React.Component<IAppProps> {
  public render() {
    return (
      <header className={styles["top-bar"]}>
        {/* <h1 className={styles["top-title"]}>Seif Comic</h1> */}
        <div className={styles["padding"]}></div>
        <Search
          size="large"
          placeholder="输入名称搜索"
          onSearch={value => this.props.onSearch(value)}
          enterButton
          loading={this.props.searching}
        />
      </header>
    );
  }
}
