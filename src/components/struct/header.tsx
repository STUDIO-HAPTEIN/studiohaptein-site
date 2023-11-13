/**
 * Header
 * 2023-2023
 * v 0.0.1
 */

// REACT
import React, { FC } from "react";
// APP
import { MenuHeaderBig } from "../menu/menu__header_big.tsx";
import { HeaderContextProvider } from "../../context.tsx";

interface PropsHeader {
  // your code
}

export const Header: FC<PropsHeader> = () => {
  return (<HeaderContextProvider>
    <MenuHeaderBig/>
  </HeaderContextProvider>)
} 

