declare module "nuxt/schema" {
  interface RuntimeConfig {}
  interface PublicRuntimeConfig {
    supabase: {
      url: string;
      key: string;
      cookieName: string;
    };
  }
}
// It is always important to ensure you import/export something when augmenting a type
export {};
