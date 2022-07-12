import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    letter-spacing: 1.2;
  }
  .container{
    width: 100%;
    max-width: 1100px;
    margin: 15px auto;

    @media only screen and (max-width: 768px){
      margin: 10px;
  }
  .grid-4{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;

    @media only screen and (max-width: 768px){
      grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 580px){
      grid-template-columns: 1fr;
    }
  }
`;

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

