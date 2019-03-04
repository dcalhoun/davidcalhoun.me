import PropTypes from "prop-types";
import React from "react";
import TextLink from "./TextLink";
import { Link } from "gatsby";
import { ThemeContext } from "../components/Theme";
import { fonts } from "../utils/style";
import { styled } from "styletron-react";

const Container = styled("header", {
  fontFamily: fonts.heading,
  margin: "3rem 0",
  padding: "0 1rem",

  "@media (min-width: 40rem)": {
    alignItems: "baseline",
    display: "flex",
    flexWrap: "flex-wrap",
    justifyContent: "space-between"
  }
});

const Title = styled("h1", {
  display: "inline-block",
  fontFamily: fonts.monospace,
  fontSize: "1.25rem",
  fontWeight: 300,
  margin: "0 0 1rem 0",

  "@media screen and (min-width: 40rem)": {
    fontSize: "1.5rem",
    marginBottom: 0
  }
});

const NavItem = styled("div", {
  display: "inline-block",
  fontSize: "0.875rem",
  paddingRight: "0.5rem",

  "@media screen and (min-width: 40rem)": {
    fontSize: "1rem",
    paddingLeft: "0.5rem"
  }
});

function Header(props) {
  return (
    <Container>
      <Title>
        {props.children}
        <Link to="/" prefetch>
          <TextLink button href="/">
            David Calhoun
          </TextLink>
        </Link>
      </Title>

      <nav>
        <NavItem>
          <Link to="/writing" prefetch>
            <TextLink href="/writing">Writing</TextLink>
          </Link>
        </NavItem>

        <NavItem>
          <TextLink href="http://twitter.com/david_calhoun">Twitter</TextLink>
        </NavItem>

        <NavItem>
          <TextLink href="http://github.com/dcalhoun">GitHub</TextLink>
        </NavItem>
      </nav>
    </Container>
  );
}

Header.propTypes = {
  children: PropTypes.node
};

export default Header;
