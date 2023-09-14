import './skin.css?raw'

import styled, { css } from 'styled-components'

import React from 'react'

const Logo = ({ projectName }) => {
  return (
    <img src='../../public/secondary_logo/RIPPA LOGOS-12.png' alt='Logo' width={50} height={50} />
  )
}

const Icon = styled.div`
  display: block;
  width: auto;
  height: 2em;
  max-width: 100%;
  margin: -0.75rem auto;
  color: white;

  ${props =>
    props.isLogin &&
    css`
      display: block;
      margin: 0 auto;
      height: 4rem;
      color: black;
    `}

  svg {
    display: block;
    margin: 0 auto;
    height: 100% !important;
    width: auto;
    fill: currentColor;
  }
`

export default Logo
