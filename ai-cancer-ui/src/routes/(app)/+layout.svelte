<script lang="ts">
    import { goto } from "$app/navigation";
    import type { LayoutData } from "./$types";

    export let data: LayoutData;

    let { supabase, isDoctor } = data;
    $: ({ supabase, isDoctor } = data);

    let isMobileMenuOpen = false;

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }
</script>

<nav class="bg-gray-100 py-4 sticky top-0 z-10">
    <div class="container mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center">
            <a href="/" class="flex items-center">
                <i class="fas fa-dna text-blue-500 text-2xl pt-1"></i>
                <h1 class="text-xl md:text-2xl font-bold text-blue-500 ml-2">AI Cancer Recurrence</h1>
            </a>
        </div>

        <div class="hidden md:flex items-center space-x-6">
            {#if isDoctor}
                <a href="/model" class="text-gray-600 hover:text-blue-400 transition duration-300 flex items-center">
                    <i class="mr-2"></i>
                    <span>Model</span>
                </a>
            {/if}
            <a href="/dashboard" class="text-gray-600 hover:text-blue-400 transition duration-300 flex items-center">
                <i class="mr-2"></i>
                <span>Dashboard</span>
            </a>
            <button
                class="text-gray-600 hover:text-blue-400 transition duration-300 flex items-center"
                on:click={async () => {
                    await supabase.auth.signOut();
                    goto('/auth');
                }}
            >
                <i class="mr-2"></i>
                <span>Sign Out</span>
            </button>
        </div>

        <div class="md:hidden">
            <button class="text-gray-600 hover:text-blue-400 focus:outline-none" on:click={toggleMobileMenu}>
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
    </div>

    {#if isMobileMenuOpen}
        <div class="md:hidden bg-gray-100 py-2">
            <div class="container mx-auto px-4">
                {#if isDoctor}
                    <a href="/model" class="block text-gray-600 hover:text-blue-400 py-2">Model</a>
                {/if}
                <a href="/dashboard" class="block text-gray-600 hover:text-blue-400 py-2">Dashboard</a>
                <button
                    class="block text-gray-600 hover:text-blue-400 py-2"
                    on:click={async () => {
                        await supabase.auth.signOut();
                        goto('/auth');
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    {/if}
</nav>

<slot />
