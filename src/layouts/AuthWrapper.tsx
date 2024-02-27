import { PropsWithChildren, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import ApiStatus from "../enums";

function AuthWrapper({ children }: PropsWithChildren) {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      (user.status == ApiStatus.FAILED || user.status === ApiStatus.SUCCESS) &&
      !user.isLoggedIn
    ) {
      navigate("/login");
    }
  }, [user.status, user.isLoggedIn, navigate]);

  if (user.status === ApiStatus.PENDING) {
    // spinner needs to be added
    return <>Spinner weeee</>;
  } else if (user.isLoggedIn) {
    return <>{children}</>;
  }
}

export default AuthWrapper;
