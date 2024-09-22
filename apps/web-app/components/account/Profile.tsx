import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@ecommerce/ui-kit/ui';
import { useAuth } from '../../store/context/authhook';
import React from 'react';

export const Profile = () => {
  const auth = useAuth();
  const { token } = auth;
  // const loggedin = useUserSelector((state) => state.user.loggedin);
  return (
    <div className="w-full p-1 m-1 md:p-4 md:m-2">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>yout email</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            <p>sai@h.in</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
