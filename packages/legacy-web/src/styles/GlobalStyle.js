import { createGlobalStyle } from 'styled-components';
import { Fonts } from './Fonts';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        max-width: 100vw;
    }
    
    html {
        --color-primary-main: #005EFF;
        --color-primary-shade: #002F80;
        --color-primary-medium-tint: #669EFF;
        --color-primary-light-tint: #CCDFFF;

        --color-secondary-main: #FFC551;
        --color-secondary-shade: #F2983E;
        --color-secondary-dark-shade: #7C4106;
        --color-secondary-medium-tint: #FFDC97;
        --color-secondary-light-tint: #FFF3DC;

        --color-tertiary-main: #FFD8D9;
        --color-tertiary-light-shade: #ECA3A5;
        --color-tertiary-dark-shade: #875D6F;
        --color-tertiary-medium-tint: #FFECEB;
        --color-tertiary-light-tint: #FFF3F4;

        --color-success-main: #00D3A1;
        --color-success-shade: #0B8467;
        --color-success-medium-tint: #5DFCD6;
        --color-success-light-tint: #A8FFEA;

        --color-dark-main: #160F29;

        --color-accent-01: #FFFFFF;
        --color-accent-02: #F6F7F9;
        --color-accent-03: #E6EBEF;
        --color-accent-04: #A7ACBA;
        --color-accent-05: #676B74;

        --font-body: Neue Haas Unica, Helvetica, Arial, sans-serif;
        --font-headline: Uxum Grotesque, Helvetica, Aria, sans-serif;
        --font-monospace: Fira Code, courier, monospace;

        --breakpoint-xs: 350px;
        --breakpoint-sm: 500px;
        --breakpoint-md: 768px;
        --breakpoint-lg: 1000px;
        --breakpoint-xl: 1440px;

        background: var(--color-tertiary-light-tint);
        font-size: 16px;
        font-family: var(--font-body);
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    @font-face {
        font-family: "Uxum Grotesque";
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        src: url(${Fonts.UxumGrotesqueRegularWOFF}) format("woff"),
        url(${Fonts.UxumGrotesqueRegularWOFF2}) format("woff2");
    }

    @font-face {
        font-family: "Uxum Grotesque";
        font-weight: bold;
        font-style: normal;
        font-display: swap;
        src: url(${Fonts.UxumGrotesqueBoldWOFF}) format("woff"),
        url(${Fonts.UxumGrotesqueBoldWOFF2}) format("woff2");
    }

    @font-face {
        font-family: "Uxum Grotesque";
        font-weight: 600;
        font-style: normal;
        font-display: swap;
        src: url(${Fonts.UxumGrotesqueMediumWOFF}) format("woff"),
        url(${Fonts.UxumGrotesqueMediumWOFF2}) format("woff2");
    }

    @font-face {
        font-family: "Neue Haas Unica";
        font-weight: normal;
        font-style: normal;
        font-display: swap;
        src: url(${Fonts.NeueHaasUnicaProRegularWOFF}) format("woff"),
        url(${Fonts.NeueHaasUnicaProRegularWOFF2}) format("woff2");
    }

    @font-face {
        font-family: "Neue Haas Unica";
        font-weight: bold;
        font-style: normal;
        src: url(${Fonts.NeueHaasUnicaProBoldWOFF}) format("woff"),
            url(${Fonts.NeueHaasUnicaProBoldWOFF2}) format("woff2");
    }

    @font-face {
        font-family: "Neue Haas Unica";
        font-weight: normal;
        font-style: italic;
        src: url(${Fonts.NeueHaasUnicaProItalicWOFF}) format("woff"),
            url(${Fonts.NeueHaasUnicaProItalicWOFF2}) format("woff2");
    }

    @font-face {
        font-family: "Fira Code";
        font-weight: normal;
        font-style: normal;
        src: url(${Fonts.FiraCodeRegularWOFF}) format("woff"),
            url(${Fonts.FiraCodeRegularWOFF2}) format("woff2");
    }

    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul, ol {
        padding-left: 2rem;
        li {
            padding: 0.5rem 0 0.5rem 0.5rem;
            line-height: 1.7;
            list-style-position: outside;
        }
    }

    ul {
        list-style: none;
        li {
            position: relative;
            padding: 0.5rem 0 0.5rem 0.75rem;
            &::before {
                content: '';
                width: 30px;
                height: 30px;
                position: absolute;
                background-image: url("/arrow-right.png");
                background-size: cover;
                background-position: center;
                left: -2rem;
            }
        }
    }
`;

export default GlobalStyle;
