import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({parent}) => {
    const {isDoctor} = await parent();

    if (!isDoctor) {
        throw redirect(303, '/dashboard');
    }
}
