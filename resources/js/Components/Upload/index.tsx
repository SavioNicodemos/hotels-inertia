import { ReactNode } from "react";

import { useDropzone } from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

type UploadProps = {
  onUpload: (file: File) => void;
  disabled?: boolean;
};

function Upload({ onUpload, disabled = false }: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: {
        "text/csv": [".csv"],
      },
      onDropAccepted: (files) => onUpload(files[0]),
      disabled,
      maxFiles: 1,
      multiple: false,
    });

  const renderDragMessage = (
    isDragActive: boolean,
    isDragRejected: boolean
  ): ReactNode => {
    if (!isDragActive) {
      return <UploadMessage>Select or drag the file here.</UploadMessage>;
    }

    if (isDragRejected) {
      return <UploadMessage $type="error">File not supported</UploadMessage>;
    }

    return <UploadMessage $type="success">Drop the file here</UploadMessage>;
  };

  return (
    <DropContainer
      {...getRootProps({ className: "dropzone" })}
      $isDragActive={isDragActive}
      $isDragReject={isDragReject}
    >
      <input {...getInputProps()} data-testid="upload" />
      {renderDragMessage(isDragActive, isDragReject)}
    </DropContainer>
  );
}

export default Upload;
