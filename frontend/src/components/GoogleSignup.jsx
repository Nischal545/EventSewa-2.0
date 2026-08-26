import {useGoogleLogin} from "@react-oauth/google";

export default function GoogleSignup() {

    const consentScreen = useGoogleLogin({
        flow: 'auth-code',

        onSuccess: (tokenResponse) => {
            console.log(tokenResponse);
        },
        onError: (error) => {
            console.log(error);
        }
    })

    return consentScreen;

}