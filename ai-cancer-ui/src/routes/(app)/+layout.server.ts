import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { getSession, supabase } }) => {
    const session = await getSession();

    if (session === null) {
        throw redirect(303, '/auth');
    }

    const id = session?.user.id || '';

    const {data, error} = await supabase
        .from('user_info')
        .select('*')
        .eq('user_id', id);

    if (error !== null) {
        console.log(error);
    }

    const isDoctor = (data as NonNullable<typeof data>)[0].is_doctor || false;

    return {
        isDoctor
    }
}
