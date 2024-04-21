import Cookies from 'js-cookie';

export const getUserId = async () => {
    const userToken = Cookies.get('userToken');
    if(userToken){
        const payload = userToken.split('.')[1];
        const data = JSON.parse(atob(payload));
        return data.user_id;
    }
    return null;
}