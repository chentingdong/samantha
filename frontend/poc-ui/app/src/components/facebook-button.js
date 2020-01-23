import React, { setState, useEffect } from "react";
import { Auth } from "aws-amplify";
import LoaderButton from "./loader-button";

function waitForInit () {
  return new Promise((res, rej) => {
    const hasFbLoaded = () => {
      if (window.FB) {
        res();
      } else {
        setTimeout(hasFbLoaded, 300);
      }
    };
    hasFbLoaded();
  });
}

// function FacebookButton (props) {
//   const [ isLoading, setIsLoading ] = setState(false)

//   useEffect(async () => {
//     await waitForInit();
//     setIsLoading(false);
//   })

//   function statusChangeCallback (response) {
//     if (response.status === "connected") {
//       handleResponse(response.authResponse);
//     } else {
//       handleError(response);
//     }
//   };

//   function checkLoginState () {
//     window.FB.getLoginStatus(statusChangeCallback);
//   };

//   function handleClick () {
//     window.FB.login(checkLoginState, { scope: "public_profile,email" });
//   };

//   function handleError (error) {
//     alert(error);
//   };

//   async function handleResponse (data) {
//     const { email, accessToken: token, expiresIn } = data;
//     const expires_at = expiresIn * 1000 + new Date().getTime();
//     const user = { email };
//     setIsLoading(true);

//     try {
//       const response = await Auth.federatedSignIn(
//         "facebook",
//         { token, expires_at },
//         user
//       );
//       setIsLoading(false);
//       this.props.onLogin(response);
//     }
//     catch (e) {
//       setIsLoading(false);
//       handleError(e);
//     }
//   };

//   return (
//     <LoaderButton
//       block
//       bsSize="large"
//       bsStyle="primary"
//       className="FacebookButton"
//       text="Login with Facebook"
//       onClick={handleClick}
//       disabled={isLoading}
//     />
//   );
// }

export default function FacebookButton () {
  return <div>test</div>
}