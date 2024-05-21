import { Container, FileInfo } from "./styles";

type FileProps = {
  name: string;
  readableSize: string;
};

type FileListProps = {
  file: FileProps;
};

function FileList({ file: uploadedFile }: FileListProps) {
  return (
    <Container>
      <li key={uploadedFile.name}>
        <FileInfo>
          <div>
            <strong>{uploadedFile.name}</strong>
            <span>{uploadedFile.readableSize}</span>
          </div>
        </FileInfo>
      </li>
    </Container>
  );
}

export default FileList;
