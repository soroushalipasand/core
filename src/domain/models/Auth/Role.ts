// import { RolePermission } from ''; // Adjust import path

import { RolePermission } from "global";

export default class Role {
    id: string;
    title: string;
    slug: string | null;
    active: boolean;
    permissions: RolePermission[]; // Using the RolePermission interface

    constructor(
        id: string,
        title: string,
        slug: string | null,
        active: boolean = true,
        permissions: RolePermission[] = []
    ) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.active = active;
        this.permissions = permissions;
    }
}
