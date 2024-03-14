import styled from 'styled-components';
import { easyMove } from '../../style-constants';

const MarkerGroup = styled.div`
  display: flex;
  width: ${props => (props.length === 2 ? '55px' : '80px')};
  background: #1669B4;
  border-radius: 100px;
  animation: ${easyMove} 0.3s;
  background-color: #1669B4;
`;

export default MarkerGroup;
