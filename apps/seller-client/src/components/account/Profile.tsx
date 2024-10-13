import { userlocationsType } from '@ecommerce/types';
import {
  Card,
  Tabs,
  Badge,
  TabsContent,
  Avatar,
  AvatarFallback,
  AvatarImage,
  TabsList,
  TabsTrigger,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ecommerce/ui-kit/ui';
import { useContext, useEffect } from 'react';
import { useGetLocationsQuery } from '../store/user/api';
import AuthContext from '../store/context/Authcontext';

type LocationsQueryResult = ReturnType<typeof useGetLocationsQuery>;

export default function Profile() {
  const authctx = useContext(AuthContext);

  const { token } = authctx;

  const { data, isLoading, error } = useGetLocationsQuery(
    token
  ) as LocationsQueryResult;

  const user = data as userlocationsType | undefined;
  useEffect(() => {
    console.log(data, user);
  }, [data, user]);
  if (isLoading || error) {
    console.log('err');
  }
  return (
    <div className="container mx-auto p-4">
      {user && (
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={'kgjhoi'} alt={''} />
                <AvatarFallback>
                  {user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
                <Badge variant="outline" className="mt-2">
                  {user.role}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-medium text-gray-500">Member Since</dt>
                {/* <dd>{user.creationDate.toLocaleDateString()}</dd> */}
              </div>
              <div>
                <dt className="font-medium text-gray-500">Last Updated</dt>
                {/* <dd>{user.updatedOn.toLocaleDateString()}</dd> */}
              </div>
              <div>
                <dt className="font-medium text-gray-500">Locations</dt>
                {/* <dd>{user.locations.map((loc) => loc.name).join(', ')}</dd> */}
              </div>
            </dl>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">User ID: {user.id}</p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
