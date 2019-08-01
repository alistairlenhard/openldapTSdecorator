const LdapClient = require('ldapjs-client');
let client;
import * as CONFIG from "./Config";


export class LDAPConnector {
    constructor (){
       this.connect();
    }

    /**
     * simple function to connect to your ldap server. replace:
     * - url
     * - bind options cn = privileged user (here 'Manager') who may make modifications or query your ldap depending on your needs.
     * - dc info as provided by your admin
     * - ldap password for the privileged user
     */
    private connect(){
        client = new LdapClient({url: CONFIG.LDAPURLPORT});

         try {
            client.bind(`cn=${CONFIG.ADMIN},dc=${CONFIG.DC1_VALUE},dc=${CONFIG.DC2_VALUE}`, CONFIG.ADMINPWD);
            console.log('Connected successfully.');

        } catch (e) {
            console.log('Bind failed. Are you sure your service is running?');
        }
    }

    /**
     * Function will perform an ldapsearch with user and group. Depending on your ldap configuration
     * a filter could be used instead of the search that is used here. Since this is an example
     * and not intended to be an ldap tutorial, I recommend to review http://www.openldap.org/doc/admin24/guide.html for
     * further information. You will see that the setup of a company grade ldap is not an easy task and may require some
     * time if you are new to the topic.
     * @param user - user to check against ldap
     * @param group - group to check against ldap
     */
    public static async  testGroup(user: string, group: string): Promise <boolean> {
       if (!client)
          throw new Error ('The ldap client is not connected to the ldap server. Did you forget to call the routine?');
      try {
            const options = {
               // filter: `(&(objectClass=*)(member=cn=Maria Maier,ou=people,dc=maxcrc,dc=com))`,
                attributes: ['dn', 'sn', 'cn', 'description', 'initials','member','ou']
            };
            const entries = await client.search(`cn=${user},cn=${group},dc=${CONFIG.DC1_VALUE},dc=${CONFIG.DC2_VALUE}`, options);

            console.log(JSON.stringify(entries));
        }
        catch (NoSuchObjectError){
          console.log(`${user} not found or does not belong to this group1.`)  ;
          return false;
        }
        return true;
    }
}