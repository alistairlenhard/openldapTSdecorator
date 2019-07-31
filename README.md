# openldapTSdecorator
This is a typescript sample implementation intended as a teaching exercise on how to access openldap with ldapjs-client 
with a support of typescript decorators. The use of decorators in this example ensures good coding style and avoids 
mixing of pure functional business logic with user privileges.

# Prerequisites
1. a functional ldap service. Since I do not belive that everyone has access to a large organizational ldap service, 
I had created and tested this project with openldap for windows which is a port of the openldap for linux as available here:
https://www.userbooster.de/en/download/openldap-for-windows.aspx
2. for convenience download and install: OpenLDAPforWindows_x86.exe (or the 64 bit version) and the respective provided 
by the same company client in order to create some test data with a UI instead of a console only:
https://www.userbooster.de/en/download/userbooster-light.aspx 
- At this point a **thank you** to the developers who made this publically available :-).

# Connect the UI to the openldap server for the first time using the standard Manager account
1. After installation of the UI client
2. Open UI client
3. create a new profile using following data (based on the defaults of the server -
 check providers website in case default credentials were changed:
 - `hostname: localhost`
 - `Port: 389`
 - `Base DN: dc= maxcrc,dc=com`
 - **Test your connection!**

 - `Authentication: Normal`
 - `user: cn=Manager,dc=maxcrc,dc=com`
 - `password: secret` 
 
 Note: You will need the same credentials and Manager user for your app to connect to the openldap service later on.
 
 # Create test data for your openldap server
 1. in the UI, create an organizational unit **testunit1**
 2. select the unit
 3. create a group **group1** within **testuni1**
 4. create a group **group2** within **testunit1**
 5. in **group1** create a user **Maria Maier**
 6. in **group2** create a user **Maximilian Maier**

