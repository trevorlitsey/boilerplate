import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const P = styled.p`
	text-align: center;
	color: grey;
`

const Footer = () => (
	<P> <a href="http://www.trevorlitsey.com" target="blank">trevorlitsey.com</a> | <a href="https://github.com/trevorlitsey/cashflow-calc" target="blank">github</a> </P>
)

export default Footer;