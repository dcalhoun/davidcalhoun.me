import "../utils/reset.css";
import Header from "./Header";
import PropTypes from "prop-types";
import React, { useState, useLayoutEffect } from "react";
import SEO from "../components/SEO";
import TextLink from "./TextLink";
import chroma from "chroma-js";
import { ThemeContext, themes } from "../components/Theme";
import { fonts } from "../utils/style";
import { styled } from "styletron-react";

function Layout(props) {
  const [theme, setTheme] = useState(themes.light);
  const toggleTheme = () => {
    window.__setPreferedTheme(theme === themes.dark ? "light" : "dark");
  };

  useLayoutEffect(() => {
    setTheme(themes[window.__theme]);
    window.__onThemeChange = () => {
      setTheme(themes[window.__theme]);
    };

    return () => {
      window.__onThemeChange = () => {};
    };
  });

  return (
    <ThemeContext.Provider value={theme}>
      <Container $background={theme.background}>
        <Inner $background={theme.background}>
          <Content>
            <Header>
              <Leader
                $color={theme.color}
                $linkColor={theme.linkColor}
                onClick={toggleTheme}
              >
                #
              </Leader>
            </Header>
            {props.children}
          </Content>
        </Inner>
      </Container>
    </ThemeContext.Provider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

export default Layout;

const Container = styled("div", props => ({
  backgroundColor: chroma(props.$background)
    .darken(0.5)
    .hex(),
  padding: "0.5rem",
  transition: "background-color 160ms ease",

  "@media (min-width: 54rem)": {
    padding: "1rem"
  }
}));

const Inner = styled("div", props => ({
  backgroundColor: props.$background,
  minHeight: "calc(100vh - 1rem)",
  overflow: "hidden",
  position: "relative",
  transition: "background-color 160ms ease",

  "@media (min-width: 54rem)": {
    minHeight: "calc(100vh - 2rem)"
  }
}));

const Content = styled("div", {
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "56.25rem",

  "@media (min-width: 54rem)": {
    marginBottom: "3rem"
  }
});

const Leader = styled(TextLink, () => ({
  alignItems: "center",
  cursor: "pointer",
  display: "flex",
  fontFamily: fonts.monospace,
  height: "3rem",
  justifyContent: "center",
  position: "absolute",
  right: "0.5rem",
  top: "0.5rem",
  width: "3rem"
}));