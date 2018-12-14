export default class User {
    static name;
    static url;
    constructor(fac) {
        name = fac.displayName;
        url = fac.profileURL
    }
}