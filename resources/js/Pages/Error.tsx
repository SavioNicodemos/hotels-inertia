import { PageLayout } from "@/Layouts/PageLayout";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";

const ErrorPage = ({ status }: { status: number }) => {
  const title =
    {
      503: "503: Service Unavailable",
      500: "500: Server Error",
      404: "404: Page Not Found",
      403: "403: Forbidden",
    }[status] ||
    "We're sorry for the inconvenience. Our team has been notified and is working on a fix.";

  const description =
    {
      503: "Sorry, we are doing some maintenance. Please check back soon.",
      500: "Whoops, something went wrong on our servers.",
      404: "Sorry, the page you are looking for could not be found.",
      403: "Sorry, you are forbidden from accessing this page.",
    }[status] || "Oops! Something unexpected happened.";

  return (
    <Container>
      <Box
        marginTop={15}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        py={4}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <ErrorOutline style={{ fontSize: 100 }} color="error" />
        <Typography variant="h3">{description}</Typography>
        <Typography variant="h5">{title}</Typography>
      </Box>
    </Container>
  );
};

ErrorPage.layout = (page: React.ReactNode) => (
  <PageLayout children={page} title="Error" />
);

export default ErrorPage;
