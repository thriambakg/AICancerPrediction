<script lang="ts">
    import { goto } from '$app/navigation';
</script>

<main>
    <section class="bg-gradient-to-r from-blue-100 to-blue-200 py-12 sm:py-24">
        <div class="container mx-auto px-4">
            <div class="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
                <h1 class="text-3xl sm:text-4xl font-bold text-blue-900 mb-3 sm:mb-4">Predicting Cancer Recurrence with AI</h1>
                <p class="text-blue-800 text-base sm:text-lg">Upload pathology scans and leverage cutting-edge AI to predict cancer recurrence.</p>
            </div>
            <div class="max-w-md mx-auto">
                <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                    <button 
                        on:click={() => {
                            goto('/auth')
                        }}
                        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section class="bg-white py-12 sm:py-24 text-gray-800">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-4xl sm:text-5xl font-bold text-blue-600 sm:mb-4">Empower Doctors and Patients with AI Insights</h2>
                <p class="text-xl sm:text-2xl text-gray-700">Our application leverages a dataset of cutting-edge cancer cell scans to predict cancer recurrence, providing valuable insights to healthcare professionals and patients.</p>
            </div>
        </div>
    </section>
    <section class="bg-blue-50 py-12 sm:py-24">
        <div class="container mx-auto px-4">
            <div class="max-w-xl mx-auto text-center mb-8 sm:mb-12">
                <h2 class="text-2xl sm:text-3xl font-bold text-blue-600 mb-3 sm:mb-4">Why Choose AI Cancer Recurrence?</h2>
                <p class="text-gray-600 text-sm sm:text-base">Our application offers unique features to support doctors and patients in predicting cancer recurrence.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-microscope text-blue-500 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-center text-gray-800">Cutting-Edge Pathology Dataset</h3>
                    <p class="text-gray-600 text-center">Our model is trained on a dataset containing state-of-the-art scans of cancer cells from patients in remission.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-brain text-blue-500 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-center text-gray-800">AI-Powered Predictions</h3>
                    <p class="text-gray-600 text-center">Leveraging advanced AI techniques, our application predicts the time until cancer recurrence based on the uploaded cell data.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-user-md text-blue-500 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-center text-gray-800">Doctor-Patient Collaboration</h3>
                    <p class="text-gray-600 text-center">Doctors can easily upload cell data, and patients can access their scan results, fostering a collaborative approach to cancer care.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-chart-line text-blue-500 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-center text-gray-800">Correlation Discovery</h3>
                    <p class="text-gray-600 text-center">As part of our project, we aim to uncover potential correlations between cell data and cancer recurrence time.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-shield-alt text-blue-500 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-center text-gray-800">Data Security and Privacy</h3>
                    <p class="text-gray-600 text-center">We prioritize the security and privacy of patient data, ensuring compliance with relevant regulations and best practices.</p>
                </div>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="flex items-center justify-center mb-4">
                        <i class="fas fa-users text-blue-500 text-4xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2 text-center text-gray-800">Collaborative Research</h3>
                    <p class="text-gray-600 text-center">Our application serves as a platform for collaborative research, enabling the medical community to advance cancer recurrence prediction.</p>
                </div>
            </div>
        </div>
    </section>
</main>
