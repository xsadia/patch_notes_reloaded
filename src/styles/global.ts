import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        --green: #499F68;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow-x: hidden;
    }

    body {
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: none;
        }
        ::-webkit-scrollbar-thumb {
            background: var(--green);
        }

    }

    body, input, textarea, button {
      font-family: 'Roboto Slab', serif;
        font-weight: 400;
    }
    h1, h1, h3, h4, h5, h6, strong {
        font-weight: 600;
    }
    button[disabled] {
        cursor: not-allowed;
    }
    button, a {
        cursor: pointer;
    }

    
`;
