export const isAuthenticated = () => {
    return !!localStorage.getItem('TOKEM');
}