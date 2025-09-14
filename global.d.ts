// types/global.d.ts
declare global {
  interface Window {
    btnOnclickCopasa: () => void;
  }
}

// isso garante que o arquivo seja tratado como um módulo
export {};
