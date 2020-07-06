import store from "../store";


// All the possible system modules
// I think every one should have access to dashboard, if a user with role without even a single
// permission should able to at least dashboard, rest all links will not be displayed
// Having permission of Manage with out view will be use less, Admin needs to understand this.
export const USER_MODULE = "USER";
export const ROLE_MODULE = "ROLE";
export const CATEGORY_MODULE = "CATEGORY";


// All the possible system ACCESS
export const ACCESS_TYPE_VIEW = "VIEW";
export const ACCESS_TYPE_MANAGE = "MANAGE";

// BY USING THE MODULE AND ACCESS TYPE GENERATED PERMISSION WILL BE
// ${ACCESS_TYPE}_${MODULE} WILL BE THE PERMISSION
// e.g WITH MODULE USER WE'LL HAVE `VIEW_USER` & `MANAGE_USER` PERMISSIONS
// WE'LL JOIN THE PASSED MODULE AND ACCESS TYPE TO GENERATE THE PERMISSION
// WE'LL VALIDATE TEH PERMISSION AGAINST THE ROLE'S ACCESS LIST TO RETURN STATUS
// WEATHER TO SHOW THE LINK OR NOT
// e.g

/**
 *
 * @param {String} module Module from the constants
 * @param {String} accessType AccessType from the constants
 * @returns {Boolean} Allowed/Not Allowed to perform the operation
 */
export const isAllowedAction = (module, accessType) => {
    const requiredPermission = `${accessType}_${module}`;
    // Get the role from the user from the store
    // Get the permission of the role from the stor
    // Check required permission in the roles permission
    // return based the permission present for the role.
}

