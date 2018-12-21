import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Pagination, Skeleton } from 'antd';
class Home extends Component {
  state = {
    topics: []
  };
  componentDidMount() {
    axios.get('https://cnodejs.org/api/v1/topics?tab=all').then(res => {
      this.setState({
        topics: res.data.data
      });
      console.log(res.data);
    });
  }
  render() {
    const navArr = [
      {
        type: 'all',
        txt: '全部'
      },
      {
        type: 'good',
        txt: '精华'
      },
      {
        type: 'share',
        txt: '分享'
      },
      {
        type: 'ask',
        txt: '问答'
      },
      {
        type: 'job',
        txt: '招聘'
      }
    ];
    const { topics } = this.state;
    const nav = navArr.map(e => (
      <li key={e.type} onClick={this.navList}>
        {e.txt}
      </li>
    ));
    const list =
      topics.length === 0 ? (
        <div>
          <Skeleton active title={false} paragraph={{ rows: 5 }} />
        </div>
      ) : (
        <ul>
          {topics.map(e => (
            <li key={e.id}>{e.title}</li>
          ))}
        </ul>
      );
    return (
      <Wrap>
        <div>
          <Nav>{nav}</Nav>
        </div>
        <List>{list}</List>
        <Pagination
          onChange={this.onChange}
          defaultCurrent={1}
          pageSize={40}
          total={3330}
        />
      </Wrap>
    );
  }
  onChange = page => {
    axios
      .get(`https://cnodejs.org/api/v1/topics?tab=all&page=${page}`)
      .then(res => {
        this.setState({
          topics: res.data.data
        });
      });
  };
  navList = tab => {
    axios.get(`https://cnodejs.org/api/v1/topics?tab=${tab}`).then(res => {
      console.log(213);
      this.setState({
        topics: res.data.data
      });
      console.log(res.data.data);
    });
  };
}

export default Home;
const Wrap = styled.div`
  width: 660px;
  border-radius: 8px;
  background-color: #fff;
  li {
    cursor: pointer;
    line-height: 30px;
  }
`;
const Nav = styled.nav`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  height: 40px;
  background-color: #f6f6f6;
  align-items: center;
  padding-left: 10px;
  li {
    margin-right: 20px;
  }
  li:hover {
    color: #08c;
  }
`;
const List = styled.div`
  li {
    cursor: pointer;
    line-height: 32px;
  }
  li:hover {
    text-decoration: underline;
  }
`;
