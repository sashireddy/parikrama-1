import {getLoggedInUserInfo, getRole} from "./dataUtils";

// List of ACTIONS to be
export const ACTION_VIEW = "VIEW";
export const ACTION_MANAGE = "MANAGE";
export const ACTION_DELETE = "DELETE";
export const ACTION_GENERATE = "GENERATE";

// List of MODULES in the system
export const MODULE_BRANCH = "BRANCH";
export const MODULE_USER = "USER";
export const MODULE_ROLE = "ROLE";
// export const MODULE_CATEGORY = "CATEGORY";
// export const MODULE_PRODUCT = "PRODUCT";
// export const MODULE_UNIT = "UNIT";
export const MODULE_TRANSFER = "TRANSFER";
export const MODULE_INVENTORY = "INVENTORY";
export const MODULE_REPORT = "REPORT";
export const MODULE_AUDITLOG = "AUDITLOG";
export const MODULE_TRANSACTION = "TRANSACTION";

// List of ROLES in the system
export const ROLE_ADMIN = "admin";
export const ROLE_SUPERADMIN = "superadmin";
export const ROLE_BRANCH = "branch";

let user = null;
let permissions = [];
const isAllowed = (action, module) => {
    if(!permissions.length) {
        user = getLoggedInUserInfo();
        let role = user ? getRole(user.role) : null;
        permissions = role ? role.permissions : [];
    }
    const requiredPermission = `${action}_${module}`;
    return permissions.includes(requiredPermission);
}


export default isAllowed;