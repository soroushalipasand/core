// import { OrginalPermission } from './path-to-your-global-types'; // Adjust import path

export default class Permission {
    id: string;
    title: string;
    slug: string | null;
    active: boolean;

    constructor(id: string, title: string, slug: string | null, active: boolean = true) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.active = active;
    }
}
