/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENDPOINT: string;
  readonly VITE_STORED_USER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
