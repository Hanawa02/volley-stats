<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();

const config = useRuntimeConfig();
// Get redirect path from cookies
const cookiePrefix = config.public.supabase.cookieName;
const redirectPathCookieKey = `${cookiePrefix}-redirect-path`;
const redirectPath = useCookie<string | null>(redirectPathCookieKey).value;

const navigateIfUser = () => {
  if (!user.value) {
    return;
  }

  // Clear cookie
  useCookie(redirectPathCookieKey).value = null;
  // Redirect to path
  return navigateTo(redirectPath || "/");
};

watch(user, navigateIfUser, { immediate: true });
</script>
