import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function AuthWrapper({ children }: PropsWithChildren) {
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user || (user && !user.isLoggedIn)) {
      // logic for checking the login using the cookies
      // much like auth local
    }
  }, [user]);

  if (user.isLoading) {
    <>Spinner weeee</>;
  } else if (user.isLoggedIn) {
    <>{children}</>;
  } else {
    <>Login page byatch</>;
  }
}

export default AuthWrapper;
