import styled from 'styled-components/macro';
import { primary, hint, whiteText } from '../Colors.js';

const hover = 'all 0.2s ease-in';
const slide = 'all 0.5s 0.1s cubic-bezier(0.55,0,0.1,1)';

const PrimaryButton = styled.button`
	/* background: ${primary}; */
  background: rgba(255,255,255,0);
	border: 1px solid ${primary};
	border-radius: 4px;
	color: ${primary};
  cursor: pointer;
  display: inline-block;
	font-family: 'Roboto', Fallback, sans-serif;
  font-size: 14px;
	overflow: hidden;
	padding: 12px 24px;
	transition: ${hover};
	position: relative;
  text-transform: uppercase;

  &:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%)scaleY(1)scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: ${hint};
    border-radius: 50%;
    display: block;
    transition: ${slide};
    z-index: -1;
  }
  &:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%)scaleY(1)scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: ${primary};

    border-radius: 50%;
    display: block;
    transition: ${slide};
    z-index: -1;
  }
  &:hover {
    color: ${whiteText};
    border: 1px solid ${primary};
	border: 1px solid ${hint};


    &:before {
      top: -35%;
      background-color: ${primary};
      transform: translateX(-50%)scaleY(1.3)scaleX(0.8);
	border: 1px solid ${hint};

    }

    &:after {
      top: -45%;
      background-color: ${primary};
      transform: translateX(-50%)scaleY(1.3)scaleX(0.8);
	border: 1px solid ${hint};

    }
  }
`;
export default PrimaryButton;
