import styled from 'styled-components';
import { COLORS, easyMove } from '../../style-constants';

const MarkerStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  font-size: 14px;
  color: #fff;
  text-transform: uppercase;
  border: 2px solid #1669B4;
  border-radius: 50%;
  background-color: ${COLORS.gray64};
  background-size: cover;
  background-position: center;
  transition: transform 0.3s;
  animation: ${easyMove} 0.3s;
  z-index:1;

  &:hover {
    transform: scale(1.2);
  }

  & .tooltiptext {
    visibility: hidden;
    min-width: 200px;
    background-color: #fff;
    color: #fff;
    text-align: center;
    border-radius: 0px;
    padding: 0;
    position: absolute;
    z-index: 1;
    bottom: 100%;
    left: 50%;
    margin-left: -60px;
  }

  &:hover .tooltiptext {
    visibility: visible;
    z-index: 9999999;
  }
`;

export default MarkerStyled;
