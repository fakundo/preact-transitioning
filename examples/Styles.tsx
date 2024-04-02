import { DURATION } from './config';

export function Styles() {
  return (
    <style>
      {`
          .root {
            margin: auto;
            width: 400px;
            max-width: 100%;
            font: 14px/1.4 monospace;
          }
          .container {
            margin: 20px;
            padding: 20px;
            background: beige;
            border-radius: 20px;
          }
          .item {
            color: #fff;
            margin: 2px;
            padding: 5px 10px;
            border-radius: 5px;
            background: seagreen;
            transition: all ${DURATION}ms;
          }
          button.item {
            border: 0;
            width: 100%;
            font: inherit;
            display: block;
            text-align: left;
          }
          .fade-appear { opacity: 0 }
          .fade-appear-active { opacity: 1 }
          .fade-appear-done { opacity: 1 }
          .fade-enter { opacity: 0 }
          .fade-enter-active { opacity: 1 }
          .fade-enter-done { opacity: 1 }
          .fade-exit { opacity: 1 }
          .fade-exit-active { opacity: 0 }
          .fade-exit-done { opacity: 0 }
        `}
    </style>
  );
}
