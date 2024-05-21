import { router, usePage } from "@inertiajs/react";
import {
  Home as HomeIcon,
  Logout as LogoutIcon,
  MoreVert as MoreIcon,
  Person as PersonIcon,
  AddCircle as PlusIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { MouseEvent, useState } from "react";

import { PageProps } from "@/types";
import { env } from "@/utils/env";
import { Search, StyledInputBase } from "./styles";

export default function PrimarySearchAppBar({ showSearch = false }: Props) {
  const [searchQuery, setSearchQuery] = useState(route().params?.query || "");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const user = usePage<PageProps>().props.auth.user;
  const theme = useTheme();

  const navOptions = user
    ? [
        {
          title: "Add a new hotel",
          description: "Add a new hotel",
          testId: "goto-add-hotel",
          icon: <PlusIcon />,
          onClick: () => router.visit("/hotels/create"),
        },
        {
          title: "Import hotels",
          description: "Upload a CSV file for mass hotels import",
          testId: "goto-import-hotels",
          icon: <UploadIcon />,
          onClick: () => router.visit("/hotels/import"),
        },
        {
          title: "Profile",
          description: "View and edit your profile",
          testId: "goto-profile",
          icon: <PersonIcon />,
          onClick: () => router.visit("/profile"),
        },
        {
          title: "Logout",
          description: "Logout from the application",
          testId: "goto-logout",
          icon: <LogoutIcon />,
          onClick: () => router.post("/logout"),
        },
      ]
    : [
        {
          title: "Login",
          description: "Login to the application",
          testId: "goto-login",
          icon: <PersonIcon />,
          onClick: () => router.visit("/login"),
        },
      ];

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = () => {
    if (!searchQuery) return;

    router.visit("/hotels", {
      data: { query: searchQuery },
    });
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => router.visit("/")}>
        <IconButton size="large" aria-label="add a new hotel" color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      {navOptions.map((option) => (
        <MenuItem key={option.title} onClick={() => option.onClick()}>
          <IconButton
            size="large"
            aria-label={option.description}
            color="inherit"
          >
            {option.icon}
          </IconButton>
          <p>{option.title}</p>
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <Box position="fixed" width="100%" zIndex="1">
      <AppBar
        sx={{
          bgcolor: theme.palette.background + "dd",
          backdropFilter: "blur(5px)",
        }}
      >
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                display: { xs: showSearch ? "none" : "block", sm: "block" },
                cursor: "pointer",
              }}
              onClick={() => router.visit("/hotels")}
            >
              {env.APP_NAME}
            </Typography>
            {showSearch && (
              <>
                <Search>
                  <StyledInputBase
                    data-testid="search-input"
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Search>
                <SearchIcon
                  onClick={() => handleSearch()}
                  sx={{ cursor: "pointer" }}
                />
              </>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navOptions.map((option) => (
                <Tooltip key={option.title} title={option.description}>
                  <IconButton
                    size="large"
                    aria-label={option.title}
                    color="inherit"
                    onClick={option.onClick}
                    data-testid={option.testId}
                  >
                    {option.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

type Props = {
  showSearch?: boolean;
};
