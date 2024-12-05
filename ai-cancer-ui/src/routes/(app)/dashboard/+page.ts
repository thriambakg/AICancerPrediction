import type { PageLoad } from './$types';

type PatientHistory = {
    value: number;
    createdBy: string;
    createdAt: string;
}

type DoctorHistory = {
    value: number;
    createdFor: string;
    createdAt: string;
}

export const load: PageLoad = async ({ parent }) => {
    const {supabase, session, isDoctor} = await parent();

    const patientHistory: PatientHistory[] = [];
    const doctorHistory: DoctorHistory[] = [];

    if (isDoctor) {
        const {data, error} = await supabase
            .from('history')
            .select('*')
            .eq('created_by', session?.user.id || '');

        if (error !== null) {
            console.log(error);
        } else {
            const patientEmails: {[key: string]: string | undefined} = {};

            for (const item of data) {
                const createdFor = item.created_for as string;
                let email = patientEmails[createdFor];

                if (!email) {
                    const {data: data2, error: error2} = await supabase.rpc('get_user_email_by_id', {user_id: createdFor || ''});

                    if (error2 !== null) {
                        console.log(error2);
                    }

                    patientEmails[createdFor] = data2 as string;

                    email = data2 as string;
                }

                doctorHistory.push({
                    value: item.value || 0,
                    createdFor: email || 'Unknown Patient',
                    createdAt: item.created_at
                });
            }
        }
    } else {
        const {data, error} = await supabase
            .from('history')
            .select('*')
            .eq('created_for', session?.user.id || '');

        if (error !== null) {
            console.log(error);
        } else {
            const doctorEmails: {[key: string]: string | undefined} = {};

            for (const item of data) {
                const createdBy = item.created_by as string;
                let email = doctorEmails[createdBy];

                if (!email) {
                    const {data: data2, error: error2} = await supabase.rpc('get_user_email_by_id', {user_id: createdBy || ''});

                    if (error2 !== null) {
                        console.log(error2);
                    }

                    doctorEmails[createdBy] = data2 as string;

                    email = data2 as string;
                }

                patientHistory.push({
                    value: item.value || 0,
                    createdBy: email || 'Unknown Doctor',
                    createdAt: item.created_at
                });
            }
        }
    }

    return {
        patientHistory,
        doctorHistory
    }
};
