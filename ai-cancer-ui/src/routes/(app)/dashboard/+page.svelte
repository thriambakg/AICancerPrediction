<script lang="ts">
    import type {PageData} from './$types';

    export let data: PageData;

    const sortedPatientHistory = (data?.patientHistory || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const sortedDoctorHistory = (data?.doctorHistory || []).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    function convertMonthsToYearsMonthsDays(months: number): string {
	    const years = Math.floor(months / 12);
	    const remainingMonths = Math.floor(months % 12);
	    const daysInMonth = 30; // Average number of days in a month
	    const remainingDays = Math.floor((months / 12 - years) * 365.25); // Total days in remaining fraction of a year
	    const days = Math.floor(remainingDays % daysInMonth); // Remaining days after subtracting full months
	    return `${years} years, ${remainingMonths} months, and ${days} days`;
	}
</script>

<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Recent Scans</h1>
    <p class="text-gray-700 mb-8">
        This project explores the potential of using cutting-edge scans of cancer cells to predict cancer recurrence, allowing doctors to upload cell data and patients to view the AI-generated results. However, it is crucial to understand that these predictions are not definitive and should be interpreted as a tool to aid in medical decision-making, not as a replacement for professional medical advice. The primary goal of this discovery project is to investigate the effectiveness and reliability of this kind of predictive testing, and patients are encouraged to discuss the results with their healthcare providers to gain a comprehensive understanding of their individual case and make informed decisions about their treatment plan.
    </p>

    {#if data.isDoctor}
        {#if sortedDoctorHistory.length === 0}
            <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
                <p class="text-lg">
                    <i class="fas fa-info-circle mr-2"></i>
                    No recent scans found. Please check back later or upload new scans.
                </p>
            </div>
        {:else}
            <div class="grid grid-cols-1 gap-6">
                {#each sortedDoctorHistory as item, index}
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-user text-blue-500 text-2xl mr-4"></i>
                            <h2 class="text-xl font-bold">{item.createdFor}</h2>
                        </div>
                        <p class="text-gray-700 mb-4">
                            Based on the provided cell data, the cancer is predicted to recur in approximately <span class="font-bold">{convertMonthsToYearsMonthsDays(item.value.toFixed(2))}</span>.
                        </p>
                        <div class="flex items-center justify-between">
                            <p class="text-gray-500 text-sm">
                                <i class="far fa-clock mr-2"></i>Scan Date: {formatDate(item.createdAt)}
                            </p>
                            <p class="text-gray-500 text-sm">
                                <i class="fas fa-sort-numeric-down mr-2"></i>Scan Order: {index + 1}
                            </p>
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    {:else}
        {#if sortedPatientHistory.length === 0}
            <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded">
                <p class="text-lg">
                    <i class="fas fa-info-circle mr-2"></i>
                    No recent scans found. Please check back later or contact your healthcare provider for more information.
                </p>
            </div>
        {:else}
            <div class="grid grid-cols-1 gap-6">
                {#each sortedPatientHistory as item}
                    <div class="bg-white rounded-lg shadow-md p-6">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-user-md text-blue-500 text-2xl mr-4"></i>
                            <h2 class="text-xl font-bold">{item.createdBy}</h2>
                        </div>
                        <p class="text-gray-700 mb-4">
                            Based on the provided cell data, the cancer is predicted to recur in approximately <span class="font-bold">{convertMonthsToYearsMonthsDays(item.value.toFixed(2))}</span>.
                        </p>
                        <p class="text-gray-500 text-sm">
                            <i class="far fa-clock mr-2"></i>Scan Date: {formatDate(item.createdAt)}
                        </p>
                    </div>
                {/each}
            </div>
        {/if}
    {/if}
</div>
