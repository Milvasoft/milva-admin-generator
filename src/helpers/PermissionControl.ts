export default class PermissionControl {
  public static Control(roles?: Array<string>, permission?: string) {

    if (roles === undefined || roles === null || permission === undefined) {

      return false; 

    }
    
    return permission.split('|').some((p) => roles.some((role) => role === p));
  
  }
}
