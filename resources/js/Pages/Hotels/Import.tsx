import { useForm } from "@inertiajs/react";
import { WarningAmber } from "@mui/icons-material";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { filesize } from "filesize";

import FileList from "@/Components/FileList";
import Upload from "@/Components/Upload";
import { FileProps } from "@/dtos/Files";
import { useToast } from "@/hooks/useToast";
import { PageLayout } from "@/Layouts/PageLayout";

function ImportHotels() {
  const { post, processing, data, reset, setData, transform, progress } =
    useForm<{
      csv_file: FileProps | null;
    }>({
      csv_file: null,
    });

  const toast = useToast();

  async function handleUpload(): Promise<void> {
    transform((data) => ({
      ...data,
      // @ts-expect-error We need to transform the file here before upload to remove unnecessary data
      csv_file: data.csv_file?.file,
    }));

    post(route("hotels.import"), {
      onSuccess: () => {
        toast.success("File uploaded successfully");
        reset();
      },
      onError: (errors) => {
        const errorMessages = Object.values(errors);

        errorMessages.forEach((message) => {
          toast.error(message);
        });
      },
    });
  }

  function submitFile(file: File): void {
    const fileMapped: FileProps = {
      file,
      name: file.name,
      readableSize: filesize(file.size),
    };

    setData("csv_file", fileMapped);
  }

  return (
    <Container>
      <Typography variant="h4" textAlign="center">
        Import Hotels
      </Typography>
      <ImportFileContainer>
        <Upload onUpload={submitFile} disabled={processing} />
        {data.csv_file && <FileList file={data.csv_file} />}

        <Footer>
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <WarningAmber color="error" />
            <Typography variant="subtitle2" color="GrayText">
              Only files with .csv extension are allowed
            </Typography>
          </Box>

          <Button
            disabled={processing}
            onClick={handleUpload}
            variant="contained"
          >
            {processing ? (
              <>
                {progress?.percentage}% <CircularProgress size={24} />
              </>
            ) : (
              "Send"
            )}
          </Button>
        </Footer>
      </ImportFileContainer>
    </Container>
  );
}

ImportHotels.layout = (page: React.ReactNode) => (
  <PageLayout children={page} title="Import Hotels" />
);

export default ImportHotels;

export const Container = styled("div")`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const ImportFileContainer = styled("section")`
  background: #fff;
  border-radius: 5px;
  padding: 64px;
`;

export const Footer = styled("section")`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
