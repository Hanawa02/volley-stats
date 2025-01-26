<template>
  <section>
    <h1>Volleyball Stats</h1>
    <p>Your volleyball game statistics tool!</p>
  </section>
  <section>Hello, {{ user?.user_metadata.displayName }}</section>

  <NuxtLink to="/roles" class="underline">Roles</NuxtLink>
  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
  navigateTo("/auth/login");
};
</script>
