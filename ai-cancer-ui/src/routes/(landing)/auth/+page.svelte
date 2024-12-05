<script lang='ts'>
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageData;

    let { supabase } = data;
    $: ({ supabase } = data);

    let email: string;
    let password: string;
    let role: 'doctor' | 'patient';

    let checkEmailMessage = false;
    let showRegisterDropdown = false;

    const handleRegisterClick = () => {
        showRegisterDropdown = true;
    };

    const handleSignUp = async () => {
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        const id = data.user?.id || '';

        if (error !== null) {
            console.log(error);
            return;
        }

        const {error: error2} = await supabase.from('user_info').insert([{
            user_id: id,
            is_doctor: role === 'doctor'
        }]);

        if (error2 !== null) {
            console.log(error);
            return;
        }

        email = '';
        password = '';


        checkEmailMessage = true;
        showRegisterDropdown = false;
    };

    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error !== null) {
            console.log(error);
            alert(error);
            return;
        }

        goto('/dashboard');
    };
</script>

<div class="min-h-screen p-4 flex items-center justify-center">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <p class="text-center text-lg mb-4">Welcome</p>

        {#if checkEmailMessage}
            <p class="text-center text-lg mb-4">Please check your email to finish creating your account</p>
        {:else}
            <div class="mb-4">
                <label for="email" class="block mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    bind:value={email}
                    placeholder="Email"
                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div class="mb-4">
                <label for="password" class="block mb-2">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    bind:value={password}
                    placeholder="Password"
                    class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {#if showRegisterDropdown}
                <div class="mb-4">
                    <label for="role" class="block mb-2">Register as</label>
                    <select
                        id="role"
                        name="role"
                        bind:value={role}
                        class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </div>
            {/if}

            <div class="flex justify-between">
                {#if !showRegisterDropdown}
                    <button
                        type="button"
                        on:click={handleRegisterClick}
                        class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                {:else}
                    <button
                        type="submit"
                        on:click={handleSignUp}
                        class="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                {/if}

                <button
                    on:click={handleSignIn}
                    class="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    Login
                </button>
            </div>
        {/if}
    </div>
</div>
