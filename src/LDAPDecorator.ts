import {LDAPConnector} from "./LDAPConnector";
import * as CONFIG from "./Config";


export function verifyGroup(group: string, user: string) {

    return function verifyPrivilege(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const newDescriptor = Object.assign({}, descriptor);
        newDescriptor.value = async function () {
            let mybool;
            switch (group) {
                case (CONFIG.GROUPS.GROUP1):
                    mybool = await LDAPConnector.testGroup(user, group);
                    break;
                case (CONFIG.GROUPS.GROUP2):
                    mybool = await LDAPConnector.testGroup(user, group);
                    break;
                default:
                     throw new Error('Group does not exist. Please check.');
                     break;
            }
            if (mybool) {
                return descriptor.value.apply(this, arguments);
            } else {
                console.warn(`user ${user} can't invoke ${propertyKey}`);
            }
        }
        return newDescriptor;
    }
}