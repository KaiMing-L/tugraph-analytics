/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState } from "react";
import { Modal, Form, Input, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { createVersion } from "../services/version";
import $i18n from "@/components/i18n";

interface CreateClusterProps {
  visible: boolean;
  reload: () => void;
  close: () => void;
}

const CreateVersion: React.FC<CreateClusterProps> = ({
  visible,
  close,
  reload,
}) => {
  const [form] = Form.useForm();
  const [state, setState] = useState({
    loading: false,
    fileList: [],
  });
  const handleCreateVersion = async () => {
    const values = await form.validateFields();
    setState({
      ...state,
      loading: true,
    });
    const { name, engineJarFile, comment } = values;

    const formData = new FormData();
    formData.append("name", name);

    comment && formData.append("comment", comment);

    engineJarFile &&
      engineJarFile.forEach((item) => {
        formData.append("engineJarFile", item.originFileObj);
      });

    const params = {
      // name,
      engineJarFile: formData,
    };

    const resp = await createVersion(formData);

    setState({
      ...state,
      loading: false,
    });
    if (resp?.success) {
      message.success(
        $i18n.get({
          id: "openpiece-geaflow.geaflow.version-manage.create.VersionCreated",
          dm: "创建版本成功",
        })
      );
      reload();
    } else {
      message.error(
        $i18n.get(
          {
            id: "openpiece-geaflow.geaflow.services.use-manage.FailedToAddResponsemessage",
            dm: "新增失败: {responseMessage}",
          },
          { responseMessage: resp?.message }
        )
      );
    }
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    setState({ ...state, fileList: e?.fileList });
    return e?.fileList.slice(-1);
  };

  const props = {
    beforeUpload: (file) => {
      return false;
    },
  };

  return (
    <Modal
      title={$i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.create.CreateVersion",
        dm: "创建版本",
      })}
      width={700}
      visible={visible}
      onOk={handleCreateVersion}
      confirmLoading={state.loading}
      onCancel={() => {
        close();
        form.resetFields();
      }}
      okText={$i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.create.Confirm",
        dm: "确认",
      })}
      cancelText={$i18n.get({
        id: "openpiece-geaflow.geaflow.version-manage.create.Cancel",
        dm: "取消",
      })}
    >
      <Form form={form}>
        <Form.Item
          label={$i18n.get({
            id: "openpiece-geaflow.geaflow.version-manage.create.Name",
            dm: "名称",
          })}
          name="name"
          rules={[
            {
              required: true,
              message: $i18n.get({
                id: "openpiece-geaflow.geaflow.version-manage.create.EnterAVersionName",
                dm: "请输入版本名称",
              }),
            },
          ]}
          initialValue=""
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={$i18n.get({
            id: "openpiece-geaflow.geaflow.version-manage.create.VersionDescription",
            dm: "版本描述",
          })}
          name="comment"
        >
          <Input.TextArea rows={1} />
        </Form.Item>
        <Form.Item
          label={$i18n.get({
            id: "openpiece-geaflow.geaflow.version-manage.create.JarFile",
            dm: "Jar文件",
          })}
        >
          <Form.Item
            name="engineJarFile"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files" {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                {$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.create.DragOrClickSelectFile",
                  dm: "拖拽或点击选择文件",
                })}
              </p>
              <p className="ant-upload-hint">
                {$i18n.get({
                  id: "openpiece-geaflow.geaflow.version-manage.create.OnlyJarFilesAreSupported",
                  dm: "只支持 jar 文件。",
                })}
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateVersion;
