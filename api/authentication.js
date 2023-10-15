export function authenticate(Username, Password) { //return true if user was found, false otherwise
    return null;
}
export function createUser (Username, Password) { //creates a new user with the given credentials
    return null;
}
export function checkCredentials (Username, Password) { //checks that credentials fit length and character requirements
    return null
}
export async function signIn(Username, Password) { //checks credentials and authenticates user, returns boolean
    let ValidCred = await checkCredentials(Username,Password);
    let userAuthenticated = await authenticate(Username, Password);
    if (ValidCred && userAuthenticated) {
        return true;
    }
    return false;
}



