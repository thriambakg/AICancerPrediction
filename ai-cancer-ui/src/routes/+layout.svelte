<script lang='ts'>
    import '../app.css';
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    let { supabase, session } = data;
    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })

        return () => subscription.unsubscribe()
    });
</script>

<svelte:head>
    <title>AI Cancer Recurrence - Predicting Cancer Recurrence with AI</title>
    <meta name="description" content="AI Cancer Recurrence uses cutting-edge AI to predict cancer recurrence based on pathology scans. Doctors can upload cell data and patients can see their scan results.">
    <meta name="keywords" content="cancer recurrence, AI, pathology, scans, prediction">
    <meta name="author" content="AI Cancer Recurrence">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="AI Cancer Recurrence - Predicting Cancer Recurrence with AI">
    <meta property="og:description" content="AI Cancer Recurrence uses cutting-edge AI to predict cancer recurrence based on pathology scans. Doctors can upload cell data and patients can see their scan results.">
    <meta property="og:image" content="https://example.com/ai-cancer-recurrence-logo.jpg">
    <meta property="og:url" content="https://www.aicancerrecurrence.com">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>

<slot />

<style lang='postcss'>
    :global(html),
    :global(body) {
        height: 100%;
        margin: 0;
        padding: 0;
    }

    :global(body) {
        background-image: url('/light-grey-texture-background-image.webp');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }
</style>
