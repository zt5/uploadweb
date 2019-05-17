import {Button, Icon, Upload, message} from 'antd';
import React, {Component} from "react";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    }
  }

  handleUpload = () => {
    const {fileList} = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files', file);
    });

    this.setState({
      uploading: true,
    });

    let request = new Request(`${window.location.origin}/upload`, {
      method: 'POST',
      body: formData,
    });
    fetch(request).then(response => {
      this.setState({
        uploading: false,
      });
      if (response.ok && response.status === 200) {
        this.setState({
          fileList: [],
        });
        message.success('上传成功');
      } else {
        message.error('网络状态错误[' + response.status + "]");
      }
    }).catch(err => {
      message.error('上传失败' + err);
      this.setState({
        uploading: false,
      });
    });
  };
  onRemove = (file) => {
    this.setState((state) => {
      const index = state.fileList.indexOf(file);
      const newFileList = state.fileList.slice();
      newFileList.splice(index, 1);
      return {
        fileList: newFileList,
      };
    });
  };
  beforeUpload = (file) => {
    if (this.state.fileList.find(oneFile => oneFile.name === file.name)) {
      message.warn(`重复文件${file.name}跳过`);
      return false;
    }
    this.setState(state => ({
      fileList: [...state.fileList, file],
    }));
    return false;
  };

  render() {
    const {fileList, uploading} = this.state;
    return (
      <div style={{padding: 40, flexDirection: "row", display: "flex"}}>
        <Upload fileList={fileList} onRemove={this.onRemove} beforeUpload={this.beforeUpload} multiple={true}>
          <Button>
            <Icon type="upload"/>选择文件
          </Button>
        </Upload>
        <Button
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? '上传中' : '上传'}
        </Button>
      </div>
    );
  }
}
