"use client";
import Rect from "react";
import { NavBarLight, PageNavigator } from "../HomeComponents";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { project_http_link } from "../../../env";
const NotFound = () => {
  const pathname = usePathname();
  return (
    <>
      <NavBarLight />
      <Div>
        <div className="container">
          <PageNavigator text="" />
          <NotFoundDiv>
            <H1>404 Error</H1>
            <P>Resource Not Found</P>
            <br />
            <P>{project_http_link + pathname}</P>
          </NotFoundDiv>
        </div>
      </Div>
    </>
  );
};
export default NotFound;

const Div = styled.div`
  margin-top: 5rem;
`;
const NotFoundDiv = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 1rem 6rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

const H1 = styled.h1`
  font-weight: bold;
  font-size: 2.3rem;
`;

const P = styled.p`
  color: #777;
`;
