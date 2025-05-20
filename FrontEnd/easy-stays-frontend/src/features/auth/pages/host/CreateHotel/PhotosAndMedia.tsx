import React, { useState } from "react";
import type { ChangeEvent } from "react";

import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Form, Button } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Step3Props {
  onPrev: () => void;
  onNext: () => void;
  onChange: (data: { [key: string]: any }) => void;
  formData: { [key: string]: any };
}
interface FormDataState {
  images: { name: string; url: string }[];
  phoneNumber: string;
  message: string;
}

const PhotosAndMedia: React.FC<Step3Props> = ({
  onPrev,
  onNext,
  onChange,
  formData,
}) => {
  const [localData, setLocalData] = useState<FormDataState>({
    images: formData.images || [],
    phoneNumber: formData.phoneNumber || "",
    message: formData.message || "",
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(
    formData.images?.map(
      (img: { name: string; url: string }, index: number) => ({
        uid: String(index),
        name: img.name,
        url: img.url,
      })
    ) || []
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalData({ ...localData, [name]: value });
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const combinedHandleChangeUpload = async (info: {
    fileList: UploadFile[];
  }) => {
    const newFileList = await Promise.all(
      info.fileList.map(async (file) => {
        if (!file.url && !file.preview && file.originFileObj) {
          file.preview = await getBase64(file.originFileObj as FileType);
        }
        return {
          name: file.name,
          url: file.url || (file.preview as string) || "",
        };
      })
    );

    setFileList(info.fileList);
    const updatedData = { ...localData, images: newFileList };
    setLocalData(updatedData);
  };

  const handleNext = () => {
    onChange(localData);
    onNext();
  };

  const handlePrev = () => {
    onChange(localData);
    onPrev();
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Photos and Media</h1>
      <Form>
        <Form.Item>
          <Upload.Dragger
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={combinedHandleChangeUpload}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload.Dragger>
          {previewImage && (
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
              wrapperStyle={{ display: "none" }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handlePrev}
            style={{ marginRight: "1rem" }}
          >
            Previous Step
          </Button>
          <Button type="primary" onClick={handleNext}>
            Next Step
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PhotosAndMedia;
