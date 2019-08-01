import {LDAPConnector} from './LDAPConnector';
import {verifyGroup} from './LDAPDecorator';

/**
 * Before querying the ldap with a decorator, I want to initialize a connection that could be reused.
 * This connection could also be implemented within the decorator itself, however i wanted to avoid frequent
 * reconnects to ldap. -> balancing frequent connections to ldap versus probability of connection loss.
 */
function init(){
    let myLDAP = new LDAPConnector();
}

/**
 * Simply class with some basic methods being decorated and called if the user has the privilege based on the ldap config.
 */
class A {
    @verifyGroup('group1','Maria Maier')
    methodA() {
        console.log('method A was called.');
    }

    @verifyGroup('group2','Alexander Maier')
    methodB() {
        console.log('method B was called.');
    }

    // this user has no access to group 1 according to the test config. Therfore the function will not be executed.
    @verifyGroup('group1','Alexander Maier')
    methodC() {
        console.log('method C was called.');
    }
}

// simple function call.
function testit2(){
    init();
    let a = new A();
    a.methodA();
    a.methodB();
    a.methodC();
}

testit2();